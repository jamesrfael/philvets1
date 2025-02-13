import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa"; // Import search icon

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <SearchContainer>
      <FaSearch className="search-icon" />
      <SearchInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 16px;
  width: 100%;
  max-width: 250px; /* Adjust as needed */

  .search-icon {
    position: absolute;
    left: 10px;
    color: #878b8c;
    font-size: 14px;
  }
`;

const SearchInput = styled.input`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1.6px solid #878b8c;
  padding: 0.5rem 0.5rem 0.5rem 30px; /* Left padding to avoid overlapping icon */
  border-radius: 0.25rem;
  width: 100%;
  margin-right: 16px;
  font-size: 15px;
`;

export default SearchBar;
