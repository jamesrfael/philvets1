import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Layout/Card";
import { suppliers as initialSuppliers } from "../../pages/data/SupplierData";
import styled from "styled-components";
import { FaWarehouse   } from "react-icons/fa"; // Import a different icon

// Function to calculate the total number of suppliers
const calculateTotalSuppliers = (suppliers) => {
  return suppliers.length;
};

const CardTotalSuppliers = () => {
  const navigate = useNavigate();

  const totalSuppliers = calculateTotalSuppliers(initialSuppliers);

  return (
    <CardContainer onClick={() => navigate('/admin/suppliers')}>
      <Card
        label="Total Suppliers"
        value={totalSuppliers} // Display the total number of suppliers
        icon={<FaWarehouse   />} // Changed the icon to FaDolly 
      />
    </CardContainer>
  );
};

const CardContainer = styled.div`
  cursor: pointer;
`;

export default CardTotalSuppliers;
