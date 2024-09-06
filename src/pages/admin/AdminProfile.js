import React, { useState } from "react";
import LayoutHS from "../../components/Layout/LayoutHS";
import styled from "styled-components";
import { colors } from "../../colors";
import Button from "../../components/Layout/Button";

// Import the profile picture
import profilePic from "../../assets/profile.png";

// Styled components
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 2px solid ${colors.primary};
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileName = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const ProfileRole = styled.h2`
  font-size: 18px;
  color: ${colors.secondary};
  margin: 5px 0;
`;

const ProfileEmail = styled.p`
  font-size: 16px;
  margin: 5px 0;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: ${colors.background};
  cursor: pointer;
  border-bottom: 2px solid ${props => (props.active ? colors.primary : 'transparent')};
  transition: border-bottom 0.3s;

  &:hover {
    background-color: ${colors.hover};
  }
`;

const ContentSection = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: ${colors.backgroundLight};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.border};
  border-radius: 4px;
`;

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Profile data for the admin
  const profileData = {
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    profilePicture: profilePic // Use the imported image
  };

  return (
    <LayoutHS>
      <ProfileContainer>
        <ProfileHeader>
          <ProfilePicture src={profileData.profilePicture} alt="Admin Profile Picture" />
          <ProfileInfo>
            <ProfileName>{profileData.name}</ProfileName>
            <ProfileRole>{profileData.role}</ProfileRole>
            <ProfileEmail>{profileData.email}</ProfileEmail>
          </ProfileInfo>
        </ProfileHeader>

        <TabContainer>
          <TabButton active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>Overview</TabButton>
          <TabButton active={activeTab === "settings"} onClick={() => setActiveTab("settings")}>Account Settings</TabButton>
          <TabButton active={activeTab === "activity"} onClick={() => setActiveTab("activity")}>Activity Log</TabButton>
        </TabContainer>

        <ContentSection>
          {activeTab === "overview" && (
            <div>
              <h3>Overview</h3>
              <p>Welcome to your profile. Here you can view and update your personal information.</p>
              <FormGroup>
                <FormLabel>About Me</FormLabel>
                <FormTextarea rows="4" defaultValue="Admin user with extensive experience in system management and operations."></FormTextarea>
              </FormGroup>
              <Button>Update Profile</Button>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div>
              <h3>Account Settings</h3>
              <FormGroup>
                <FormLabel>Change Email</FormLabel>
                <FormInput type="email" defaultValue={profileData.email} />
              </FormGroup>
              <FormGroup>
                <FormLabel>Change Password</FormLabel>
                <FormInput type="password" placeholder="New password" />
              </FormGroup>
              <Button>Save Changes</Button>
            </div>
          )}
          
          {activeTab === "activity" && (
            <div>
              <h3>Activity Log</h3>
              <ul>
                <li><strong>2024-09-05:</strong> Updated profile picture.</li>
                <li><strong>2024-09-04:</strong> Changed password.</li>
                <li><strong>2024-09-03:</strong> Edited profile details.</li>
              </ul>
            </div>
          )}
        </ContentSection>
      </ProfileContainer>
    </LayoutHS>
  );
};

export default AdminProfile;
