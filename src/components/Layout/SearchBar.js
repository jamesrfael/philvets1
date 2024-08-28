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
  width: 250px;
`;

export default SearchBar;