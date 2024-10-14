import React, { useState } from "react";
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
import {
  calculateLineTotal,
  calculateTotalQuantity,
  calculateTotalValue,
  calculateTotalDiscount,
} from "../../../utils/CalculationUtils"; // Import calculation utilities

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

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};

    // Validate required fields
    if (!supplierCompanyName) newErrors.supplierCompanyName = true;
    if (!supplierCompanyNum) newErrors.supplierCompanyNum = true;
    if (!contactPersonName) newErrors.contactPersonName = true;
    if (!contactPersonNumber) newErrors.contactPersonNumber = true;

    // Validate contact numbers (must be 11 digits and start with 0)
    if (!/^(0\d{10})?$/.test(contactPersonNumber)) {
      newErrors.contactPersonNumber = true;
    }
    if (!/^(0\d{10})?$/.test(supplierCompanyNum)) {
      newErrors.supplierCompanyNum = true;
    }

    // Validate order details (ensure product name is not empty)
    orderDetails.forEach((detail, index) => {
      if (!detail.productName) {
        newErrors[`productName${index}`] = true;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveWithValidation = () => {
    if (validateFields()) {
      handleSave(); // Proceed to save only if validation passes
    }
  };

  // Automatically clear error messages when input is valid
  const clearError = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: undefined, // Remove the specific error
    }));
  };

  // Function to handle number input and ensure first digit is '0'
  const handlePhoneNumberChange = (setterFunction, value) => {
    let sanitizedValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    if (sanitizedValue.length > 11) {
      sanitizedValue = sanitizedValue.slice(0, 11); // Limit to 11 digits
    }

    // Ensure the first digit is '0'
    if (sanitizedValue && sanitizedValue[0] !== "0") {
      sanitizedValue = "0" + sanitizedValue.slice(0, 10);
    }

    setterFunction(sanitizedValue);
  };

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
        <Label>
          Supplier Name{" "}
          {errors.supplierCompanyName && (
            <span style={{ color: "red" }}>*</span>
          )}
        </Label>
        <Input
          value={supplierCompanyName}
          onChange={(e) => {
            setSupplierCompanyName(e.target.value);
            clearError("supplierCompanyName"); // Clear error on change
          }}
          placeholder="Supplier Name"
          disabled={!editable}
        />
      </Field>
      <Field>
        <Label>
          Supplier Contact Number{" "}
          {errors.supplierCompanyNum && <span style={{ color: "red" }}>*</span>}
        </Label>
        <Input
          value={supplierCompanyNum}
          onChange={(e) => {
            handlePhoneNumberChange(setSupplierCompanyNum, e.target.value);
            clearError("supplierCompanyNum"); // Clear error on change
          }}
          placeholder="Supplier Contact Number"
          disabled={!editable}
        />
      </Field>
      <Field>
        <Label>
          Contact Person{" "}
          {errors.contactPersonName && <span style={{ color: "red" }}>*</span>}
        </Label>
        <Input
          value={contactPersonName}
          onChange={(e) => {
            setContactPersonName(e.target.value);
            clearError("contactPersonName"); // Clear error on change
          }}
          placeholder="Contact Person Name"
          disabled={!editable}
        />
      </Field>
      <Field>
        <Label>
          Contact Number{" "}
          {errors.contactPersonNumber && (
            <span style={{ color: "red" }}>*</span>
          )}
        </Label>
        <Input
          value={contactPersonNumber}
          onChange={(e) => {
            handlePhoneNumberChange(setContactPersonNumber, e.target.value);
            clearError("contactPersonNumber"); // Clear error on change
          }}
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
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 20px)",
                    }}
                    value={orderDetail.productName}
                    onChange={(e) => {
                      handleProductInputChange(index, e.target.value);
                      clearError(`productName${index}`); // Clear error on change
                    }}
                    placeholder="Product Name"
                  />
                  {errors[`productName${index}`] && (
                    <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                  )}
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
                      };
                      setOrderDetails(updatedOrderDetails);
                    }}
                    placeholder="Discount"
                  />
                </td>
                <td>{calculateLineTotal(orderDetail)}</td>
                <td>
                  <DeleteButton onClick={() => handleRemoveProduct(index)}>
                    <IoCloseCircle className="icon" />
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
        <Button variant="primary" onClick={handleSaveWithValidation}>
          Add Order
        </Button>
      </ButtonGroup>
    </Modal>
  );
};

export default AddPurchaseOrderModal;
