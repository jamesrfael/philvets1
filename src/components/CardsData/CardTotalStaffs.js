// src/components/CardsData/CardTotalStaffs.js
import React from "react";
import Card from "../Layout/Card";
import { staff } from "../../pages/data/StaffData"; // Import the staff data

const CardTotalStaffs = () => {
  // Calculate the total number of staff
  const totalStaffs = staff.length;

  return (
    <Card
      label="Total Staffs"
      value={totalStaffs} // Display the total number of staff
    />
  );
};

export default CardTotalStaffs;
