// LayoutHS.js
import React, { useState } from "react";
import Sidebar from "../Layout/Sidebar/Sidebar";
import Header from "./Header";
import styled from "styled-components";
import { colors } from "../../colors";

const LayoutHS = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <MainContent>
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        <Content>
          <Header toggleSidebar={toggleSidebar} />
          <MainContentLayout>{children}</MainContentLayout>
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

// Styled Components
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Content = styled.div`
  flex-grow: 1;
  background-color: ${colors.primary};
  overflow-x: auto; /* Enable horizontal scrolling */
`;

const MainContentLayout = styled.div`
  padding: 10px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 10px; /*Adjust The White bg of the mainlayout */
  flex-grow: 1;
  min-height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  overflow-y: auto; /* Vertical scrolling */
  overflow-x: auto; /* Horizontal scrolling */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
`;

export default LayoutHS;
