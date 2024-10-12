import React from "react";
import Modal from "../../Layout/Modal";
import Button from "../../Layout/Button";
import { IoCloseCircle } from "react-icons/io5";
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
  SupplierSearchContainer,
  PIconButton,
  ButtonGroup,
  Select,
} from "../OrderStyles";
import { FaPlus } from "react-icons/fa";
import useAddCustomerOrderModal from "../../../hooks/useAddCustomerOrderModal";
import {
  calculateLineTotal,
  calculateTotalDiscount,
} from "../../../utils/CalculationUtils"; // Import calculation utilities
import "../../../styles.css"; // Import your custom styles

const AddCustomerOrderModal = ({ onClose, onSave }) => {
  const {
    clientName,
    setClientName,
    clientCity,
    setClientCity,
    clientProvince,
    setClientProvince,
    clientEmail,
    setClientEmail,
    deliveryOption,
    setDeliveryOption,
    paymentTerms,
    setPaymentTerms,
    editable,
    clientSearch,
    filteredClients,
    orderDetails,
    productSearch,
    filteredProducts,
    currentEditingIndex,
    handleAddProduct,
    handleProductInputChange,
    handleProductSelect,
    handleClientInputChange,
    handleClientSelect,
    handleQuantityChange,
    handlePriceChange,
    handleSave,
    handleRemoveProduct,
    handleAddClient,
    totalQuantity,
    totalValue,
    setOrderDetails,
  } = useAddCustomerOrderModal(onSave, onClose);

  // Calculate total discount
  const totalDiscount = calculateTotalDiscount(orderDetails);

  return (
    <>
      <Modal title="Add Customer Order" onClose={onClose}>
        <Field>
          <Label>Client Search</Label>
          <SupplierSearchContainer>
            <Input
              value={clientSearch}
              onChange={(e) => handleClientInputChange(e.target.value)}
              placeholder="Search Client"
            />
            <PIconButton onClick={handleAddClient}>
              <FaPlus className="icon" /> Client
            </PIconButton>
          </SupplierSearchContainer>
          {clientSearch && filteredClients.length > 0 && (
            <SuggestionsContainer>
              <SuggestionsList>
                {filteredClients.map((client) => (
                  <SuggestionItem
                    key={client.CLIENT_ID}
                    onClick={() => handleClientSelect(client)}
                  >
                    {client.CLIENT_NAME}
                  </SuggestionItem>
                ))}
              </SuggestionsList>
            </SuggestionsContainer>
          )}
        </Field>

        <Field>
          <Label>Client Name</Label>
          <Input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Client Name"
            disabled={!editable}
          />
        </Field>

        <Field>
          <Label>Location</Label>
          <div style={{ display: "flex", gap: "10px" }}>
            <Input
              value={clientProvince}
              onChange={(e) => setClientProvince(e.target.value)}
              placeholder="Province"
              disabled={!editable}
              style={{ flex: 1 }}
            />
            <Input
              value={clientCity}
              onChange={(e) => setClientCity(e.target.value)}
              placeholder="City"
              disabled={!editable}
              style={{ flex: 1 }}
            />
          </div>
        </Field>

        <Field>
          <Label>Client Email</Label>
          <Input
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Client Email"
            disabled={!editable}
          />
        </Field>

        <Field>
          <Label>Delivery Option</Label>
          <Select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
          >
            <option value="">Select Delivery Option</option>
            <option value="pickup">Pickup</option>
            <option value="lbc">LBC</option>
            <option value="jnt">J&T Express</option>
            <option value="grab">Grab Express</option>
            <option value="courier">Courier Service</option>
          </Select>
        </Field>

        <Field>
          <Label>Payment Terms</Label>
          <Select
            value={paymentTerms}
            onChange={(e) => setPaymentTerms(e.target.value)}
          >
            <option value="">Select Payment Terms</option>
            <option value="cod">Cash on Delivery (COD)</option>
            <option value="gcash">GCash</option>
            <option value="installment">Installment</option>
          </Select>
        </Field>

        <OrderDetailsSection>
          <h3>Order Details</h3>
          <Table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((orderDetail, index) => (
                <tr key={index}>
                  <td>
                    <Input
                      value={orderDetail.productName}
                      onChange={(e) =>
                        handleProductInputChange(index, e.target.value)
                      }
                      placeholder="Product Name"
                    />
                    {productSearch && index === currentEditingIndex && (
                      <SuggestionsContainer>
                        {filteredProducts.length > 0 && (
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
                      </SuggestionsContainer>
                    )}
                  </td>
                  <td>
                    <QuantityInput
                      type="number"
                      value={orderDetail.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          index,
                          parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={orderDetail.price}
                      onChange={(e) =>
                        handlePriceChange(index, parseFloat(e.target.value))
                      }
                      placeholder="Price"
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={orderDetail.discountValue}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        const updatedOrderDetails = [...orderDetails];
                        updatedOrderDetails[index] = {
                          ...updatedOrderDetails[index],
                          discountValue: value,
                          discountType: "amount", // Assuming fixed discount
                        };
                        setOrderDetails(updatedOrderDetails); // Update the order details state
                      }}
                      placeholder="Discount"
                    />
                  </td>
                  <td>₱{calculateLineTotal(orderDetail).toFixed(2)}</td>
                  <td>
                    <DeleteButton onClick={() => handleRemoveProduct(index)}>
                      <IoCloseCircle />
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button onClick={handleAddProduct}>Add Product</Button>

          <TotalSection>
            <TotalRow>
              <TotalLabel>Total Quantity</TotalLabel>
              <TotalValue>{totalQuantity}</TotalValue>
            </TotalRow>
            <TotalRow>
              <TotalLabel>Total Discount</TotalLabel>
              <TotalValue style={{ color: "#ff5757" }}>
                ₱{totalDiscount.toFixed(2)}
              </TotalValue>
            </TotalRow>
            <TotalRow>
              <TotalLabel>Total Value</TotalLabel>
              <TotalValue style={{ color: "#1DBA0B" }}>
                ₱{totalValue.toFixed(2)}
              </TotalValue>
            </TotalRow>
          </TotalSection>
        </OrderDetailsSection>

        <ButtonGroup>
          <Button variant="red" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add Order
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  );
};

export default AddCustomerOrderModal;
