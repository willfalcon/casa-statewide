import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({ error }) => {
  console.log(error);
  if (error.type) {
    switch (error.type) {
      case 'required':
        return <StyledError>This field is required!</StyledError>;
      default:
        return <StyledError>Something went wrong here!</StyledError>;
      case 'inputTelRequired':
        return <StyledError>{error.message}</StyledError>;
    }
  }
  return <StyledError>{error}</StyledError>;
};

const StyledError = styled.p`
  color: red;
  grid-column: span 2;
`;

export default ErrorMessage;
