// src/components/CardsData/CardTotalStaffs.js

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card";
import { staff } from "../../pages/data/StaffData"; // Import the staff data
import styled from "styled-components";
import { FaUserTie } from "react-icons/fa"; // Import an icon from react-icons

const CardTotalStaffs = () => {
  const navigate = useNavigate();

  // Calculate the total number of staff
  const totalStaffs = staff.length;

  return (
    <CardContainer onClick={() => navigate('/admin/staffs')}>
      <Card
        label="Total Staffs"
        value={totalStaffs} // Display the total number of staff
        icon={<FaUserTie />} // Add the icon here
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalStaffs;
