// src/components/AddSalesModal.js

import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { IoCloseCircle } from "react-icons/io5";
import {
  calculateLineTotal,
  calculateTotalQuantity,
  calculateTotalValue,
} from "../../utils/CalculationUtils"; // Import utility functions

// Sample products for selection
const products = [
  { id: 1, name: "Canine Dewormer", price: 20.0 },
  { id: 2, name: "Feline Dewormer", price: 8.0 },
  { id: 3, name: "Canine Nutritional Supplement", price: 30.0 },
];

const AddSalesModal = ({ onClose, onSave }) => {
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Standard");
  const [description, setDescription] = useState("");
  const [orderDetails, setOrderDetails] = useState([
    {
      productId: "",
      productName: "",
      price: 0,
      quantity: 1,
      discountType: "amount", // "amount" or "percent"
      discountValue: 0,
      lineTotal: 0,
    },
  ]);

  const handleAddProduct = () => {
    setOrderDetails([
      ...orderDetails,
      {
        productId: "",
        productName: "",
        price: 0,
        quantity: 1,
        discountType: "amount",
        discountValue: 0,
        lineTotal: 0,
      },
    ]);
  };

  const handleProductChange = (index, field, value) => {
    const updatedOrderDetails = [...orderDetails];
    const selectedProduct = products.find((p) => p.id === Number(value));

    updatedOrderDetails[index][field] = value;
    if (field === "productId") {
      updatedOrderDetails[index].productName = selectedProduct?.name || "";
      updatedOrderDetails[index].price = selectedProduct?.price || 0;
    }
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleQuantityChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].quantity = Math.max(1, value); // Ensure quantity is at least 1
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleDiscountChange = (index, field, value) => {
    const updatedOrderDetails = [...orderDetails];

    if (field === "discountValue") {
      // If the input is a leading zero, remove it unless the value is zero
      if (value !== "" && !isNaN(value)) {
        value = String(value).replace(/^0+(?=\d)/, "");
        if (value < 0) return; // Ignore negative input
      }
    }

    updatedOrderDetails[index][field] = value;
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date

    const newOrder = {
      orderType: "Sales Order",
      clientName,
      location,
      salesOrderDlvryDate: today, // Set delivery date to today
      salesOrderStatus: "Pending",
      salesOrderTotQty: calculateTotalQuantity(orderDetails), // Use utility function
      salesOrderTotal: calculateTotalValue(orderDetails), // Use utility function
      salesOrderDlvrOpt: deliveryOption,
      clientId: "", // Not used for now
      salesOrderDetails: orderDetails.map(({ lineTotal, ...rest }) => rest),
    };
    onSave(newOrder);
    onClose();
  };

  const handleRemoveProduct = (index) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails.splice(index, 1);
    setOrderDetails(updatedOrderDetails);
  };

  // Compute totals using utility functions
  const totalQuantity = calculateTotalQuantity(orderDetails);
  const totalValue = calculateTotalValue(orderDetails);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Add Sales Order</h2>
          <CloseButton onClick={onClose}>
            <IoCloseCircle />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Field>
            <Label>Client Name</Label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Location</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Delivery Option</Label>
            <Select
              value={deliveryOption}
              onChange={(e) => setDeliveryOption(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </Select>
          </Field>
          <Field>
            <Label>Description</Label>
            <DescriptionBox
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <OrderDetailsSection>
            <h3>Products</h3>
            <Table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>
                      <Select
                        value={detail.productId}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "productId",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </Select>
                    </td>
                    <td>{`₱${detail.price.toFixed(2)}`}</td>
                    <td>
                      <Input
                        type="number"
                        min="1"
                        value={detail.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <DiscountContainer>
                        <DiscountInput
                          type="number"
                          min="0"
                          value={detail.discountValue}
                          onChange={(e) =>
                            handleDiscountChange(
                              index,
                              "discountValue",
                              e.target.value
                            )
                          }
                        />
                        <DiscountSelect
                          value={detail.discountType}
                          onChange={(e) =>
                            handleDiscountChange(
                              index,
                              "discountType",
                              e.target.value
                            )
                          }
                        >
                          <option value="amount">Amount</option>
                          <option value="percent">Percent</option>
                        </DiscountSelect>
                      </DiscountContainer>
                    </td>
                    <td>{`₱${detail.lineTotal.toFixed(2)}`}</td>
                    <td>
                      <DeleteButton onClick={() => handleRemoveProduct(index)}>
                        <IoCloseCircle />
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <AddProductButton onClick={handleAddProduct}>
              Add Another Product
            </AddProductButton>
            <TotalSection>
              <TotalRow>
                <TotalLabel>Total Quantity:</TotalLabel>
                <TotalValue>{totalQuantity}</TotalValue>
              </TotalRow>
              <TotalRow>
                <TotalLabel>Subtotal:</TotalLabel>
                <TotalValue>{`₱${totalValue.toFixed(2)}`}</TotalValue>
              </TotalRow>
            </TotalSection>
          </OrderDetailsSection>
        </ModalBody>
        <ModalFooter>
          <SaveButton onClick={handleSave}>Save Order</SaveButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 95%;
  max-width: 900px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

const DescriptionBox = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

const OrderDetailsSection = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${colors.primary};
    color: white;
  }
`;

const AddProductButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: red;
`;

const TotalSection = styled.div`
  margin-top: 20px;
  text-align: right;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const TotalLabel = styled.span`
  font-weight: bold;
`;

const TotalValue = styled.span`
  font-weight: bold;
`;

const SaveButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${colors.fail};
`;

const DiscountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DiscountInput = styled.input`
  width: 50%;
  padding: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const DiscountSelect = styled.select`
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export default AddSalesModal;
