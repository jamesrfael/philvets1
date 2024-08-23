const productData = {
    products: [
      {
        PROD_ID: "P001",
        PROD_NAME: "Product 1",
        PROD_DETAILS_CODE: "D001",
        PROD_RO_LEVEL: 50,
        PROD_RO_QTY: 10,
        PROD_QOH: 200,
        PROD_IMG: "image1.png",
        PROD_DATECREATED: "2024-08-01",
        PROD_DATEUPDATED: "2024-08-20",
        PROD_CAT_CODE: "C001",
      },
      {
        PROD_ID: "P002",
        PROD_NAME: "Product 2",
        PROD_DETAILS_CODE: "D002",
        PROD_RO_LEVEL: 30,
        PROD_RO_QTY: 5,
        PROD_QOH: 100,
        PROD_IMG: "image2.png",
        PROD_DATECREATED: "2024-07-15",
        PROD_DATEUPDATED: "2024-08-18",
        PROD_CAT_CODE: "C002",
      },
      // Add more products as needed
    ],
  
    productDetails: [
      {
        PROD_DETAILS_CODE: "D001",
        PROD_DETAILS_DESCRIPTION: "Detailed description for Product 1",
        PROD_DETALS_PRICE: 19.99,
        PROD_DETAILS_BRAND: "Brand A",
        PROD_DETAILS_SIZE: "Medium",
        PROD_DETAILS_MEASUREMENT: "500ml",
        PROD_CAT_CODE: "C001",
      },
      {
        PROD_DETAILS_CODE: "D002",
        PROD_DETAILS_DESCRIPTION: "Detailed description for Product 2",
        PROD_DETALS_PRICE: 29.99,
        PROD_DETAILS_BRAND: "Brand B",
        PROD_DETAILS_SIZE: "Large",
        PROD_DETAILS_MEASUREMENT: "1L",
        PROD_CAT_CODE: "C002",
      },
      // Add more product details as needed
    ],
  
    productCategories: [
      {
        PROD_CAT_CODE: "C001",
        PROD_CAT_NAME: "Category 1",
        PROD_CAT_SUBCATEGORY: "Subcategory 1",
      },
      {
        PROD_CAT_CODE: "C002",
        PROD_CAT_NAME: "Category 2",
        PROD_CAT_SUBCATEGORY: "Subcategory 2",
      },
      // Add more categories as needed
    ],
  };
  
  export default productData;
  