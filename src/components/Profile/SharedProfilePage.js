// SharedProfilePage.js
import React, { useState, useEffect } from "react";
import {
  ProfileContainer,
  LeftPanel,
  RightPanel,
  ProfileImageWrapper,
  ProfileImage,
  EditProfilePicButton,
  ProfileInfo,
  AdminText,
  NameText,
  EmailText,
  ProfileField,
  Label,
  FieldContainer,
  InputField,
  FieldText,
  EditButton,
  SaveChangesButton,
  InputContainer,
  EyeIcon,
} from "./ProfileStyles"; // Update import path as necessary
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import profilePic from "../../assets/profile.png";

const SharedProfilePage = ({ userRole }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const userData = {
    SuperAdmin: {
      name: "Maria Santos",
      email: "maria.santos@example.com",
      password: "MariaAdminPassword",
      contact: "09123456789",
    },
    Admin: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "JohnAdminPassword",
      contact: "09123456788",
    },
    Staff: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "JaneStaffPassword",
      contact: "09123456787",
    },
  };

  const [name, setName] = useState(userData[userRole].name);
  const [email, setEmail] = useState(userData[userRole].email);
  const [password, setPassword] = useState(userData[userRole].password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState(userData[userRole].contact);
  const [profileImage, setProfileImage] = useState(profilePic);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);
  const [saveClicked, setSaveClicked] = useState(false);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      setHasChanges(true);
    }
  };

  useEffect(() => {
    if (
      isEditingName ||
      isEditingEmail ||
      isEditingPassword ||
      isEditingContact
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [
    isEditingName,
    isEditingEmail,
    isEditingPassword,
    isEditingContact,
    name,
    email,
    password,
    confirmPassword,
    contact,
  ]);

  const handleSaveChanges = () => {
    console.log("Changes saved!");
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
    setIsEditingContact(false);
    setSaveClicked(true);
    setHasChanges(false);
  };

  return (
    <ProfileContainer>
      <LeftPanel>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="Profile" />
          <EditProfilePicButton htmlFor="upload-photo">
            <FaPencilAlt />
          </EditProfilePicButton>
          <input
            type="file"
            id="upload-photo"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </ProfileImageWrapper>

        <ProfileInfo>
          <AdminText>{userRole}</AdminText>
          <NameText>{name}</NameText>
          <EmailText>{email}</EmailText>
        </ProfileInfo>
      </LeftPanel>

      <RightPanel>
        <ProfileField>
          <Label>Name</Label>
          <FieldContainer>
            {isEditingName ? (
              <InputField
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                showBorder={isEditingName}
              />
            ) : (
              <FieldText>{name}</FieldText>
            )}
            <EditButton onClick={() => setIsEditingName(!isEditingName)}>
              <FaPencilAlt />
            </EditButton>
          </FieldContainer>
        </ProfileField>

        <ProfileField>
          <Label>Email</Label>
          <FieldContainer>
            {isEditingEmail ? (
              <InputField
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                showBorder={isEditingEmail}
              />
            ) : (
              <FieldText>{email}</FieldText>
            )}
            <EditButton onClick={() => setIsEditingEmail(!isEditingEmail)}>
              <FaPencilAlt />
            </EditButton>
          </FieldContainer>
        </ProfileField>

        <ProfileField>
          <Label>Contact</Label>
          <FieldContainer>
            {isEditingContact ? (
              <InputField
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                showBorder={isEditingContact}
              />
            ) : (
              <FieldText>{contact}</FieldText>
            )}
            <EditButton
              onClick={() => setIsEditingContact(!isEditingContact)}
            >
              <FaPencilAlt />
            </EditButton>
          </FieldContainer>
        </ProfileField>

        <ProfileField>
          <Label>Password</Label>
          {isEditingPassword ? (
            <InputContainer>
              <FieldContainer>
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  showBorder={isEditingPassword}
                />
                <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </EyeIcon>
              </FieldContainer>
              <FieldContainer>
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showBorder={isEditingPassword}
                />
                <EyeIcon
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </EyeIcon>
              </FieldContainer>
              <EditButton
                onClick={() => setIsEditingPassword(!isEditingPassword)}
              >
                <FaPencilAlt />
              </EditButton>
            </InputContainer>
          ) : (
            <FieldContainer>
              <FieldText>********</FieldText>
              <EditButton
                onClick={() => setIsEditingPassword(!isEditingPassword)}
              >
                <FaPencilAlt />
              </EditButton>
            </FieldContainer>
          )}
        </ProfileField>

        {hasChanges && !saveClicked && (
          <SaveChangesButton onClick={handleSaveChanges}>
            Save Changes
          </SaveChangesButton>
        )}
      </RightPanel>
    </ProfileContainer>
  );
};

export default SharedProfilePage;
