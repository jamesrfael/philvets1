import React, { useState } from "react";
import LayoutHS from "../../components/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import productData from "../data/ProductData";
import SearchBar from "../../components/SearchBar"; // Import the SearchBar component

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = productData.products.filter((product) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const productDetail = productData.productDetails.find(
      (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
    );
    const category = productData.productCategories.find(
      (cat) => cat.PROD_CAT_CODE === product.PROD_CAT_CODE
    )?.PROD_CAT_NAME;

    return (
      product.PROD_NAME.toLowerCase().includes(lowerCaseSearchTerm) ||
      category?.toLowerCase().includes(lowerCaseSearchTerm) ||
      productDetail?.PROD_DETAILS_SIZE?.toLowerCase().includes(
        lowerCaseSearchTerm
      ) ||
      productDetail?.PROD_DETAILS_BRAND?.toLowerCase().includes(
        lowerCaseSearchTerm
      ) ||
      productDetail?.PROD_DETALS_PRICE?.toString()
        .toLowerCase()
        .includes(lowerCaseSearchTerm)
    );
  });

  return (
    <LayoutHS>
      <Controls>
        <SearchBar
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonGroup>
          <Button>Add Category</Button>
          <Button>Add Product</Button>
        </ButtonGroup>
      </Controls>
      <Table>
        <thead>
          <tr>
            <TableHeader>Product</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Unit</TableHeader>
            <TableHeader>Brand</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>Action</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => {
            const productDetail = productData.productDetails.find(
              (detail) => detail.PROD_DETAILS_CODE === product.PROD_DETAILS_CODE
            );
            const category = productData.productCategories.find(
              (cat) => cat.PROD_CAT_CODE === product.PROD_CAT_CODE
            )?.PROD_CAT_NAME;

            return (
              <TableRow key={index}>
                <TableCell>{product.PROD_NAME}</TableCell>
                <TableCell>{category}</TableCell>
                <TableCell>{productDetail?.PROD_DETAILS_SIZE}</TableCell>
                <TableCell>{productDetail?.PROD_DETAILS_BRAND}</TableCell>
                <TableCell>₱{productDetail?.PROD_DETALS_PRICE}</TableCell>
                <TableCell>
                  <ActionButton>View</ActionButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
    </LayoutHS>
  );
};

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 16px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 19px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  padding: 0 16px;
  text-align: center;
`;

const TableHeader = styled.th`
  color: white;
  border-bottom: 2px solid #ddd;
  padding: 12px;
  text-align: center;
  font-size: 16px;
  background-color: ${colors.primary};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 12px;
  font-size: 16px;
  text-align: center;
`;

const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

export default AdminProducts;
