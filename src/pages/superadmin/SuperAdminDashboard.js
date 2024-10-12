// src/components/SuperAdminDashboard.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import HighestSellingProducts from "../../components/Dashboard/HighestSellingProducts";
import RecentlyAddedProducts from "../../components/Dashboard/RecentlyAddedProducts";
import LowestStocks from "../../components/Dashboard/LowestStocks";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalSales from "../../components/CardsData/CardTotalSales";
import CardTotalNotification from "../../components/CardsData/CardTotalNotification";
import CardTotalInventoryValue from "../../components/CardsData/CardTotalInventoryValue"; 
import CardTotalCategories from "../../components/CardsData/CardTotalCategories"; 
import CardTotalCustomerOrder from "../../components/CardsData/CardTotalCustomerOrder"; 
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers"; 
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery"; 
import CardTotalLogs from "../../components/CardsData/CardTotalLogs"; 
import CardTotalOrders from "../../components/CardsData/CardTotalOrders"; 
import CardTotalPurchaseOrder from "../../components/CardsData/CardTotalPurchaseOrder"; 
import CardTotalRequest from "../../components/CardsData/CardTotalRequest"; 
import CardTotalReturns from "../../components/CardsData/CardTotalReturns"; 
import CardTotalSuppliers from "../../components/CardsData/CardTotalSuppliers"; 
import CardTotalTransactions from "../../components/CardsData/CardTotalTransactions"; 
import CardTotalUsers from "../../components/CardsData/CardTotalUsers"; 
import ExpiredItemsAlert from "../../components/Dashboard/ExpiredItemsAlert";
import { getLayout, saveLayout } from "../../utils/indexedDB";  
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MainLayout from "../../components/Layout/MainLayout"; 

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [currentCardOrder, setCurrentCardOrder] = useState([
    "CardTotalSales",
    "CardTotalProducts",
    "CardLowStocks",
    "CardTotalNotification",
    "CardTotalInventoryValue",
    "CardTotalCategories",
    "CardTotalCustomerOrder",
    "CardTotalCustomers",
    "CardTotalDelivery",
    "CardTotalLogs",
    "CardTotalOrders",
    "CardTotalPurchaseOrder",
    "CardTotalRequest",
    "CardTotalReturns",
    "CardTotalSuppliers",
    "CardTotalTransactions",
    "CardTotalUsers"
  ]);

  const [tableOrder, setTableOrder] = useState([]);

  useEffect(() => {
    const loadLayout = async () => {
      const savedCardOrder = await getLayout('superadmin', 'cardOrder');
      const savedTableOrder = await getLayout('superadmin', 'tableOrder');

      if (savedCardOrder) {
        setCurrentCardOrder(savedCardOrder);
      }

      if (savedTableOrder) {
        setTableOrder(savedTableOrder);
      } else {
        setTableOrder([
          "HighestSellingProducts",
          "ExpiredItemsAlert",
          "RecentlyAddedProducts",
          "LowestStocks",
        ]);
      }
    };

    loadLayout();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.type === 'CARD') {
      const newOrder = Array.from(currentCardOrder);
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, removed);
      setCurrentCardOrder(newOrder);
      saveLayout('superadmin', 'cardOrder', newOrder);
    } else if (result.type === 'TABLE') {
      const newTableOrder = Array.from(tableOrder);
      const [removed] = newTableOrder.splice(sourceIndex, 1);
      newTableOrder.splice(destinationIndex, 0, removed);
      setTableOrder(newTableOrder);
      saveLayout('superadmin', 'tableOrder', newTableOrder);
    }
  };

  const cardComponents = {
    CardTotalSales: <CardTotalSales />,
    CardTotalProducts: <CardTotalProducts />,
    CardLowStocks: <CardLowStocks />,
    CardTotalNotification: <CardTotalNotification />,
    CardTotalInventoryValue: <CardTotalInventoryValue />,
    CardTotalCategories: <CardTotalCategories />,
    CardTotalCustomerOrder: <CardTotalCustomerOrder />,
    CardTotalCustomers: <CardTotalCustomers />,
    CardTotalDelivery: <CardTotalDelivery />,
    CardTotalLogs: <CardTotalLogs />,
    CardTotalOrders: <CardTotalOrders />,
    CardTotalPurchaseOrder: <CardTotalPurchaseOrder />,
    CardTotalRequest: <CardTotalRequest />,
    CardTotalReturns: <CardTotalReturns />,
    CardTotalSuppliers: <CardTotalSuppliers />,
    CardTotalTransactions: <CardTotalTransactions />,
    CardTotalUsers: <CardTotalUsers />,
  };

  const tableComponents = {
    HighestSellingProducts: <HighestSellingProducts />,
    ExpiredItemsAlert: <ExpiredItemsAlert />,
    RecentlyAddedProducts: <RecentlyAddedProducts />,
    LowestStocks: <LowestStocks />,
  };

  return (
    <MainLayout>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="cards" direction="horizontal" type="CARD">
          {(provided) => (
            <CardContainer {...provided.droppableProps} ref={provided.innerRef}>
              {currentCardOrder.map((cardKey, index) => {
                if (cardComponents[cardKey]) {
                  return (
                    <Draggable 
                      key={cardKey} 
                      draggableId={cardKey} 
                      index={index}
                    >
                      {(provided) => (
                        <CardWrapper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => navigate(`/superadmin/${cardKey.toLowerCase()}`)}
                        >
                          {cardComponents[cardKey]}
                        </CardWrapper>
                      )}
                    </Draggable>
                  );
                }
                return null;
              })}
              {provided.placeholder}
            </CardContainer>
          )}
        </Droppable>

        <Droppable droppableId="tables" type="TABLE">
          {(provided) => (
            <ScrollableTablesContainer>
              <TablesContainer {...provided.droppableProps} ref={provided.innerRef}>
                {tableOrder.map((tableKey, index) => {
                  if (tableComponents[tableKey]) {
                    return (
                      <Draggable 
                        key={tableKey} 
                        draggableId={tableKey} 
                        index={index}
                      >
                        {(provided) => (
                          <Row 
                            ref={provided.innerRef} 
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                          >
                            <StyledLink to={`/superadmin/${tableKey.toLowerCase()}`}>
                              {tableComponents[tableKey]}
                            </StyledLink>
                          </Row>
                        )}
                      </Draggable>
                    );
                  }
                  return null;
                })}
                {provided.placeholder}
              </TablesContainer>
            </ScrollableTablesContainer>
          )}
        </Droppable>
      </DragDropContext>
    </MainLayout>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  gap: 1rem;
  width: 100%;
`;

const CardWrapper = styled.div`
  cursor: move; /* Change cursor to indicate draggable */
`;

const ScrollableTablesContainer = styled.div`
  overflow-x: auto; /* Enable horizontal scrolling */
  margin: 2rem auto; /* Add margin for spacing */
  width: 100%;
  padding: 7px;
`;

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 488px; /* Set a minimum width to make the table content scrollable */
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  cursor: move; /* Change cursor to indicate draggable */
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
`;

export default SuperAdminDashboard;
