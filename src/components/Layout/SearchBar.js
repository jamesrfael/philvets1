import React from "react";
import styled from "styled-components";

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <SearchInput
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

const SearchInput = styled.input`
  border: 1.6px solid #878b8c;
  padding: 0.5rem;
  border-radius: 0.25rem;
  min-width: 120px; /* Minimum width for the search bar */
  max-width: 250px; /* Maximum width for the search bar */
  width: 100%; /* Adjust width to fit the container */
  margin-right: 16px; /* Add gap to the right of the search bar */
`;

export default SearchBar;
