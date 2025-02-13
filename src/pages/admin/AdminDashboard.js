import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/Layout/SearchBar";
import MainLayout from "../../components/Layout/MainLayout";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <MainLayout>
        <DashboardContainer>
          <Controls>
            <SearchBar
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </Controls>
          <p>Welcome to the Admin Panel. Manage your application from here.</p>

          <DashboardCards>
            <Card>
              <h3>Users</h3>
              <p>Manage user accounts and roles.</p>
            </Card>
            <Card>
              <h3>Analytics</h3>
              <p>View system statistics and reports.</p>
            </Card>
            <Card>
              <h3>Settings</h3>
              <p>Configure application settings.</p>
            </Card>
          </DashboardCards>
        </DashboardContainer>
    </MainLayout>
  );
};

export default AdminDashboard;

// Styled Components
const DashboardContainer = styled.div`
  padding: 0;
`;

const DashboardCards = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: #00308F; /* Fixed Background Color */
  color: white;
  width: 200px;
  text-align: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 1px;
`;
