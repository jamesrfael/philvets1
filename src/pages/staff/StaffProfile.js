import React, { useState } from "react";
import styled from "styled-components";
import MainLayout from "../../components/Layout/MainLayout";
import { colors } from "../../colors";
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import profilePic from "../../assets/profile.png";

const StaffProfile = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("StaffPassword");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("09123456789");
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

  const handleSaveChanges = () => {
    console.log("Changes saved!");
    setIsEditingName(false);
    setIsEditingEmail(false);
    setIsEditingPassword(false);
    setIsEditingContact(false);
    setSaveClicked(true);
  };

  return (
    <MainLayout>
      <ProfileContainer>
        <LeftPanel>
          <ProfileImageWrapper>
            <ProfileImage src={profileImage} alt="Staff Profile" />
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
            <StaffText>Staff</StaffText>
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
    </MainLayout>
  );
};

// Styled components
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const RightPanel = styled.div`
  flex: 2;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const EditProfilePicButton = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  text-align: center;
`;

const StaffText = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
`;

const NameText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0;
`;

const EmailText = styled.p`
  font-size: 14px;
  color: gray;
  margin: 5px 0;
`;

const ProfileField = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  background-color: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
`;

const FieldText = styled.p`
  font-size: 18px;
  margin-right: 10px;
  flex: 1;
  display: flex;
  align-items: center;
`;

const InputField = styled.input`
  padding: 8px;
  font-size: 18px;
  margin-right: 10px;
  border: ${({ showBorder }) => (showBorder ? "1px solid #ccc" : "none")};
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;
`;

const EditButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  margin-left: 10px;
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 16px;
    width: 16px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 20px;
  cursor: pointer;
  color: ${colors.primary};
`;

const SaveChangesButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export default StaffProfile;
