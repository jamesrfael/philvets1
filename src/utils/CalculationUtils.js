// src/utils/CalculationUtils.js

// Function to calculate the total price for a line item, including applying any discounts
export const calculateLineTotal = (detail) => {
  const totalBeforeDiscount = detail.quantity * detail.price; // Calculate total before discount
  const discountAmount = calculateDiscountAmount(detail); // Use the helper function to get discount amount
  const lineTotal = totalBeforeDiscount - discountAmount;
  return Math.max(0, lineTotal); // Ensure the total isn't negative
};

// Function to calculate the discount amount based on the discount type and value
export const calculateDiscountAmount = (detail) => {
  const totalBeforeDiscount = detail.quantity * detail.price; // Calculate total before discount
  let discountAmount = 0;

  if (detail.discountType === "percent") {
    // Calculate percentage-based discount on totalBeforeDiscount
    discountAmount = totalBeforeDiscount * (detail.discountValue / 100);
  } else if (detail.discountType === "amount") {
    // Use the fixed discount amount
    discountAmount = detail.discountValue;
  }

  return discountAmount;
};

// Function to calculate the total quantity of all items in the order
export const calculateTotalQuantity = (orderDetails) => {
  return orderDetails.reduce((acc, item) => acc + item.quantity, 0);
};

// Function to calculate the total value of all items in the order, considering the discount
export const calculateTotalValue = (orderDetails) => {
  return orderDetails.reduce((acc, item) => {
    const lineTotal = calculateLineTotal(item); // Use calculateLineTotal to get the adjusted total for each item
    return acc + lineTotal;
  }, 0);
};
