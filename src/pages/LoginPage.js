import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/roundlogo.png";
import loginbg from "../assets/loginbg.jpg"; // Assuming the background image is in this path

const LoginPage = () => {
  return (
    <BackgroundContainer>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
      </LogoContainer>
      <FormContainer>
        <Title>Login to your account</Title>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <ForgotPassword>Forgot password?</ForgotPassword>
        <Link to="/admin/dashboard">
          <LoginButton width="200px">Login</LoginButton>
        </Link>
      </FormContainer>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url(${loginbg}) no-repeat center center/cover;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  height: 50vh;
  width: 65%; /* Set the width to 60% */

  @media (min-width: 768px) {
    height: 100vh;
  }
`;

const Logo = styled.img`
  height: auto;
  width: 300px;

  @media (min-width: 768px) {
    width: auto;
    height: 300px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(128, 206, 219, 0.8);
  height: 50vh;
  width:35%; /* Set the width to 40% */
  padding: 32px;

  @media (min-width: 768px) {
    height: 100vh;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 24px;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  max-width: 400px;
  padding: 12px;
  margin-bottom: 16px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 16px;
  text-align: left; /* Left-align the text in the input field */

  &:focus {
    outline: none;
    border-color: #007B83;
  }

  &::placeholder {
    text-align: left; /* Left-align the placeholder text */
  }
`;

const ForgotPassword = styled.p`
  font-size: 12px;
  color: gray;
  margin-bottom: 24px;
  text-align: center;
`;

const LoginButton = styled.button`
  width: ${(props) => props.width || "auto"}; /* Default to auto width if width prop is not provided */
  padding: 12px;
  background-color: #EF893E;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #d77834;
  }
`;

export default LoginPage;
