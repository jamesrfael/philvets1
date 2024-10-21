import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import CardTotalNotification from "../../components/CardsData/CardTotalNotification"; // Import the CardTotalNotification component
import { notificationData as initialNotificationData } from "../../data/NotificationData"; // Import the notification data

const SharedNotificationsPage = () => {
  // Create a state that tracks the notification data, including read/unread status
  const [notifications, setNotifications] = useState(
    initialNotificationData.map((notification) => ({
      ...notification,
      read: false, // Add a read property to each notification, default to false
    }))
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Function to toggle the read status of a notification
  const handleNotificationClick = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = !updatedNotifications[index].read;
    setNotifications(updatedNotifications);
  };

  // Filter notifications based on the search term
  const filteredNotifications = notifications.filter((notification) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      notification.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.message.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.timestamp.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

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
        <CardTotalNotification /> {/* Total Notifications Count */}
      </SummarySection>
      <NotificationsList>
        {filteredNotifications.map((notification, index) => (
          <NotificationCard
            key={index}
            onClick={() => handleNotificationClick(index)} // Add onClick event handler
            read={notification.read} // Pass the read status for styling
          >
            <Title read={notification.read}>{notification.title}</Title> {/* Bold if unread */}
            <Message>{notification.message}</Message>
            <Details>
              <Timestamp>{notification.timestamp}</Timestamp>
              <Priority priority={notification.priority}>
                {notification.priority}
              </Priority>
            </Details>
            {notification.read && (
              <MarkUnreadButton onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the notification card click event
                handleNotificationClick(index);
              }}>
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
// "Mark as unread" button for read notifications
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
