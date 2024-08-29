// src/utils/CalculationUtils.js

export const calculateLineTotal = (detail) => {
    const totalBeforeDiscount = detail.quantity * detail.price; // Calculate total before discount
    let discountAmount = 0;
  
    if (detail.discountType === "percent") {
      // Calculate percentage-based discount on totalBeforeDiscount
      discountAmount = totalBeforeDiscount * (detail.discountValue / 100);
    } else if (detail.discountType === "amount") {
      // Use the fixed discount amount
      discountAmount = detail.discountValue;
    }
  
    const lineTotal = totalBeforeDiscount - discountAmount;
    return Math.max(0, lineTotal); // Ensure the total isn't negative
  };
  
  export const calculateTotalQuantity = (orderDetails) => {
    return orderDetails.reduce((acc, item) => acc + item.quantity, 0);
  };
  
  export const calculateTotalValue = (orderDetails) => {
    return orderDetails.reduce((acc, item) => acc + item.lineTotal, 0);
  };
  