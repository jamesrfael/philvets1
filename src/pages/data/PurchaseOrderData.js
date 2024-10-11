const PURCHASE_ORDERS = [
    {
        PURCHASE_ORDER_ID: 1,
        PURCHASE_ORDER_DATE: "2024-09-15",
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
        PURCHASE_ORDER_DATE: "2024-09-20",
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
        PURCHASE_ORDER_ID: 3,
        PURCHASE_ORDER_DATE: "2024-09-25",
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
        PURCHASE_ORDER_ID: 4,
        PURCHASE_ORDER_DATE: "2024-09-28",
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
        PURCHASE_ORDER_ID: 5,
        PURCHASE_ORDER_DATE: "2024-10-01",
        PURCHASE_ORDER_STATUS: "In Progress",
        PURCHASE_ORDER_TOT_QTY: 60,
        PURCHASE_ORDER_TOTAL: 1800.00,
        SUPPLIER_ID: 105,
        USER_ID: 205,
        ORDER_DETAILS: [
            {
                PURCH_ORDER_DET_ID: 1,
                PURCH_ORDER_PROD_ID: 12,
                PURCH_ORDER_PROD_NAME: "Veterinary Antibiotics",
                PURCH_ORDER_PROD_DESCRIPTION: "Broad-spectrum antibiotics for various infections.",
                PURCH_ORDER_QTY: 20,
                PURCH_ORDER_PRICE: 30.00,
                PURCH_ORDER_LINE_TOTAL: 600.00
            },
            {
                PURCH_ORDER_DET_ID: 2,
                PURCH_ORDER_PROD_ID: 13,
                PURCH_ORDER_PROD_NAME: "Pet Carrier",
                PURCH_ORDER_PROD_DESCRIPTION: "Durable pet carrier for travel.",
                PURCH_ORDER_QTY: 15,
                PURCH_ORDER_PRICE: 50.00,
                PURCH_ORDER_LINE_TOTAL: 750.00
            },
            {
                PURCH_ORDER_DET_ID: 3,
                PURCH_ORDER_PROD_ID: 14,
                PURCH_ORDER_PROD_NAME: "Flea Collars",
                PURCH_ORDER_PROD_DESCRIPTION: "Long-lasting flea collars for dogs.",
                PURCH_ORDER_QTY: 25,
                PURCH_ORDER_PRICE: 10.00,
                PURCH_ORDER_LINE_TOTAL: 250.00
            }
        ]
    }
];

export default PURCHASE_ORDERS;
