import React, { useState } from "react";
import Modal from "../Layout/Modal";
import Button from "../Layout/Button";
import styled from "styled-components";
import { IoCloseCircle } from "react-icons/io5";
import {
  calculateLineTotal,
  calculateTotalQuantity,
  calculateTotalValue,
} from "../../utils/CalculationUtils";
import {
  Field,
  Label,
  Input,
  OrderDetailsSection,
  Table,
  DeleteButton,
  TotalSection,
  TotalRow,
  TotalLabel,
  TotalValue,
  QuantityInput,
  SuggestionsList,
  SuggestionItem,
  SuggestionsContainer,
} from "./OrderStyles";
import { suppliers } from "../../pages/data/SupplierData"; // Ensure this path is correct

const products = [
  { id: 1, name: "Canine Dewormer", price: 20.0 },
  { id: 2, name: "Feline Dewormer", price: 8.0 },
  { id: 3, name: "Canine Nutritional Supplement", price: 30.0 },
];

const AddPurchaseModal = ({ onClose, onSave }) => {
  const [supplierName, setSupplierName] = useState("");
  const [supplierNumber, setSupplierNumber] = useState("");
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonNumber, setContactPersonNumber] = useState("");

  const [orderDetails, setOrderDetails] = useState([
    {
      productId: "",
      productName: "",
      price: 0,
      quantity: 1,
      discountValue: 0,
      lineTotal: 0,
    },
  ]);

  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [supplierSearch, setSupplierSearch] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null);

  const handleAddProduct = () => {
    setOrderDetails([
      ...orderDetails,
      {
        productId: "",
        productName: "",
        price: 0,
        quantity: 1,
        discountValue: 0,
        lineTotal: 0,
      },
    ]);
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
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );

    setOrderDetails(updatedOrderDetails);
    setProductSearch("");
    setFilteredProducts(products);
    setCurrentEditingIndex(null);
  };

  const handleSupplierInputChange = (value) => {
    setSupplierSearch(value);

    const filtered = suppliers.filter((supplier) =>
      supplier.supplierName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleSupplierSelect = (supplier) => {
    // Update the state to reflect the selected supplier
    setSupplierName(supplier.supplierName); // Populate supplier name
    setSupplierNumber(supplier.supplierNumber); // Populate supplier number
    setContactPersonName(supplier.contactPersonName); // Populate contact person name
    setContactPersonNumber(supplier.contactPersonNumber); // Populate contact person number

    setSupplierSearch(""); // Clear the search input after selection
    setFilteredSuppliers([]); // Clear suggestions
  };

  const handleQuantityChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].quantity = Math.max(1, value);
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleDiscountChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];

    if (value !== "" && !isNaN(value)) {
      value = String(value).replace(/^0+(?=\d)/, ""); // Remove leading zeros
      if (value < 0) return;
    }

    updatedOrderDetails[index].discountValue = value === "" ? 0 : value;
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handlePriceChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];

    if (value !== "" && !isNaN(value)) {
      value = String(value).replace(/^0+(?=\d)/, ""); // Remove leading zeros
      if (value < 0) return; // Prevent negative values
    }

    updatedOrderDetails[index].price = value === "" ? 0 : Math.max(0, value);
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];

    const newOrder = {
      orderType: "Purchase Order",
      supplierName,
      supplierNumber,
      contactPersonName,
      contactPersonNumber,
      purchaseOrderDlvryDate: today,
      purchaseOrderStatus: "Pending",
      purchaseOrderTotQty: calculateTotalQuantity(orderDetails),
      purchaseOrderTotal: calculateTotalValue(orderDetails),
      clientId: "",
      purchaseOrderDetails: orderDetails.map(({ lineTotal, ...rest }) => rest),
    };
    onSave(newOrder);
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
    <Modal title="Add Purchase Order" onClose={onClose}>
      <Field>
        <Label>Supplier Name</Label>
        <Input
          value={supplierSearch} // Keep this as the search input value
          onChange={(e) => handleSupplierInputChange(e.target.value)}
          placeholder="Search Supplier"
        />
        {/* Container for suggestions */}
        <SuggestionsContainer>
          {supplierSearch && filteredSuppliers.length > 0 && (
            <SuggestionsList>
              {filteredSuppliers.map((supplier) => (
                <SuggestionItem
                  key={supplier.supplierNumber}
                  onClick={() => handleSupplierSelect(supplier)} // When clicked, this fills the input
                >
                  {supplier.supplierName}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </SuggestionsContainer>
      </Field>
      <Field>
        <Label>Supplier Number</Label>
        <Input
          value={supplierNumber}
          readOnly // Make this read-only; auto-filled when supplier is selected
        />
      </Field>
      <Field>
        <Label>Contact Person Name</Label>
        <Input
          value={contactPersonName}
          readOnly // Make this read-only; auto-filled when supplier is selected
        />
      </Field>
      <Field>
        <Label>Contact Person Number</Label>
        <Input
          value={contactPersonNumber}
          readOnly // Make this read-only; auto-filled when supplier is selected
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
                  <div style={{ position: "relative" }}>
                    <Input
                      value={detail.productName}
                      onChange={(e) =>
                        handleProductInputChange(index, e.target.value)
                      }
                      placeholder="Search / Filter product"
                    />
                    {currentEditingIndex === index && productSearch && (
                      <SuggestionsList>
                        {filteredProducts.map((product) => (
                          <SuggestionItem
                            key={product.id}
                            onClick={() => handleProductSelect(index, product)}
                          >
                            {product.name}
                          </SuggestionItem>
                        ))}
                      </SuggestionsList>
                    )}
                  </div>
                </td>
                <td>
                  <Input
                    type="number"
                    min="0"
                    value={detail.price}
                    onFocus={(e) => {
                      if (e.target.value === "0") e.target.value = ""; // Clear 0 on focus
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") e.target.value = 0; // Reset to 0 if empty on blur
                    }}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                  />
                </td>
                <td>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={detail.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    min="0"
                    value={detail.discountValue}
                    onFocus={(e) => {
                      if (e.target.value === "0") e.target.value = ""; // Clear 0 on focus
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") e.target.value = 0; // Reset to 0 if empty on blur
                    }}
                    onChange={(e) =>
                      handleDiscountChange(index, e.target.value)
                    }
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
          Add Purchase Order
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

const ButtonGroup = styled.div`
display: flex;
gap: 10px;
justify-content: flex-end;
`;

export default AddPurchaseModal;
