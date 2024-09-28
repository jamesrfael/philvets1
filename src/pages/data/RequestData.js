export const requests = [
    {
      requestBy: "Christine Hermosa",  
      requestDate: "Feb 14, 2023",  
      status: "Completed",  
      deliveryDateExpected: "Feb 20, 2023",  
      clientID: "C001",  
      description: "This delivery is for Christine Hermosa and includes a selection of various pet medications...",
      orderDetails: [  // Matches ORDER_REQUEST_DETAILS
        { productName: "Dog Food - Premium", quantity: 3 },
        { productName: "Cat Litter - Clumping", quantity: 7 },
        { productName: "Flea Treatment - Medium Dogs", quantity: 2 },
        { productName: "Cat Medication - Allergy Relief", quantity: 5 },
        { productName: "Dog Vitamins - Joint Health", quantity: 10 },
        { productName: "Bird Seed Mix - Premium", quantity: 3 },
      ],
    },
    {
      requestBy: "John Doe",  // User who made the request
      requestDate: "Mar 2, 2023",
      status: "Pending",  // Order is pending
      deliveryDateExpected: "Mar 5, 2023",
      clientID: "C002",
      description: "Order for John Doe with various pet medications.",
      orderDetails: [
        { productName: "Cat Medication - Allergy Relief", quantity: 5 },
        { productName: "Dog Vitamins - Joint Health", quantity: 10 },
        { productName: "Bird Seed Mix - Premium", quantity: 3 },
      ],
    },
    {
      requestBy: "Alice Smith",
      requestDate: "Jan 20, 2023",
      status: "Cancelled",  // Order was cancelled
      deliveryDateExpected: "",
      clientID: "C003",
      description: "Cancelled order for Alice Smith's pet care items.",
      orderDetails: [
        { productName: "Dog Shampoo - Sensitive Skin", quantity: 4 },
        { productName: "Cat Flea Collars", quantity: 4 },
        { productName: "Hamster Cage - Large", quantity: 2 },
      ],
    },
    {
      requestBy: "Michael Johnson",
      requestDate: "Apr 10, 2023",
      status: "Completed",
      deliveryDateExpected: "Apr 15, 2023",
      clientID: "C004",
      description: "Order for Michael Johnson, including various pet supplies and equipment.",
      orderDetails: [
        { productName: "Dog Bed - Orthopedic", quantity: 6 },
        { productName: "Cat Scratching Post", quantity: 6 },
        { productName: "Aquarium Kit - 20 Gallon", quantity: 4 },
      ],
    },
    {
      requestBy: "Emily Davis",
      requestDate: "May 5, 2023",
      status: "Completed",
      deliveryDateExpected: "May 10, 2023",
      clientID: "C005",
      description: "Order for Emily Davis including various high-demand veterinary products.",
      orderDetails: [
        { productName: "Horse Supplements - Performance", quantity: 10 },
        { productName: "Dog Training Collar", quantity: 10 },
        { productName: "Pet Carrier - Airline Approved", quantity: 5 },
      ],
    },
  ];
  