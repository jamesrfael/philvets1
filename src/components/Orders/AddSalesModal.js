import React, { useState } from "react";
import Modal from "../Layout/Modal";
import { IoCloseCircle } from "react-icons/io5";
import { calculateLineTotal, calculateTotalQuantity, calculateTotalValue } from "../../utils/CalculationUtils";
import { Field, Label, Input, Select, OrderDetailsSection, Table, AddProductButton, DeleteButton, TotalSection, TotalRow, TotalLabel, TotalValue, SaveButton, DiscountContainer, DiscountInput, QuantityInput, SuggestionsList, SuggestionItem } from "./OrderStyles";

const products = [
  { id: 1, name: "Canine Dewormer", price: 20.0 },
  { id: 2, name: "Feline Dewormer", price: 8.0 },
  { id: 3, name: "Canine Nutritional Supplement", price: 30.0 },
];

const deliveryOptions = [
  { value: "standard", label: "Standard Delivery" },
  { value: "express", label: "Express Delivery" },
  { value: "same-day", label: "Same Day Delivery" },
  { value: "pickup", label: "Pickup" },
];

const paymentTermsOptions = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "credit", label: "Credit" },
  { value: "installment", label: "Installment" },
];

const AddSalesModal = ({ onClose, onSave }) => {
  const [clientName, setClientName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentTerms, setPaymentTerms] = useState("cod");
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

  const handleDiscountChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];

    if (value !== "" && !isNaN(value)) {
      value = String(value).replace(/^0+(?=\d)/, "");
      if (value < 0) return;
    }

    updatedOrderDetails[index].discountValue = value;
    updatedOrderDetails[index].lineTotal = calculateLineTotal(updatedOrderDetails[index]);
    setOrderDetails(updatedOrderDetails);
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];

    const newOrder = {
      orderType: "Purchase Order",
      clientName,
      province,
      city,
      mobileNumber,
      deliveryOption,
      paymentTerms,
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
    <Modal title="Add Sales Order" onClose={onClose}>
      <Field>
        <Label>Client Name</Label>
        <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
      </Field>
      <Field>
        <Label>Location</Label>
        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            placeholder="Province"
          />
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
        </div>
      </Field>
      <Field>
        <Label>Mobile Number</Label>
        <Input
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          maxLength="11"
          placeholder="09123456789"
        />
      </Field>
      <Field>
        <Label>Delivery Option</Label>
        <Select
          value={deliveryOption}
          onChange={(e) => setDeliveryOption(e.target.value)}
        >
          {deliveryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label>Payment Terms</Label>
        <Select
          value={paymentTerms}
          onChange={(e) => setPaymentTerms(e.target.value)}
        >
          {paymentTermsOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
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
                      onChange={(e) => handleProductInputChange(index, e.target.value)}
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
                <td>₱{detail.price.toFixed(2)}</td>
                <td>
                  <QuantityInput
                    type="number"
                    min="1"
                    value={detail.quantity}
                    onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                  />
                </td>
                <td>
                  <DiscountContainer style={{ display: "flex", justifyContent: "center" }}>
                    <DiscountInput
                      type="number"
                      min="0"
                      value={detail.discountValue}
                      onChange={(e) => handleDiscountChange(index, e.target.value)}
                    />
                  </DiscountContainer>
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
        <AddProductButton onClick={handleAddProduct}>Add Another Product</AddProductButton>
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
      <SaveButton onClick={handleSave}>Save Order</SaveButton>
    </Modal>
  );
};

export default AddSalesModal;
