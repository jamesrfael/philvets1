import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header";
import styled from "styled-components";
import { colors } from "../colors";

const LayoutHS = ({ children }) => {
  return (
    <LayoutContainer>
      <MainContent>
        <Sidebar />
        <Content>
          <Header />
          <MainContentLayout>{children}</MainContentLayout>
        </Content>
      </MainContent>
    </LayoutContainer>
  );
};

const MainContentLayout = ({ children }) => {
  return <StyledMainContent>{children}</StyledMainContent>;
};

const StyledMainContent = styled.div`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px;
  flex-grow: 1;
  min-height: calc(100vh - 100px);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
`;

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
`;

export default LayoutHS;
