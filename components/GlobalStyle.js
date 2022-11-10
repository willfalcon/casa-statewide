import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html {
    box-sizing: border-box;
    font-size: 10px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    scroll-behavior: smooth;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: ${({ theme }) => theme.font.family};
    font-size: 1.6rem;
    margin: 0;
  }
  button  {
    font-family: ${({ theme }) => theme.font.family};
  }
  img {
    max-width: 100%;
    height: auto;
  }

  a {
    /* color: ${({ theme }) => theme.lightBlue}; */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  h2 {
    text-transform: uppercase;
    font-size: 4rem;
    margin-top: 0;
    margin-bottom: 1rem;
  }
  h2,
  h3 {
    color: ${({ theme }) => theme.blue};
  }
  
  p {
    margin-top: 0;
  }
  
  .read-more {
    color: ${({ theme }) => theme.lightBlue};
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.font.black};
    display: flex;
    align-items: center;
    svg {
      width: 40px;
      height: 40px;
    }
  }

  .text-center {
    text-align: center;
    p &,
    span & {
      margin-left: auto;
      margin-right: auto;
      display: inline-block;
    }
  }
  span.text-center {
    display: block;
    text-align: center;
  }

  .button,
  .button--red,
  .button--blue {
    background: none;
    padding: 1rem 2rem;
    border: 1px solid ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
    border-radius: 12px;
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.font.bold};
    
  }
  .button--red {
    background: ${({ theme }) => theme.red};
    color: white;
    border-color: ${({ theme }) => theme.red};
  }
  .button--blue {
    background: ${({ theme }) => theme.lightBlue};
    color: white;
    border-color: ${({ theme }) => theme.lightBlue};
  }

`;

export default GlobalStyle;
