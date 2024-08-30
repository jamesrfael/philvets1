import styled from "styled-components";
import { colors } from "../../colors";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 95%;
  max-width: 900px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Field = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

export const DescriptionBox = styled.textarea`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1em;
`;

export const OrderDetailsSection = styled.div`
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${colors.primary};
    color: white;
  }
`;

export const AddProductButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
  margin-top: 10px;
  align-self: flex-start;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: red;
`;

export const TotalSection = styled.div`
  margin-top: 20px;
  text-align: right;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const TotalLabel = styled.span`
  font-weight: bold;
`;

export const TotalValue = styled.span`
  font-weight: bold;
`;

export const SaveButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${colors.fail};
`;

export const DiscountContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const DiscountInput = styled.input`
  padding: 8px 4px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 66px;
`;

export const DiscountSelect = styled.select`
  font-size: 15px;
  padding: 8px 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const QuantityInput = styled(Input)`
  width: 66px;
`;

export const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 150px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SuggestionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.primary};
    color: white;
  }
`;
