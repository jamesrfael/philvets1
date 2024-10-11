import React, { useState } from "react";
import Modal from "../../Layout/Modal";
import Button from "../../Layout/Button";
import styled from "styled-components";  // Import styled for styled-components
import { IoCloseCircle } from "react-icons/io5";  // Import the icon
import { Field, Label, Input, DeleteButton, DescriptionBox, OrderDetailsSection, Table, QuantityInput, SuggestionsList, SuggestionItem, TotalSection, TotalRow, TotalLabel, TotalValue } from "../OrderStyles";
import { calculateLineTotal, calculateTotalQuantity, calculateTotalValue } from "../../../utils/CalculationUtils";

const products = [
  { id: 1, name: "Canine Dewormer", price: 20.0 },
  { id: 2, name: "Feline Dewormer", price: 8.0 },
  { id: 3, name: "Canine Nutritional Supplement", price: 30.0 },
];

const AddRequestModal = ({ onClose, onSave }) => {
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [orderDetails, setOrderDetails] = useState([
    {
      productId: "",
      productName: "",
      price: 0,
      quantity: 1,
      lineTotal: 0,
    },
  ]);
  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

  const handleAddProduct = () => {
    setOrderDetails([...orderDetails, { productId: "", productName: "", price: 0, quantity: 1, lineTotal: 0 }]);
  };

  const handleProductInputChange = (index, value) => {
    setCurrentEditingIndex(index);
    setProductSearch(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].productName = value;
    setOrderDetails(updatedOrderDetails);
  };

  const handleProductSelect = (index, product) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].productId = product.id;
    updatedOrderDetails[index].productName = product.name;
    updatedOrderDetails[index].price = product.price;
    updatedOrderDetails[index].lineTotal = calculateLineTotal(updatedOrderDetails[index]);
    setOrderDetails(updatedOrderDetails);
    setProductSearch("");
    setFilteredProducts(products);
    setCurrentEditingIndex(null);
  };

  const handleQuantityChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].quantity = Math.max(1, value);
    updatedOrderDetails[index].lineTotal = calculateLineTotal(updatedOrderDetails[index]);
    setOrderDetails(updatedOrderDetails);
  };

  const handleSave = () => {
    const newRequest = {
      requestBy: clientName,
      description,
      requestDetails: orderDetails.map(({ lineTotal, ...rest }) => rest),
    };
    onSave(newRequest);
    onClose();
  };

  const handleRemoveProduct = (index) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails.splice(index, 1);
    setOrderDetails(updatedOrderDetails);
  };

  const totalQuantity = calculateTotalQuantity(orderDetails);
  const totalValue = calculateTotalValue(orderDetails);

  return (
    <Modal title="Add Request" onClose={onClose}>
      <Field>
        <Label>Client Name</Label>
        <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </Field>
      <Field>
        <Label>Description</Label>
        <DescriptionBox value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <OrderDetailsSection>
        <h3>Products</h3>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((detail, index) => (
              <tr key={index}>
                <td>
                  <div style={{ position: "relative" }}>
                    <Input
                      value={detail.productName}
                      onChange={(e) => handleProductInputChange(index, e.target.value)}
                      placeholder="Search / Filter product"
                    />
                    {currentEditingIndex === index && productSearch && (
                      <SuggestionsList>
                        {filteredProducts.map((product) => (
                          <SuggestionItem key={product.id} onClick={() => handleProductSelect(index, product)}>
                            {product.name}
                          </SuggestionItem>
                        ))}
                      </SuggestionsList>
                    )}
                  </div>
                </td>
                <td>₱{detail.price.toFixed(2)}</td>
                <td>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={detail.quantity}
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                  />
                </td>
                <td>₱{detail.lineTotal.toFixed(2)}</td>
                <td>
                  <DeleteButton onClick={() => handleRemoveProduct(index)}>
                    <IoCloseCircle />
                  </DeleteButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={handleAddProduct}>
          Add Another Product
        </Button>
        <TotalSection>
          <TotalRow>
            <TotalLabel>Total Quantity:</TotalLabel>
            <TotalValue>{totalQuantity}</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Total:</TotalLabel>
            <TotalValue>₱{totalValue.toFixed(2)}</TotalValue>
          </TotalRow>
        </TotalSection>
      </OrderDetailsSection>
      <ButtonGroup>
        <Button variant="fail" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add Request
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

// Styled components
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

export default AddRequestModal;
