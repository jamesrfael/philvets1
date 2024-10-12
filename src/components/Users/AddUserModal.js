import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../colors";
import { IoCloseCircle } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../Layout/Button";

const AddUserModal = ({ onClose, onSave }) => {
  const [firstname, setFirstname] = useState("");
  const [midinitial, setMidinitial] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("staff_"); // Initialize with 'staff_'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [acctype, setAcctype] = useState("Staff"); // Default to 'Staff'
  const [image, setImage] = useState(null);

  const modalRef = useRef();

  useEffect(() => {
    // Close modal on clicking outside
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  // Update username dynamically based on the first name, last name, and account type
  useEffect(() => {
    if (firstname && lastname && acctype) {
      const generatedUsername =
        `${acctype.toLowerCase()}_${firstname.toLowerCase()}${lastname.toLowerCase()}`.replace(
          /\s/g,
          ""
        );
      setUsername(generatedUsername);
    } else if (acctype) {
      // If only acctype is set, start with acctype_
      setUsername(`${acctype.toLowerCase()}_`);
    }
  }, [firstname, lastname, acctype]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("user_username", username);
    formData.append("user_firstname", firstname);
    formData.append("user_midinitial", midinitial);
    formData.append("user_lastname", lastname);
    formData.append("user_email", email);
    formData.append("user_password", password);
    formData.append("user_phone_number", phoneNumber);
    formData.append("user_address", address);
    formData.append("user_acctype", acctype);
    if (image) {
      formData.append("user_image", image);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/staff/create/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onSave(result); // Pass newly added staff data
        onClose();
      } else {
        const result = await response.json();
        alert(`Error: ${result.detail || "An error occurred"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine if it's a superadmin or admin page
  const isSuperadminPage =
    window.location.pathname.includes("/superadmin/users");

  return (
    <ModalOverlay>
      <ModalContent ref={modalRef}>
        <ModalHeader>
          <h2>Add User</h2>
          <CloseButton onClick={onClose}>
            <IoCloseCircle />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Field>
            <Label>Image</Label>
            <ImageContainer>
              {image && <img src={image} alt="User" />}
              <Input type="file" onChange={handleImageChange} />
            </ImageContainer>
          </Field>
          <Field>
            <Label>First Name</Label>
            <Input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Middle Initial</Label>
            <Input
              value={midinitial}
              onChange={(e) => setMidinitial(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Last Name</Label>
            <Input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              value={username}
              readOnly // Make it read-only since it's generated automatically
            />
          </Field>
          <Field>
            <Label>Password</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TogglePasswordButton onClick={togglePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </TogglePasswordButton>
            </PasswordWrapper>
          </Field>

          {/* Show account type dropdown only if on superadmin page */}
          {isSuperadminPage ? (
            <Field>
              <Label>Account Type</Label>
              <Select
                value={acctype}
                onChange={(e) => setAcctype(e.target.value)}
              >
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
              </Select>
            </Field>
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button variant="red" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Add User
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${colors.red};
`;

const ModalBody = styled.div``;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TogglePasswordButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;

  button:first-of-type {
    margin-right: 10px;
  }
`;

export default AddUserModal;
