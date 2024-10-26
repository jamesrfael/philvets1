// src/components/Category/CategoryDetailsModal.js

import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../Layout/Modal"; // Reusable Modal component
import { colors } from "../../../colors";
import SearchBar from "../../Layout/SearchBar"; // Reusable SearchBar component
import EditCategoryModal from "./EditCategoryModal"; // Import the new EditCategoryModal
import ProductDetailsModal from "../ProductDetailsModal"; // Import the ProductDetailsModal
import CategoryAddProduct from "./CategoryAddProduct"; // Import the new CategoryAddProduct component
import { FaPlus } from "react-icons/fa"; // Import the FaPlus icon
import Button from "../../Layout/Button"; // Import the Button component

const CategoryDetailsModal = ({ category = {}, products = [], onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState(category);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isAddProductMode, setIsAddProductMode] = useState(false); // State for Add Product modal
  const [filteredProducts, setFilteredProducts] = useState(
    products.filter(
      (product) => product.PROD_CAT_CODE === category.PROD_CAT_CODE
    )
  );

  // Function to handle saving category details
  const handleSaveCategory = (updatedCategory) => {
    setCategoryDetails(updatedCategory);
    setIsEditMode(false);
  };

  // Function to handle the "Details" button click
  const handleShowDetails = (productId) => {
    setSelectedProductId(productId);
  };

  // Function to handle adding a product to the category
  const handleAddProduct = (product) => {
    // Add product logic here, for gmail:
    console.log("Adding product to category:", product);
    setIsAddProductMode(false); // Close the Add Product modal
  };

  // Function to handle removing a product from the category
  const handleRemoveProduct = (productId) => {
    const updatedProducts = filteredProducts.filter(
      (product) => product.PROD_ID !== productId
    );
    setFilteredProducts(updatedProducts);
  };

  return (
    <Modal
      title={`Category: ${categoryDetails.PROD_CAT_NAME}`}
      onClose={onClose}
    >
      <SearchBarContainer>
        <SearchBar
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="primary"
          onClick={() => setIsAddProductMode(true)} // Open Add Product modal
          icon={<FaPlus />}
        >
          + Product
        </Button>
      </SearchBarContainer>

      <ProductTable>
        <thead>
          <tr>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Quantity on Hand</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.PROD_NAME || "N/A"}</TableCell>
                <TableCell>{product.PROD_QOH || 0}</TableCell>
                <TableCell className="action-cell">
                  <Button
                    variant="primary"
                    onClick={() => handleShowDetails(product.PROD_ID)}
                  >
                    Details
                  </Button>
                  <Button
                    backgroundColor={colors.red}
                    hoverColor={colors.redHover}
                    onClick={() => handleRemoveProduct(product.PROD_ID)}
                    style={{ marginLeft: "10px" }} // Add space between the buttons
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No products found.</TableCell>
            </TableRow>
          )}
        </tbody>
      </ProductTable>

      <ButtonGroup>
        <Button
          variant="primary"
          onClick={() => setIsEditMode(true)} // Open edit mode
        >
          Edit Category
        </Button>
      </ButtonGroup>

      {/* Show the EditCategoryModal when isEditMode is true */}
      {isEditMode && (
        <EditCategoryModal
          categoryDetails={categoryDetails}
          onSave={handleSaveCategory}
          onClose={() => setIsEditMode(false)}
        />
      )}

      {/* Show the CategoryAddProduct modal when isAddProductMode is true */}
      {isAddProductMode && (
        <CategoryAddProduct
          availableProducts={products} // Pass the list of available products
          onAddProduct={handleAddProduct} // Function to add the product
          onClose={() => setIsAddProductMode(false)} // Close the modal
        />
      )}

      {/* Show the ProductDetailsModal when a product ID is selected */}
      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </Modal>
  );
};

// Styled components
const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableHeader = styled.th`
  background-color: ${colors.primary};
  color: white;
  padding: 10px;
  text-align: center;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
`;

export default CategoryDetailsModal;
