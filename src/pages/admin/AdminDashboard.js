// src/components/AdminDashboard.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import HighestSellingProducts from "../../components/Dashboard/HighestSellingProducts";
import RecentlyAddedProducts from "../../components/Dashboard/RecentlyAddedProducts";
import LowestStocks from "../../components/Dashboard/LowestStocks";
import CardLowStocks from "../../components/CardsData/CardLowStocks";
import CardTotalProducts from "../../components/CardsData/CardTotalProducts";
import CardTotalCategories from "../../components/CardsData/CardTotalCategories";
import CardTotalCustomerOrder from "../../components/CardsData/CardTotalCustomerOrder";
import CardTotalCustomers from "../../components/CardsData/CardTotalCustomers";
import CardTotalDelivery from "../../components/CardsData/CardTotalDelivery";
import CardTotalPurchaseOrder from "../../components/CardsData/CardTotalPurchaseOrder";
import CardTotalRequestOrder from "../../components/CardsData/CardTotalRequestOrder";
import CardTotalReturns from "../../components/CardsData/CardTotalReturns";
import CardTotalSuppliers from "../../components/CardsData/CardTotalSuppliers";
import CardTotalTransactions from "../../components/CardsData/CardTotalTransactions";
import ExpiredItemsAlert from "../../components/Dashboard/ExpiredItemsAlert";
import { getLayout, saveLayout } from "../../utils/indexedDB";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MainLayout from "../../components/Layout/MainLayout";
import Loading from "../../components/Layout/Loading";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [currentCardOrder, setCurrentCardOrder] = useState([
    "CardTotalProducts",
    "CardLowStocks",
    "CardTotalCategories",
    "CardTotalCustomerOrder",
    "CardTotalCustomers",
    "CardTotalDelivery",
    "CardTotalOrders",
    "CardTotalPurchaseOrder",
    "CardTotalRequestOrder",
    "CardTotalReturns",
    "CardTotalSuppliers",
    "CardTotalTransactions",
  ]);

  const [tableOrder, setTableOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLayout = async () => {
      setLoading(true);
      try {
        const savedCardOrder = await getLayout("admin", "cardOrder");
        const savedTableOrder = await getLayout("admin", "tableOrder");

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
      } catch (error) {
        console.error("Error loading layout:", error);
      } finally {
        setLoading(false);
      }
    };

    loadLayout();
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (result.type === "CARD") {
      const newOrder = Array.from(currentCardOrder);
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, removed);
      setCurrentCardOrder(newOrder);
      saveLayout("admin", "cardOrder", newOrder);
    } else if (result.type === "TABLE") {
      const newTableOrder = Array.from(tableOrder);
      const [removed] = newTableOrder.splice(sourceIndex, 1);
      newTableOrder.splice(destinationIndex, 0, removed);
      setTableOrder(newTableOrder);
      saveLayout("admin", "tableOrder", newTableOrder);
    }
  };

  const cardOnClickHandlers = {
    CardTotalProducts: () => navigate("/admin/products"),
    CardLowStocks: () => navigate("/admin/inventory"),
    CardTotalCategories: () => navigate("/admin/categories"),
    CardTotalCustomerOrder: () => navigate("/admin/customer-order"),
    CardTotalCustomers: () => navigate("/admin/customers"),
    CardTotalDelivery: () => navigate("/admin/delivery"),
    CardTotalPurchaseOrder: () => navigate("/admin/purchase-order"),
    CardTotalRequestOrder: () => navigate("/admin/request-order"),
    CardTotalReturns: () => navigate("/admin/returns"),
    CardTotalSuppliers: () => navigate("/admin/suppliers"),
    CardTotalTransactions: () => navigate("/admin/reports"),
  };

  const tableOnClickHandlers = {
    HighestSellingProducts: () => navigate("/admin/products"),
    ExpiredItemsAlert: () => navigate("/admin/inventory"),
    RecentlyAddedProducts: () => navigate("/admin/products"),
    LowestStocks: () => navigate("/admin/inventory"),
  };

  const cardComponents = {
    CardTotalProducts: <CardTotalProducts />,
    CardLowStocks: <CardLowStocks />,
    CardTotalCategories: <CardTotalCategories />,
    CardTotalCustomerOrder: <CardTotalCustomerOrder />,
    CardTotalCustomers: <CardTotalCustomers />,
    CardTotalDelivery: <CardTotalDelivery />,
    CardTotalPurchaseOrder: <CardTotalPurchaseOrder />,
    CardTotalRequestOrder: <CardTotalRequestOrder />,
    CardTotalReturns: <CardTotalReturns />,
    CardTotalSuppliers: <CardTotalSuppliers />,
    CardTotalTransactions: <CardTotalTransactions />,
  };

  const tableComponents = {
    HighestSellingProducts: <HighestSellingProducts />,
    ExpiredItemsAlert: <ExpiredItemsAlert />,
    RecentlyAddedProducts: <RecentlyAddedProducts />,
    LowestStocks: <LowestStocks />,
  };

  if (loading) {
    return <Loading />;
  }

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
                          onClick={cardOnClickHandlers[cardKey]}
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
              <TablesContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
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
                            onClick={tableOnClickHandlers[tableKey]}
                          >
                            {tableComponents[tableKey]}
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
  cursor: move;
`;

const ScrollableTablesContainer = styled.div`
  overflow-x: auto;
  margin: 2rem auto;
  width: 100%;
`;

const TablesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 7px;
  min-width: 488px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  cursor: move;
`;

export default AdminDashboard;
