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
} from "../OrderStyles";
import { FaPlus } from "react-icons/fa";
import useAddPurchaseOrderModal from "../../../hooks/useAddPurchaseOrderModal";
import { calculateLineTotal, calculateTotalQuantity, calculateTotalValue, calculateTotalDiscount } from "../../../utils/CalculationUtils"; // Import calculation utilities

const AddPurchaseOrderModal = ({ onClose, onSave }) => {
  const {
    contactPersonName,
    setContactPersonName,
    contactPersonNumber,
    setContactPersonNumber,
    supplierCompanyName,
    setSupplierCompanyName,
    supplierCompanyNum,
    setSupplierCompanyNum,
    editable,
    supplierSearch,
    filteredSuppliers,
    orderDetails,
    productSearch,
    filteredProducts,
    currentEditingIndex,
    handleAddProduct,
    handleProductInputChange,
    handleProductSelect,
    handleSupplierInputChange,
    handleSupplierSelect,
    handleQuantityChange,
    handlePriceChange,
    handleSave,
    handleRemoveProduct,
    handleAddSupplier,
    setOrderDetails, // Ensure setOrderDetails is included for state updates
  } = useAddPurchaseOrderModal(onSave, onClose);

  // Calculate total values
  const totalQuantity = calculateTotalQuantity(orderDetails); // Total quantity of items
  const totalValue = calculateTotalValue(orderDetails); // Total value considering discounts
  const totalDiscount = calculateTotalDiscount(orderDetails); // Total discount

  return (
    <Modal title="Add Purchase Order" onClose={onClose}>
      <Field>
        <Label>Supplier Search</Label>
        <SupplierSearchContainer>
          <Input
            value={supplierSearch}
            onChange={(e) => handleSupplierInputChange(e.target.value)}
            placeholder="Search Supplier"
          />
          <PIconButton onClick={handleAddSupplier}>
            <FaPlus className="icon" /> Supplier
          </PIconButton>
        </SupplierSearchContainer>
        {supplierSearch && filteredSuppliers.length > 0 && (
          <SuggestionsContainer>
            <SuggestionsList>
              {filteredSuppliers.map((supplier) => (
                <SuggestionItem
                  key={supplier.SUPP_COMPANY_NUM}
                  onClick={() => handleSupplierSelect(supplier)}
                >
                  {supplier.SUPP_COMPANY_NAME}
                </SuggestionItem>
              ))}
            </SuggestionsList>
          </SuggestionsContainer>
        )}
      </Field>
      <Field>
        <Label>Supplier Name</Label>
        <Input
          value={supplierCompanyName}
          onChange={(e) => setSupplierCompanyName(e.target.value)}
          placeholder="Supplier Name"
          disabled={!editable}
        />
      </Field>
      <Field>
        <Label>Supplier Contact Number</Label>
        <Input
          value={supplierCompanyNum}
          onChange={(e) => setSupplierCompanyNum(e.target.value)}
          placeholder="Supplier Contact Number"
          disabled={!editable}
        />
      </Field>
      <Field>
        <Label>Contact Person</Label>
        <Input
          value={contactPersonName}
          onChange={(e) => setContactPersonName(e.target.value)}
          placeholder="Contact Person Name"
          disabled={!editable}
        />
      </Field>
      <Field>
        <Label>Contact Number</Label>
        <Input
          value={contactPersonNumber}
          onChange={(e) => setContactPersonNumber(e.target.value)}
          placeholder="Contact Person Number"
          disabled={!editable}
        />
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
                      handleQuantityChange(index, parseInt(e.target.value, 10))
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

        <Button onClick={handleAddProduct} style={{ marginTop: "10px" }}>
          Add Product
        </Button>

        <TotalSection>
          <TotalRow>
            <TotalLabel>Total Quantity</TotalLabel>
            <TotalValue>{totalQuantity}</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Total Discount</TotalLabel>
            <TotalValue style={{ color: "#ff5757" }}>₱{totalDiscount.toFixed(2)}</TotalValue>
          </TotalRow>
          <TotalRow>
            <TotalLabel>Total Value</TotalLabel>
            <TotalValue style={{ color: "#1DBA0B" }}>₱{totalValue.toFixed(2)}</TotalValue>
          </TotalRow>
        </TotalSection>
      </OrderDetailsSection>

      <ButtonGroup>
        <Button variant="fail" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add Order
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default AddPurchaseOrderModal;
