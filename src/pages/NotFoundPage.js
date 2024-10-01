import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import sadDog from "../assets/sad.gif"; // Make sure the path is correct

const NotFoundPage = () => {
  return (
    <Container>
      <Content>
        <Title>404</Title>
        <Subtitle>Oops! Page Not Found</Subtitle>
        <Description>The page you are looking for does not exist.</Description>
        <HomeLink to="/staff/dashboard">Go to Home</HomeLink>
      </Content>
      <SadDogContainer>
        <SadDogImage src={sadDog} alt="Sad dog" />
      </SadDogContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  position: relative; /* Added to position the dog image */
`;

const Content = styled.div`
  text-align: center;
  padding: 2rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  background: white;
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #dc3545;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #6c757d;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #495057;
  margin: 1rem 0;
`;

const HomeLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #007bff;
  text-decoration: none;
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const SadDogContainer = styled.div`
  position: absolute; /* Positioning the container absolutely */
  bottom: 0; /* Align to the bottom */
  right: 0; /* Align to the right */
  overflow: hidden; /* Hide overflow */
  width: 230px; /* Set the width as needed */
  height: 128px; /* Set height to show only half the image */
  mix-blend-mode: multiply; /* Blend mode for the container */
`;

const SadDogImage = styled.img`
  position: relative; /* Relative positioning inside the container */
  bottom: 0; /* Align image to the bottom of the container */
  right: 0; /* Align image to the right of the container */
  width: 300px; /* Image width to display full */
  opacity: 0.8; /* Set opacity to blend with background */
  pointer-events: none; /* Prevent mouse events on the image */
  mix-blend-mode: multiply; /* Blend mode for the image */
`;


export default NotFoundPage;
