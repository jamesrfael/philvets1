import React, { useState } from "react";
import styled from "styled-components";
import LayoutHS from "../../components/LayoutHS";
import SupplierDetailsModal from "../../components/AdminSuppliers/SupplierDetailsModal";
import { colors } from "../../colors";

const sampleSuppliers = [
  {
    supplierName: "Pet Care",
    supplierNumber: "09123456789",
    contactPersonName: "Gloria Madrigal",
    contactPersonNumber: "0912346679",
  },
  {
    supplierName: "Animal World",
    supplierNumber: "09234567890",
    contactPersonName: "John Doe",
    contactPersonNumber: "0923456789",
  },
  {
    supplierName: "Vet Supplies",
    supplierNumber: "09345678901",
    contactPersonName: "Jane Smith",
    contactPersonNumber: "0934567890",
  },
  {
    supplierName: "Pet Foods Inc.",
    supplierNumber: "09456789012",
    contactPersonName: "Alice Johnson",
    contactPersonNumber: "0945678901",
  },
  {
    supplierName: "Pet Accessories",
    supplierNumber: "09567890123",
    contactPersonName: "Bob Williams",
    contactPersonNumber: "0956789012",
  },
];

const AdminSuppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSuppliers, setFilteredSuppliers] = useState(sampleSuppliers);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchTerm(value);
    const filtered = sampleSuppliers.filter((supplier) => {
      if (!value) {
        return true;
      }
      return supplier.supplierName.toLowerCase().includes(value);
    });
    setFilteredSuppliers(filtered);
  };

  const openModal = (supplier) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedSupplier(null);
    setShowModal(false);
  };

  return (
    <LayoutHS>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <AddButton>Add Supplier</AddButton>
      </SearchContainer>
      <SuppliersContainer>
        {filteredSuppliers.map((supplier, index) => (
          <SupplierCard key={index}>
            <SupplierName>{supplier.supplierName}</SupplierName>
            <SupplierNumber>{supplier.supplierNumber}</SupplierNumber>
            <ContactPerson>{supplier.contactPersonName}</ContactPerson>
            <ContactPersonNumber>
              {supplier.contactPersonNumber}
            </ContactPersonNumber>
            <ViewButton onClick={() => openModal(supplier)}>View</ViewButton>
          </SupplierCard>
        ))}
      </SuppliersContainer>
      {showModal && (
        <SupplierDetailsModal supplier={selectedSupplier} onClose={closeModal} />
      )}
    </LayoutHS>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
`;

const AddButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const SuppliersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin: 0;
  padding: 1rem;
  justify-items: center;
`;

const SupplierCard = styled.div`
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 1rem;
  width: 200px;
  background-color: #fff;
  text-align: center;
`;

const SupplierName = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
`;

const SupplierNumber = styled.p`
  font-size: 0.875rem;
  margin-bottom: 8px;
`;

const ViewButton = styled.button`
  margin-bottom: 8px;
  padding: 0.5rem 1rem;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primaryHover};
  }
`;

const ContactPerson = styled.p`
  font-weight: bold;
  font-size: 0.875rem;
`;

const ContactPersonNumber = styled.p`
  font-size: 0.875rem;
`;

export default AdminSuppliers;
