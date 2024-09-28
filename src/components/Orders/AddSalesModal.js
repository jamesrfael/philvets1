import React, { useState } from "react";
import Modal from "../Layout/Modal";
import { IoCloseCircle } from "react-icons/io5";
import { calculateLineTotal, calculateTotalQuantity, calculateTotalValue, } from "../../utils/CalculationUtils";
import { Field, Label, Input, Select, DescriptionBox, OrderDetailsSection, Table,
  AddProductButton, DeleteButton, TotalSection, TotalRow, TotalLabel, TotalValue, SaveButton, DiscountContainer, DiscountInput, DiscountSelect, QuantityInput, SuggestionsList, SuggestionItem, } from "./OrderStyles";

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
      discountType: "amount",
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
        discountType: "amount",
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

  const handleQuantityChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].quantity = Math.max(1, value);
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleDiscountChange = (index, field, value) => {
    const updatedOrderDetails = [...orderDetails];

    if (field === "discountValue") {
      if (value !== "" && !isNaN(value)) {
        value = String(value).replace(/^0+(?=\d)/, "");
        if (value < 0) return;
      }
    }

    updatedOrderDetails[index][field] = value;
    updatedOrderDetails[index].lineTotal = calculateLineTotal(
      updatedOrderDetails[index]
    );
    setOrderDetails(updatedOrderDetails);
  };

  const handleSave = () => {
    const today = new Date().toISOString().split("T")[0];

    const newOrder = {
      orderType: "Purchase Order",
      clientName,
      location,
      purchaseOrderDlvryDate: today,
      purchaseOrderStatus: "Pending",
      purchaseOrderTotQty: calculateTotalQuantity(orderDetails),
      purchaseOrderTotal: calculateTotalValue(orderDetails),
      purchaseOrderDlvrOpt: deliveryOption,
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
        <Input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </Field>
      <Field>
        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
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
                <td>₱{detail.price.toFixed(2)}</td>
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
        <AddProductButton onClick={handleAddProduct}>
          Add Another Product
        </AddProductButton>
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
