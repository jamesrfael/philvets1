import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import {
  calculateLineTotal,
  calculateTotalQuantity,
  calculateTotalValue,
} from "../../utils/CalculationUtils"; // Import utility functions
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Field,
  Label,
  Input,
  Select,
  DescriptionBox,
  OrderDetailsSection,
  Table,
  AddProductButton,
  DeleteButton,
  TotalSection,
  TotalRow,
  TotalLabel,
  TotalValue,
  SaveButton,
  CloseButton,
  DiscountContainer,
  DiscountInput,
  DiscountSelect,
  QuantityInput,
  SuggestionsList,
  SuggestionItem,
} from "./OrderStyles"; // Import styles from a separate file

// Sample products for selection
const products = [
  { id: 1, name: "Canine Dewormer", price: 20.0 },
  { id: 2, name: "Feline Dewormer", price: 8.0 },
  { id: 3, name: "Canine Nutritional Supplement", price: 30.0 },
];

const AddPurchaseModal = ({ onClose, onSave }) => {
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
  const [productSearch, setProductSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentEditingIndex, setCurrentEditingIndex] = useState(null); // Track which row is being edited

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
    setCurrentEditingIndex(index); // Set the index of the row being edited
    setProductSearch(value);

    // Filter products based on input value
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);

    // Update order details with the input value as productName
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
    setProductSearch(""); // Reset search input after selection
    setFilteredProducts(products); // Reset filtered products
    setCurrentEditingIndex(null); // Reset current editing index
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
      orderType: "Purchase Order",
      clientName,
      location,
      purchaseOrderDlvryDate: today, // Set delivery date to today
      purchaseOrderStatus: "Pending",
      purchaseOrderTotQty: calculateTotalQuantity(orderDetails), // Use utility function
      purchaseOrderTotal: calculateTotalValue(orderDetails), // Use utility function
      purchaseOrderDlvrOpt: deliveryOption,
      clientId: "", // Not used for now
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

  // Compute totals using utility functions
  const totalQuantity = calculateTotalQuantity(orderDetails);
  const totalValue = calculateTotalValue(orderDetails);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>Add Purchase Order</h2>
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
                      <div style={{ position: "relative" }}>
                        <Input
                          value={detail.productName}
                          onChange={(e) =>
                            handleProductInputChange(index, e.target.value)
                          }
                          placeholder="Search product" // Placeholder added here
                        />
                        {currentEditingIndex === index && productSearch && (
                          <SuggestionsList>
                            {filteredProducts.map((product) => (
                              <SuggestionItem
                                key={product.id}
                                onClick={() =>
                                  handleProductSelect(index, product)
                                }
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
        </ModalBody>
        <ModalFooter>
          <SaveButton onClick={handleSave}>Save Order</SaveButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddPurchaseModal;
