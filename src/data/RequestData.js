export const requests = [
  {
    requestBy: "Christine Hermosa",
    requestDate: "Feb 14, 2023",
    status: "Completed",
    deliveryDateExpected: "Feb 20, 2023",
    clientID: "C001",
    description: "This delivery is for Christine Hermosa and includes a selection of various pet medications...",
    orderDetails: [
      { productName: "Dog Food - Premium", quantity: 3 },
      { productName: "Cat Litter - Clumping", quantity: 7 },
      { productName: "Flea Treatment - Medium Dogs", quantity: 2 },
      { productName: "Cat Medication - Allergy Relief", quantity: 5 },
      { productName: "Dog Vitamins - Joint Health", quantity: 10 },
      { productName: "Bird Seed Mix - Premium", quantity: 3 },
    ],
  },
  {
    requestBy: "John Doe",
    requestDate: "Mar 2, 2023",
    status: "Pending",
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
    status: "Cancelled",
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
  // New Requests
  {
    requestBy: "Daniel Kim",
    requestDate: "Mar 15, 2023",
    status: "Completed",
    deliveryDateExpected: "Mar 20, 2023",
    clientID: "C006",
    description: "Complete order for Daniel Kim, focused on cat care products.",
    orderDetails: [
      { productName: "Cat Food - Grain Free", quantity: 10 },
      { productName: "Cat Tree - Multi-Level", quantity: 2 },
      { productName: "Cat Medication - Pain Relief", quantity: 5 },
    ],
  },
  {
    requestBy: "Sophia Lee",
    requestDate: "Mar 22, 2023",
    status: "Pending",
    deliveryDateExpected: "Mar 29, 2023",
    clientID: "C007",
    description: "Pending order for Sophia Lee containing dog supplies.",
    orderDetails: [
      { productName: "Dog Food - Grain Free", quantity: 4 },
      { productName: "Dog Leash - Reflective", quantity: 1 },
      { productName: "Dog Chews - Natural", quantity: 12 },
    ],
  },
  {
    requestBy: "Joshua Rivera",
    requestDate: "Mar 30, 2023",
    status: "Completed",
    deliveryDateExpected: "Apr 5, 2023",
    clientID: "C008",
    description: "Order for Joshua Rivera including various small animal supplies.",
    orderDetails: [
      { productName: "Rabbit Food - Organic", quantity: 5 },
      { productName: "Guinea Pig Cage - Medium", quantity: 1 },
      { productName: "Hedgehog Food - Specialty", quantity: 6 },
    ],
  },
  {
    requestBy: "Olivia Martin",
    requestDate: "Apr 1, 2023",
    status: "Cancelled",
    deliveryDateExpected: "",
    clientID: "C009",
    description: "Cancelled order for Olivia Martin's dog training supplies.",
    orderDetails: [
      { productName: "Dog Training Manual", quantity: 1 },
      { productName: "Dog Harness - Medium", quantity: 3 },
    ],
  },
  {
    requestBy: "Ethan Wong",
    requestDate: "Apr 15, 2023",
    status: "Completed",
    deliveryDateExpected: "Apr 20, 2023",
    clientID: "C010",
    description: "Ethan Wong's order focused on aquatic pets.",
    orderDetails: [
      { productName: "Fish Tank - 55 Gallon", quantity: 1 },
      { productName: "Aquarium Filter - 30 Gallon", quantity: 2 },
      { productName: "Aquatic Plant Food", quantity: 5 },
    ],
  },
  {
    requestBy: "Ava Chen",
    requestDate: "Apr 20, 2023",
    status: "Pending",
    deliveryDateExpected: "Apr 25, 2023",
    clientID: "C011",
    description: "Pending order for Ava Chen, consisting of grooming supplies.",
    orderDetails: [
      { productName: "Dog Grooming Kit", quantity: 1 },
      { productName: "Cat Grooming Brush", quantity: 2 },
    ],
  },
  {
    requestBy: "Liam White",
    requestDate: "May 1, 2023",
    status: "Completed",
    deliveryDateExpected: "May 5, 2023",
    clientID: "C012",
    description: "Liam White's order for pet supplements.",
    orderDetails: [
      { productName: "Dog Vitamins - Daily", quantity: 20 },
      { productName: "Cat Probiotics", quantity: 15 },
    ],
  },
  {
    requestBy: "Isabella Brown",
    requestDate: "May 10, 2023",
    status: "Pending",
    deliveryDateExpected: "May 15, 2023",
    clientID: "C013",
    description: "Pending order for Isabella Brown's hamster supplies.",
    orderDetails: [
      { productName: "Hamster Food - Premium", quantity: 10 },
      { productName: "Hamster Exercise Wheel", quantity: 3 },
    ],
  },
  {
    requestBy: "Mason Rodriguez",
    requestDate: "May 15, 2023",
    status: "Completed",
    deliveryDateExpected: "May 20, 2023",
    clientID: "C014",
    description: "Order for Mason Rodriguez, includes various dog supplies.",
    orderDetails: [
      { productName: "Dog Boots - Waterproof", quantity: 4 },
      { productName: "Dog Bowls - Set of 2", quantity: 2 },
    ],
  },
  {
    requestBy: "Sofia Scott",
    requestDate: "May 20, 2023",
    status: "Completed",
    deliveryDateExpected: "May 25, 2023",
    clientID: "C015",
    description: "Order for Sofia Scott focused on pet enrichment.",
    orderDetails: [
      { productName: "Interactive Dog Toy", quantity: 5 },
      { productName: "Cat Puzzle Feeder", quantity: 3 },
    ],
  },
  {
    requestBy: "James Hall",
    requestDate: "May 25, 2023",
    status: "Pending",
    deliveryDateExpected: "May 30, 2023",
    clientID: "C016",
    description: "Pending order for James Hall's bird supplies.",
    orderDetails: [
      { productName: "Bird Cage - Large", quantity: 1 },
      { productName: "Bird Food - Tropical Mix", quantity: 6 },
    ],
  },
  {
    requestBy: "Avery Young",
    requestDate: "Jun 1, 2023",
    status: "Completed",
    deliveryDateExpected: "Jun 5, 2023",
    clientID: "C017",
    description: "Order for Avery Young containing dog training items.",
    orderDetails: [
      { productName: "Agility Training Set", quantity: 1 },
      { productName: "Clicker Training Tool", quantity: 10 },
    ],
  },
  {
    requestBy: "Lucas King",
    requestDate: "Jun 10, 2023",
    status: "Completed",
    deliveryDateExpected: "Jun 15, 2023",
    clientID: "C018",
    description: "Order for Lucas King including various cat care products.",
    orderDetails: [
      { productName: "Cat Food - Indoor", quantity: 5 },
      { productName: "Cat Toys - Assorted", quantity: 15 },
    ],
  },
  {
    requestBy: "Zoe Martinez",
    requestDate: "Jun 20, 2023",
    status: "Pending",
    deliveryDateExpected: "Jun 25, 2023",
    clientID: "C019",
    description: "Pending order for Zoe Martinez focused on small animals.",
    orderDetails: [
      { productName: "Guinea Pig Food", quantity: 10 },
      { productName: "Rabbit Hay", quantity: 15 },
    ],
  },
  {
    requestBy: "Evelyn Carter",
    requestDate: "Jul 1, 2023",
    status: "Completed",
    deliveryDateExpected: "Jul 5, 2023",
    clientID: "C020",
    description: "Order for Evelyn Carter including various bird supplies.",
    orderDetails: [
      { productName: "Parrot Food", quantity: 5 },
      { productName: "Bird Perch - Large", quantity: 3 },
    ],
  },
  {
    requestBy: "Henry Green",
    requestDate: "Jul 10, 2023",
    status: "Cancelled",
    deliveryDateExpected: "",
    clientID: "C021",
    description: "Cancelled order for Henry Green's dog grooming supplies.",
    orderDetails: [
      { productName: "Dog Shampoo - Hypoallergenic", quantity: 3 },
      { productName: "Dog Grooming Scissors", quantity: 2 },
    ],
  },
  {
    requestBy: "Chloe Nguyen",
    requestDate: "Jul 15, 2023",
    status: "Pending",
    deliveryDateExpected: "Jul 20, 2023",
    clientID: "C022",
    description: "Pending order for Chloe Nguyen's reptile supplies.",
    orderDetails: [
      { productName: "Reptile Terrarium - Large", quantity: 1 },
      { productName: "Reptile Food - Premium", quantity: 5 },
    ],
  },
];