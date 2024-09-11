import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/roundlogo.png";
import loginbg from "../assets/loginbg.jpg";

const ForgotPassword = () => {
  return (
    <BackgroundContainer>
      <FormContainer>
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
        </LogoContainer>
        <Title>Forgot Your Password?</Title>
        <InstructionText>
          Enter your email address and we will send you instructions to reset your password.
        </InstructionText>
        <Input type="email" placeholder="Email Address" />
        <SubmitButton>Send Reset Link</SubmitButton>
        <Link to="/login">
          <BackToLoginLink>Return to Login</BackToLoginLink>
        </Link>
      </FormContainer>
    </BackgroundContainer>
  );
};

// Styled components for styling
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
  top: -60px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 140px;

  @media (min-width: 768px) {
    width: 150px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 70px 0 20px 0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const InstructionText = styled.p`
  font-size: 16px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 18px;
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

const SubmitButton = styled.button`
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

const BackToLoginLink = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: gray;
  text-align: center;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default ForgotPassword;
