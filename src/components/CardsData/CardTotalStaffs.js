// src/components/CardsData/CardTotalStaffs.js
import React from "react";
import Card from "../Layout/Card"; // Import the reusable Card component

const CardTotalStaffs = ({ totalStaffs }) => {
  return (
    <Card
      label="Total Staffs"
      value={totalStaffs} // Display the total number of staff
    />
  );
};

export default CardTotalStaffs;
