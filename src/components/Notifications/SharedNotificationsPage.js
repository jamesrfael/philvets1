import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import CardTotalNotification from "../../components/CardsData/CardTotalNotification"; 
import { notificationData as initialNotificationData } from "../../data/NotificationData"; 

const SharedNotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotificationData);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to toggle the read status of a notification
  const toggleReadStatus = (index) => {
    const updatedNotifications = notifications.map((notification, i) => 
      i === index ? { ...notification, read: !notification.read } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Function to parse the timestamp into a Date object
  const parseTimestamp = (timestamp) => new Date(timestamp.replace(" - ", "T"));

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(({ title, message, timestamp }) => 
      [title, message, timestamp].some((field) => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => parseTimestamp(b.timestamp) - parseTimestamp(a.timestamp)); // Sort by date descending

  return (
    <PageContainer>
      <Controls>
        <SearchBar
          placeholder="Search / Filter notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <SummarySection>
        <CardTotalNotification /> {/* Notifications Count */}
      </SummarySection>
      <NotificationsList>
        {filteredNotifications.map((notification, index) => (
          <NotificationCard
            key={notification.id}
            onClick={() => toggleReadStatus(index)} // Toggle read status on click
            read={notification.read} // Pass the read status for styling
          >
            <Title read={notification.read}>{notification.title}</Title>
            <Message>{notification.message}</Message>
            <Details>
              <Timestamp>{notification.timestamp}</Timestamp>
              <Priority priority={notification.priority}>
                {notification.priority}
              </Priority>
            </Details>
            {notification.read && (
              <MarkUnreadButton
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the notification card click event
                  toggleReadStatus(index);
                }}
              >
                Mark as unread
              </MarkUnreadButton>
            )}
          </NotificationCard>
        ))}
      </NotificationsList>
    </PageContainer>
  );
};

// Styled components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NotificationCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  opacity: ${(props) => (props.read ? "0.7" : "1")}; // Dim if read
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0;
  font-weight: ${(props) => (props.read ? "normal" : "bold")}; // Bold if unread
`;

const Message = styled.p`
  font-size: 16px;
  margin: 0;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #777;
`;

const Timestamp = styled.span``;

const Priority = styled.span`
  background-color: ${(props) =>
    props.priority === "High"
      ? "#FF6347"
      : props.priority === "Medium"
      ? "#FFA500"
      : "#32CD32"};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

const MarkUnreadButton = styled.button`
  align-self: flex-end;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;

  &:hover {
    color: darkgray; // Change color on hover
    text-decoration: none; // Remove underline on hover
  }
`;

export default SharedNotificationsPage;
