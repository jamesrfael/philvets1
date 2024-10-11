import React, { useState } from "react";
import MainLayout from "../../components/Layout/MainLayout";
import styled, { keyframes } from "styled-components"; // Import keyframes for animation
import SearchBar from "../../components/Layout/SearchBar";
import CardTotalNotification from "../../components/CardsData/CardTotalNotification"; // Import the CardTotalNotification component
import { notificationData } from "../data/NotificationData"; // Import the notification data

const AdminNotification = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState(
    notificationData.map((notification) => ({ ...notification, isRead: false }))
  ); // Initialize notifications with read status

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter((notification) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      notification.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.message.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.timestamp.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Sort notifications: unread first, then read
  const sortedNotifications = filteredNotifications.sort((a, b) =>
    a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1
  );

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Mark notification as unread
  const markAsUnread = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: false }
          : notification
      )
    );
  };

  return (
    <MainLayout>
      <Controls>
        <SearchBar
          placeholder="Search / Filter notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Controls>
      <SummarySection>
        <CardTotalNotification />{" "}
        {/* Use the CardTotalNotification component */}
      </SummarySection>
      <NotificationList>
        {sortedNotifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClick={markAsRead}
            onMarkAsUnread={markAsUnread}
          />
        ))}
      </NotificationList>
    </MainLayout>
  );
};

// Notification component
const Notification = ({ notification, onClick, onMarkAsUnread }) => {
  const handleClick = () => {
    onClick(notification.id);
  };

  const handleMarkAsUnread = (e) => {
    e.stopPropagation(); // Prevent triggering the onClick event
    onMarkAsUnread(notification.id);
  };

  return (
    <NotificationItem
      className={notification.isRead ? "read" : "unread"}
      onClick={handleClick}
    >
      <h4>{notification.title}</h4>
      <p>{notification.message}</p>
      <small>{new Date(notification.timestamp).toLocaleString()}</small>
      {notification.isRead && (
        <MarkAsUnread onClick={handleMarkAsUnread}>Mark as Unread</MarkAsUnread>
      )}
    </NotificationItem>
  );
};

// Keyframe animation for moving notifications
const moveToBottom = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

// Styled components
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 20px;
`;

const NotificationList = styled.div`
  width: 100%; /* Full width */
  padding: 0; /* Remove padding to align notifications at the edges */
  margin: 0; /* Remove margin */
`;

const NotificationItem = styled.div`
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  position: relative; /* Set relative positioning for absolute children */
  transition: background-color 0.2s ease, transform 0.5s ease; // Add transform transition
  width: 100%; /* Full width for each notification item */

  &.read {
    background-color: #f0f0f0;
  }

  &.unread {
    background-color: #e3f2fd; // Lighter blue color
    font-weight: bold;
    animation: ${moveToBottom} 0.5s ease; // Apply animation for unread notifications
  }

  &:hover {
    background-color: #bbdefb; // Slightly darker blue on hover
  }

  h4 {
    margin: 0;
  }

  p {
    margin: 5px 0;
  }

  small {
    color: #888;
  }
`;

const MarkAsUnread = styled.span`
  color: black; /* Bold black text */
  font-weight: bold; /* Make it bold */
  cursor: pointer;
  font-size: 0.8rem; /* Smaller font size */
  position: absolute; /* Position it at the top right of the notification item */
  top: 10px; /* Adjust as necessary */
  right: 10px; /* Adjust as necessary */
  transition: color 0.2s ease;

  &:hover {
    color: #333; /* Darker shade on hover */
  }
`;

export default AdminNotification;
