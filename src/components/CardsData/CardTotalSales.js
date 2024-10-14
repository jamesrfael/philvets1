import React from "react";
import { FaDollarSign } from "react-icons/fa"; // Import an icon for sales
import Card from "../Layout/Card";
import { sales as initialSales } from "../../data/SalesData";
import styled from "styled-components";

// Function to calculate total sales for the current month
const calculateTotalSalesThisMonth = (sales) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return sales.reduce((total, sale) => {
    const saleDate = new Date(sale.SALE_DATE); // Ensure SALE_DATE is in a valid date format
    // Check if the sale date is in the current month and year
    if (
      saleDate.getMonth() === currentMonth &&
      saleDate.getFullYear() === currentYear
    ) {
      return total + sale.SALES_INV_TOTAL;
    }
    return total;
  }, 0);
};

const CardTotalSales = () => {
  const totalSalesThisMonth = calculateTotalSalesThisMonth(initialSales);

  return (
    <CardContainer>
      <Card
        label="Sales This Month"
        value={`₱${totalSalesThisMonth.toFixed(2)}`} // Display the total sales amount
        icon={<FaDollarSign />} // Add the sales icon
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalSales;
