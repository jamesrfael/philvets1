import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { IoCloseCircle } from "react-icons/io5";

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
    { productId: "", productName: "", price: 0, quantity: 1, lineTotal: 0 },
  ]);
  const [discountType, setDiscountType] = useState("amount"); // "amount" or "percent"
  const [discountValue, setDiscountValue] = useState(0);

  const handleAddProduct = () => {
    setOrderDetails([
      ...orderDetails,
      { productId: "", productName: "", price: 0, quantity: 1, lineTotal: 0 },
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
    updatedOrderDetails[index].lineTotal =
      updatedOrderDetails[index].quantity * updatedOrderDetails[index].price;
    setOrderDetails(updatedOrderDetails);
  };

  const handleQuantityChange = (index, value) => {
    const updatedOrderDetails = [...orderDetails];
    updatedOrderDetails[index].quantity = Math.max(1, value); // Ensure quantity is at least 1
    updatedOrderDetails[index].lineTotal =
      updatedOrderDetails[index].quantity * updatedOrderDetails[index].price;
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
      purchaseOrderTotQty: orderDetails.reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
      purchaseOrderTotal: finalTotal, // Adjusted total
      purchaseOrderDiscount: discountValue,
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

  // Compute totals
  const totalQuantity = orderDetails.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalValue = orderDetails.reduce(
    (acc, item) => acc + item.lineTotal,
    0
  );

  // Compute discount amount based on type
  const discountAmount =
    discountType === "percent"
      ? totalValue * (discountValue / 100)
      : discountValue;
  const finalTotal = totalValue - discountAmount;

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
                          handleQuantityChange(
                            index,
                            Number(e.target.value)
                          )
                        }
                      />
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
              <TotalRow>
                <TotalLabel>Discount:</TotalLabel>
                <DiscountContainer>
                  <DiscountInput
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(Number(e.target.value))}
                  />
                  <DiscountSelect
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                  >
                    <option value="amount">Amount</option>
                    <option value="percent">%</option>
                  </DiscountSelect>
                </DiscountContainer>
              </TotalRow>
              <TotalRow>
                <TotalLabel>Total:</TotalLabel>
                <TotalValue
                  style={{ color: "green", fontWeight: "bold" }}
                >{`₱${finalTotal.toFixed(2)}`}</TotalValue>
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
  width: 90%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
  position: relative; /* For positioning the close button */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: 700; /* Make the h2 bolder */
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.fail};
`;

const ModalBody = styled.div``;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DescriptionBox = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

const OrderDetailsSection = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 10px;
    border-top: 1px solid #ddd; /* Add border at the top */
    border-bottom: 1px solid #ddd; /* Add border at the bottom */
    border-left: none; /* Remove border on the left */
    border-right: none; /* Remove border on the right */
    text-align: center;
  }

  th {
    background: ${colors.primary};
    color: white;
  }
`;


const AddProductButton = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const TotalSection = styled.div`
  margin-top: 20px;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const TotalLabel = styled.span`
  font-weight: bold;
`;

const TotalValue = styled.span`
  font-weight: bold; /* Make TotalValue bold */
`;

const DiscountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DiscountInput = styled.input`
  width: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const DiscountSelect = styled.select`
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${colors.fail};
  font-size: 1.2rem;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background: ${colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

export default AddPurchaseModal;
