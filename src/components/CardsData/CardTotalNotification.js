// src/components/CardsData/CardTotalNotification.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card"; // Import the reusable Card component
import { notificationData } from "../../pages/data/NotificationData"; // Import the notification data
import styled from "styled-components";
import { FaBell } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalNotification = () => {
  const navigate = useNavigate();

  const totalNotifications = notificationData.length; // Calculate total notifications here

  return (
    <CardContainer onClick={() => navigate('/admin/notifications')}>
      <Card
        label="Total Notifications"
        value={totalNotifications} // Display the total number of notifications
        icon={<FaBell />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalNotification;
