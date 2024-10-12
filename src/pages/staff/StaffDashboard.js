// src/components/StaffDashboard.js

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import CardTotalReturns from "../../components/CardsData/CardTotalReturns"; 
import CardTotalRequest from "../../components/CardsData/CardTotalRequest"; 
import CardTotalOrders from "../../components/CardsData/CardTotalOrders"; 
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery"; 
import CardLowStocks from "../../components/CardsData/CardLowStocks"; 
import CardTotalProducts from "../../components/CardsData/CardTotalProducts"; 
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers"; 
import ExpiredItemsAlert from "../../components/Dashboard/ExpiredItemsAlert";
import LowestStocks from "../../components/Dashboard/LowestStocks"; 
import { getLayout, saveLayout } from "../../utils/indexedDB";  
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MainLayout from "../../components/Layout/MainLayout"; 

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [currentCardOrder, setCurrentCardOrder] = useState([
    "CardTotalReturns",
    "CardTotalRequest",
    "CardTotalOrders",
    "CardTotalDelivery",
    "CardLowStocks",
    "CardTotalProducts",
    "CardTotalCustomers"
  ]);

  const [tableOrder, setTableOrder] = useState([]);

  useEffect(() => {
    const loadLayout = async () => {
      const savedCardOrder = await getLayout('staff', 'cardOrder');
      const savedTableOrder = await getLayout('staff', 'tableOrder');

      if (savedCardOrder) {
        setCurrentCardOrder(savedCardOrder);
      }

      if (savedTableOrder) {
        setTableOrder(savedTableOrder);
      } else {
        setTableOrder([
          "ExpiredItemsAlert",
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
      saveLayout('staff', 'cardOrder', newOrder);
    } else if (result.type === 'TABLE') {
      const newTableOrder = Array.from(tableOrder);
      const [removed] = newTableOrder.splice(sourceIndex, 1);
      newTableOrder.splice(destinationIndex, 0, removed);
      setTableOrder(newTableOrder);
      saveLayout('staff', 'tableOrder', newTableOrder);
    }
  };

  const cardComponents = {
    CardTotalReturns: <CardTotalReturns />,
    CardTotalRequest: <CardTotalRequest />,
    CardTotalOrders: <CardTotalOrders />,
    CardTotalDelivery: <CardTotalDelivery />,
    CardLowStocks: <CardLowStocks />,
    CardTotalProducts: <CardTotalProducts />,
    CardTotalCustomers: <CardTotalCustomers />,
  };

  const tableComponents = {
    ExpiredItemsAlert: <ExpiredItemsAlert />,
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
                          onClick={() => navigate(`/staff/${cardKey.toLowerCase()}`)}
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
                            <StyledLink to={`/staff/${tableKey.toLowerCase()}`}>
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

export default StaffDashboard;
