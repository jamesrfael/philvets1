const PURCHASE_ORDERS = [
    {
        PURCHASE_ORDER_ID: 1,
        PURCHASE_ORDER_DATE: "2024-01-15",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 120,
        PURCHASE_ORDER_TOTAL: 3450.00,
        SUPPLIER_ID: 101,
        USER_ID: 201,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 1,
                PURCH_ORDER_PROD_NAME: "Flea & Tick Treatment",
                PURCH_ORDER_PROD_DESCRIPTION: "Topical treatment for dogs and cats to eliminate fleas and ticks.",
                PURCH_ORDER_QTY: 50,
                PURCH_ORDER_PRICE: 25.00,
                PURCH_ORDER_LINE_TOTAL: 1250.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 2,
                PURCH_ORDER_PROD_NAME: "Dog Wormer",
                PURCH_ORDER_PROD_DESCRIPTION: "Oral medication to treat intestinal worms in dogs.",
                PURCH_ORDER_QTY: 40,
                PURCH_ORDER_PRICE: 20.00,
                PURCH_ORDER_LINE_TOTAL: 800.00
            },
            {
                PURCH_ORDER_DET_ID: 3,
                PURCH_ORDER_PROD_ID: 3,
                PURCH_ORDER_PROD_NAME: "Cat Vaccination Kit",
                PURCH_ORDER_PROD_DESCRIPTION: "Complete vaccination kit for kittens and adult cats.",
                PURCH_ORDER_QTY: 30,
                PURCH_ORDER_PRICE: 25.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 2,
        PURCHASE_ORDER_DATE: "2024-02-15",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 120,
        PURCHASE_ORDER_TOTAL: 3450.00,
        SUPPLIER_ID: 101,
        USER_ID: 201,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 1,
                PURCH_ORDER_PROD_NAME: "Flea & Tick Treatment",
                PURCH_ORDER_PROD_DESCRIPTION: "Topical treatment for dogs and cats to eliminate fleas and ticks.",
                PURCH_ORDER_QTY: 50,
                PURCH_ORDER_PRICE: 25.00,
                PURCH_ORDER_LINE_TOTAL: 1250.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 2,
                PURCH_ORDER_PROD_NAME: "Dog Wormer",
                PURCH_ORDER_PROD_DESCRIPTION: "Oral medication to treat intestinal worms in dogs.",
                PURCH_ORDER_QTY: 40,
                PURCH_ORDER_PRICE: 20.00,
                PURCH_ORDER_LINE_TOTAL: 800.00
            },
            {
                PURCH_ORDER_DET_ID: 3,
                PURCH_ORDER_PROD_ID: 3,
                PURCH_ORDER_PROD_NAME: "Cat Vaccination Kit",
                PURCH_ORDER_PROD_DESCRIPTION: "Complete vaccination kit for kittens and adult cats.",
                PURCH_ORDER_QTY: 30,
                PURCH_ORDER_PRICE: 25.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 3,
        PURCHASE_ORDER_DATE: "2024-03-20",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 75,
        PURCHASE_ORDER_TOTAL: 2250.00,
        SUPPLIER_ID: 102,
        USER_ID: 202,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 4,
                PURCH_ORDER_PROD_NAME: "Horse Supplement",
                PURCH_ORDER_PROD_DESCRIPTION: "Nutritional supplement for maintaining horse health.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 1000.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 5,
                PURCH_ORDER_PROD_NAME: "Pet Dental Kit",
                PURCH_ORDER_PROD_DESCRIPTION: "Complete dental care kit for dogs and cats.",
                PURCH_ORDER_QTY: 30,
                PURCH_ORDER_PRICE: 25.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            },
            {
                PURCH_ORDER_DET_ID: 3,
                PURCH_ORDER_PROD_ID: 6,
                PURCH_ORDER_PROD_NAME: "Feline Dry Food",
                PURCH_ORDER_PROD_DESCRIPTION: "High-quality dry food for adult cats.",
                PURCH_ORDER_QTY: 25,
                PURCH_ORDER_PRICE: 10.00,
                PURCH_ORDER_LINE_TOTAL: 250.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 4,
        PURCHASE_ORDER_DATE: "2024-04-25",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 90,
        PURCHASE_ORDER_TOTAL: 2700.00,
        SUPPLIER_ID: 103,
        USER_ID: 203,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 7,
                PURCH_ORDER_PROD_NAME: "Dog Training Treats",
                PURCH_ORDER_PROD_DESCRIPTION: "Tasty treats for positive reinforcement in dog training.",
                PURCH_ORDER_QTY: 40,
                PURCH_ORDER_PRICE: 15.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 8,
                PURCH_ORDER_PROD_NAME: "Cat Litter",
                PURCH_ORDER_PROD_DESCRIPTION: "High-absorbency litter for cats.",
                PURCH_ORDER_QTY: 50,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 1500.00
            },
            {
                PURCH_ORDER_DET_ID: 3,
                PURCH_ORDER_PROD_ID: 9,
                PURCH_ORDER_PROD_NAME: "Veterinary First Aid Kit",
                PURCH_ORDER_PROD_DESCRIPTION: "Complete first aid kit for pets.",
                PURCH_ORDER_QTY: 10,
                PURCH_ORDER_PRICE: 600.00,
                PURCH_ORDER_LINE_TOTAL: 6000.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 5,
        PURCHASE_ORDER_DATE: "2024-06-28",
        PURCHASE_ORDER_STATUS: "Cancelled",
        PURCHASE_ORDER_TOT_QTY: 25,
        PURCHASE_ORDER_TOTAL: 750.00,
        SUPPLIER_ID: 104,
        USER_ID: 204,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 10,
                PURCH_ORDER_PROD_NAME: "Small Animal Vitamins",
                PURCH_ORDER_PROD_DESCRIPTION: "Essential vitamins for small animals like rabbits and guinea pigs.",
                PURCH_ORDER_QTY: 15,
                PURCH_ORDER_PRICE: 20.00,
                PURCH_ORDER_LINE_TOTAL: 300.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 11,
                PURCH_ORDER_PROD_NAME: "Dog Shampoo",
                PURCH_ORDER_PROD_DESCRIPTION: "Gentle shampoo for dogs, hypoallergenic.",
                PURCH_ORDER_QTY: 10,
                PURCH_ORDER_PRICE: 45.00,
                PURCH_ORDER_LINE_TOTAL: 450.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 6,
        PURCHASE_ORDER_DATE: "2024-07-05",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 40,
        PURCHASE_ORDER_TOTAL: 1200.00,
        SUPPLIER_ID: 105,
        USER_ID: 205,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 12,
                PURCH_ORDER_PROD_NAME: "Dog Leash",
                PURCH_ORDER_PROD_DESCRIPTION: "Durable and adjustable leash for dogs.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 13,
                PURCH_ORDER_PROD_NAME: "Pet Bed",
                PURCH_ORDER_PROD_DESCRIPTION: "Comfortable bed for small to medium pets.",
                PURCH_ORDER_QTY: 10,
                PURCH_ORDER_PRICE: 60.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 7,
        PURCHASE_ORDER_DATE: "2024-07-20",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 30,
        PURCHASE_ORDER_TOTAL: 900.00,
        SUPPLIER_ID: 106,
        USER_ID: 206,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 14,
                PURCH_ORDER_PROD_NAME: "Cat Tree",
                PURCH_ORDER_PROD_DESCRIPTION: "Multi-level cat tree for climbing and scratching.",
                PURCH_ORDER_QTY: 5,
                PURCH_ORDER_PRICE: 150.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 15,
                PURCH_ORDER_PROD_NAME: "Bird Cage",
                PURCH_ORDER_PROD_DESCRIPTION: "Spacious cage for small birds.",
                PURCH_ORDER_QTY: 3,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 150.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 8,
        PURCHASE_ORDER_DATE: "2024-08-10",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 100,
        PURCHASE_ORDER_TOTAL: 3000.00,
        SUPPLIER_ID: 107,
        USER_ID: 207,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 16,
                PURCH_ORDER_PROD_NAME: "Dog Food",
                PURCH_ORDER_PROD_DESCRIPTION: "Premium dog food with real meat.",
                PURCH_ORDER_QTY: 50,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 1500.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 17,
                PURCH_ORDER_PROD_NAME: "Cat Food",
                PURCH_ORDER_PROD_DESCRIPTION: "High-protein food for cats.",
                PURCH_ORDER_QTY: 50,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 1500.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 9,
        PURCHASE_ORDER_DATE: "2024-09-15",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 25,
        PURCHASE_ORDER_TOTAL: 750.00,
        SUPPLIER_ID: 108,
        USER_ID: 208,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 18,
                PURCH_ORDER_PROD_NAME: "Pet Carrier Backpack",
                PURCH_ORDER_PROD_DESCRIPTION: "Comfortable carrier backpack for small pets.",
                PURCH_ORDER_QTY: 5,
                PURCH_ORDER_PRICE: 150.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 10,
        PURCHASE_ORDER_DATE: "2024-09-20",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 45,
        PURCHASE_ORDER_TOTAL: 1350.00,
        SUPPLIER_ID: 109,
        USER_ID: 209,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 19,
                PURCH_ORDER_PROD_NAME: "Pet Grooming Kit",
                PURCH_ORDER_PROD_DESCRIPTION: "Complete grooming kit for pets.",
                PURCH_ORDER_QTY: 15,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 450.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 20,
                PURCH_ORDER_PROD_NAME: "Small Animal Habitat",
                PURCH_ORDER_PROD_DESCRIPTION: "Safe habitat for small animals.",
                PURCH_ORDER_QTY: 30,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 900.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 11,
        PURCHASE_ORDER_DATE: "2024-10-01",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 80,
        PURCHASE_ORDER_TOTAL: 2400.00,
        SUPPLIER_ID: 110,
        USER_ID: 210,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 21,
                PURCH_ORDER_PROD_NAME: "Fish Food",
                PURCH_ORDER_PROD_DESCRIPTION: "Specially formulated food for aquarium fish.",
                PURCH_ORDER_QTY: 40,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 1200.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 22,
                PURCH_ORDER_PROD_NAME: "Aquarium Filter",
                PURCH_ORDER_PROD_DESCRIPTION: "High-efficiency filter for aquariums.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 60.00,
                PURCH_ORDER_LINE_TOTAL: 1200.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 12,
        PURCHASE_ORDER_DATE: "2024-10-05",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 30,
        PURCHASE_ORDER_TOTAL: 900.00,
        SUPPLIER_ID: 111,
        USER_ID: 211,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 23,
                PURCH_ORDER_PROD_NAME: "Reptile Food",
                PURCH_ORDER_PROD_DESCRIPTION: "Nutritional food for reptiles.",
                PURCH_ORDER_QTY: 15,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 450.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 24,
                PURCH_ORDER_PROD_NAME: "Reptile Habitat",
                PURCH_ORDER_PROD_DESCRIPTION: "Safe habitat for reptiles.",
                PURCH_ORDER_QTY: 5,
                PURCH_ORDER_PRICE: 90.00,
                PURCH_ORDER_LINE_TOTAL: 450.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 13,
        PURCHASE_ORDER_DATE: "2024-10-10",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 20,
        PURCHASE_ORDER_TOTAL: 600.00,
        SUPPLIER_ID: 112,
        USER_ID: 212,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 25,
                PURCH_ORDER_PROD_NAME: "Dog Boots",
                PURCH_ORDER_PROD_DESCRIPTION: "Protective boots for dogs.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 14,
        PURCHASE_ORDER_DATE: "2024-10-12",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 35,
        PURCHASE_ORDER_TOTAL: 1050.00,
        SUPPLIER_ID: 113,
        USER_ID: 213,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 26,
                PURCH_ORDER_PROD_NAME: "Pet Seat Cover",
                PURCH_ORDER_PROD_DESCRIPTION: "Waterproof cover for car seats.",
                PURCH_ORDER_QTY: 15,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 27,
                PURCH_ORDER_PROD_NAME: "Dog Raincoat",
                PURCH_ORDER_PROD_DESCRIPTION: "Waterproof raincoat for dogs.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 15.00,
                PURCH_ORDER_LINE_TOTAL: 300.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 15,
        PURCHASE_ORDER_DATE: "2024-10-15",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 60,
        PURCHASE_ORDER_TOTAL: 1800.00,
        SUPPLIER_ID: 114,
        USER_ID: 214,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 28,
                PURCH_ORDER_PROD_NAME: "Cat Collar",
                PURCH_ORDER_PROD_DESCRIPTION: "Adjustable collar for cats.",
                PURCH_ORDER_QTY: 30,
                PURCH_ORDER_PRICE: 10.00,
                PURCH_ORDER_LINE_TOTAL: 300.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 29,
                PURCH_ORDER_PROD_NAME: "Dog Tag",
                PURCH_ORDER_PROD_DESCRIPTION: "Personalized ID tag for dogs.",
                PURCH_ORDER_QTY: 30,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 1500.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 16,
        PURCHASE_ORDER_DATE: "2024-10-20",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 50,
        PURCHASE_ORDER_TOTAL: 1500.00,
        SUPPLIER_ID: 115,
        USER_ID: 215,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 30,
                PURCH_ORDER_PROD_NAME: "Fish Tank Decor",
                PURCH_ORDER_PROD_DESCRIPTION: "Decorative items for fish tanks.",
                PURCH_ORDER_QTY: 25,
                PURCH_ORDER_PRICE: 20.00,
                PURCH_ORDER_LINE_TOTAL: 500.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 31,
                PURCH_ORDER_PROD_NAME: "Aquarium Heater",
                PURCH_ORDER_PROD_DESCRIPTION: "Heater for maintaining water temperature in aquariums.",
                PURCH_ORDER_QTY: 10,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 500.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 17,
        PURCHASE_ORDER_DATE: "2024-10-25",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 70,
        PURCHASE_ORDER_TOTAL: 2100.00,
        SUPPLIER_ID: 116,
        USER_ID: 216,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 32,
                PURCH_ORDER_PROD_NAME: "Dog Collar",
                PURCH_ORDER_PROD_DESCRIPTION: "Stylish and durable collar for dogs.",
                PURCH_ORDER_QTY: 35,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 1050.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 33,
                PURCH_ORDER_PROD_NAME: "Cat Leash",
                PURCH_ORDER_PROD_DESCRIPTION: "Lightweight leash for cats.",
                PURCH_ORDER_QTY: 35,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 1050.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 18,
        PURCHASE_ORDER_DATE: "2024-10-30",
        PURCHASE_ORDER_STATUS: "Pending",
        PURCHASE_ORDER_TOT_QTY: 80,
        PURCHASE_ORDER_TOTAL: 2400.00,
        SUPPLIER_ID: 117,
        USER_ID: 217,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 34,
                PURCH_ORDER_PROD_NAME: "Dog Crate",
                PURCH_ORDER_PROD_DESCRIPTION: "Durable crate for dog training.",
                PURCH_ORDER_QTY: 10,
                PURCH_ORDER_PRICE: 300.00,
                PURCH_ORDER_LINE_TOTAL: 3000.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 35,
                PURCH_ORDER_PROD_NAME: "Cat Carrier",
                PURCH_ORDER_PROD_DESCRIPTION: "Portable carrier for cats.",
                PURCH_ORDER_QTY: 15,
                PURCH_ORDER_PRICE: 100.00,
                PURCH_ORDER_LINE_TOTAL: 1500.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 19,
        PURCHASE_ORDER_DATE: "2024-11-05",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 40,
        PURCHASE_ORDER_TOTAL: 1200.00,
        SUPPLIER_ID: 118,
        USER_ID: 218,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 36,
                PURCH_ORDER_PROD_NAME: "Pet Shampoo",
                PURCH_ORDER_PROD_DESCRIPTION: "Gentle shampoo for all pets.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 37,
                PURCH_ORDER_PROD_NAME: "Pet Brush",
                PURCH_ORDER_PROD_DESCRIPTION: "Brush for grooming pets.",
                PURCH_ORDER_QTY: 10,
                PURCH_ORDER_PRICE: 60.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            }
        ]
    },
    {
        PURCHASE_ORDER_ID: 20,
        PURCHASE_ORDER_DATE: "2024-11-10",
        PURCHASE_ORDER_STATUS: "Completed",
        PURCHASE_ORDER_TOT_QTY: 50,
        PURCHASE_ORDER_TOTAL: 1500.00,
        SUPPLIER_ID: 119,
        USER_ID: 219,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 38,
                PURCH_ORDER_PROD_NAME: "Dog Harness",
                PURCH_ORDER_PROD_DESCRIPTION: "Comfortable harness for dogs.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 1000.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 39,
                PURCH_ORDER_PROD_NAME: "Cat Scratching Post",
                PURCH_ORDER_PROD_DESCRIPTION: "Durable scratching post for cats.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 25.00,
                PURCH_ORDER_LINE_TOTAL: 500.00
            }
        ]
    },
];

export default PURCHASE_ORDERS;
