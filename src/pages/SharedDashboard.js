// src/components/SharedDashboard.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import HighestSellingProducts from "../components/Dashboard/HighestSellingProducts";
import RecentlyAddedProducts from "../components/Dashboard/RecentlyAddedProducts";
import LowestStocks from "../components/Dashboard/LowestStocks";
import CardLowStocks from "../components/CardsData/CardLowStocks";
import CardTotalProducts from "../components/CardsData/CardTotalProducts";
import CardTotalSales from "../components/CardsData/CardTotalSales";
import CardTotalNotification from "../components/CardsData/CardTotalNotification";
import CardTotalInventoryValue from "../components/CardsData/CardTotalInventoryValue"; 
import CardTotalCategories from "../components/CardsData/CardTotalCategories"; 
import CardTotalCustomerOrder from "../components/CardsData/CardTotalCustomerOrder"; 
import CardTotalCustomers from "../components/CardsData/CardTotalCustomers"; 
import CardTotalDelivery from "../components/CardsData/CardTotalDelivery"; 
import CardTotalLogs from "../components/CardsData/CardTotalLogs"; 
import CardTotalOrders from "../components/CardsData/CardTotalOrders"; 
import CardTotalPurchaseOrder from "../components/CardsData/CardTotalPurchaseOrder"; 
import CardTotalRequest from "../components/CardsData/CardTotalRequest"; 
import CardTotalReturns from "../components/CardsData/CardTotalReturns"; 
import CardTotalSuppliers from "../components/CardsData/CardTotalSuppliers"; 
import CardTotalTransactions from "../components/CardsData/CardTotalTransactions"; 
import CardTotalUsers from "../components/CardsData/CardTotalUsers"; 
import ExpiredItemsAlert from "../components/Dashboard/ExpiredItemsAlert";
import { getLayout, saveLayout } from "../utils/indexedDB";  
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SharedDashboard = ({ role }) => {
  const navigate = useNavigate();
  const [cardOrder, setCardOrder] = useState([]);
  const [tableOrder, setTableOrder] = useState([]);

  useEffect(() => {
    const loadLayout = async () => {
      const savedCardOrder = await getLayout('cardOrder');
      const savedTableOrder = await getLayout('tableOrder');

      if (savedCardOrder) {
        setCardOrder(savedCardOrder);
      } else {
        setCardOrder([
          "CardTotalInventoryValue",
          "CardTotalSales",
          "CardTotalProducts",
          "CardLowStocks",
          "CardTotalNotification",
          ...(role === "SuperAdmin" ? [
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
          ] : [])
        ]);
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
  }, [role]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.type === 'CARD') {
      const newOrder = Array.from(cardOrder);
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, removed);
      setCardOrder(newOrder);
      saveLayout('cardOrder', newOrder);
    } else if (result.type === 'TABLE') {
      const newTableOrder = Array.from(tableOrder);
      const [removed] = newTableOrder.splice(sourceIndex, 1);
      newTableOrder.splice(destinationIndex, 0, removed);
      setTableOrder(newTableOrder);
      saveLayout('tableOrder', newTableOrder);
    }
  };

  const cardComponents = {
    CardTotalInventoryValue: <CardTotalInventoryValue />,
    CardTotalSales: <CardTotalSales />,
    CardTotalProducts: <CardTotalProducts />,
    CardLowStocks: <CardLowStocks />,
    CardTotalNotification: <CardTotalNotification />,
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
              {cardOrder.map((cardKey, index) => {
                if (cardComponents[cardKey]) {
                  return (
                    <Draggable 
                      key={cardKey} 
                      draggableId={cardKey} 
                      index={index} 
                      isDragDisabled={role !== "SuperAdmin"} // Disable dragging for non-SuperAdmin
                    >
                      {(provided) => (
                        <CardWrapper
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => navigate(`/admin/${cardKey.toLowerCase()}`)}
                        >
                          {cardComponents[cardKey]}
                        </CardWrapper>
                      )}
                    </Draggable>
                  );
                }
                return null; // Or a fallback component if necessary
              })}
              {provided.placeholder}
            </CardContainer>
          )}
        </Droppable>

        <Droppable droppableId="tables" type="TABLE">
          {(provided) => (
            <TablesContainer {...provided.droppableProps} ref={provided.innerRef}>
              {tableOrder.map((tableKey, index) => {
                if (tableComponents[tableKey]) {
                  return (
                    <Draggable 
                      key={tableKey} 
                      draggableId={tableKey} 
                      index={index} 
                      isDragDisabled={role !== "SuperAdmin"} // Disable dragging for non-SuperAdmin
                    >
                      {(provided) => (
                        <Row 
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                        >
                          <StyledLink to={`/admin/${tableKey.toLowerCase()}`}>
                            {tableComponents[tableKey]}
                          </StyledLink>
                        </Row>
                      )}
                    </Draggable>
                  );
                }
                return null; // Or a fallback component if necessary
              })}
              {provided.placeholder}
            </TablesContainer>
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

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  width: 100%;
  gap: 1rem;
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

export default SharedDashboard;
