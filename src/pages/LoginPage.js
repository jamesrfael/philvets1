import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/roundlogo.png";
import loginbg from "../assets/loginbg.jpg";

const LoginPage = () => {
  return (
    <BackgroundContainer>
      <FormContainer>
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
        </LogoContainer>
        <Title>Login to your account</Title>
        <Input type="text" placeholder="Username" />
        <Input type="password" placeholder="Password" />
        <ForgotPassword>Forgot password?</ForgotPassword>
        <Link to="/admin/dashboard">
          <LoginButton>Login</LoginButton>
        </Link>
      </FormContainer>
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: url(${loginbg}) no-repeat center center/cover;
  padding: 20px;
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(128, 206, 219, 0.8);
  padding: 30px;
  border-radius: 15px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    padding: 40px;
    max-width: 450px;
  }
`;

const LogoContainer = styled.div`
  position: absolute;
  top: -60px; /* Adjusted to accommodate the larger logo */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 140px; /* Increased size */

  @media (min-width: 768px) {
    width: 150px; /* Larger size on bigger screens */
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 70px 0 20px 0; /* Adjusted top margin to account for the larger logo */
  text-align: center;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #000;
  border-radius: 10px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007B83;
  }

  &::placeholder {
    color: #aaa;
  }
`;

const ForgotPassword = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
  text-align: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #EF893E;
  color: white;
  font-size: 18px;
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
