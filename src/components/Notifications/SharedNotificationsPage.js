// SharedNotificationsPage.js
import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import Table from "../../components/Layout/Table";
import CardTotalNotification from "../../components/CardsData/CardTotalNotification"; // Import the CardTotalNotification component
import { notificationData } from "../../data/NotificationData"; // Import the notification data

const SharedNotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotifications = notificationData.filter((notification) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      notification.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.message.toLowerCase().includes(lowerCaseSearchTerm) ||
      notification.timestamp.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const headers = ["Title", "Message", "Timestamp", "Priority"];

  const rows = filteredNotifications.map((notification) => [
    notification.title,
    notification.message,
    notification.timestamp,
    notification.priority,
  ]);

  return (
    <>
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
      <Table headers={headers} rows={rows} />
    </>
  );
};

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

export default SharedNotificationsPage;
