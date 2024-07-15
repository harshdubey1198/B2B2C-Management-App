// import { createGlobalStyle } from 'styled-components';

// export const GlobalStyles = createGlobalStyle`
//   body {
//     background-color: ${props => (props.theme === 'light' ? '#ffffff' : '#1a1a1a')};
//     color: ${props => (props.theme === 'light' ? '#333333' : '#cccccc')};
//     font-family: 'Arial', sans-serif;
//     transition: all 0.6s ease;
//   }
// `;

// export const theme = {
//   light: {
//     headingColor: '#333333',
//     paragraphColor: '#555555',
//     buttonColor: '#007bff',
//     buttonHoverColor: '#0056b3',
//   },
//   dark: {
//     headingColor: '#ffffff',
//     paragraphColor: '#cccccc',
//     buttonColor: '#007bff',
//     buttonHoverColor: '#0056b3',
//   },
// };
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.headingColor};
    margin: 0 ;
  }
  .nav-text{
  color: white;
  }
  p {
    color: ${({ theme }) => theme.paragraphColor};
  }
  nav{
  background: ${({ theme }) => theme.navbg};
  }
  button {
    background-color: ${({ theme }) => theme.buttonColor};
    color: ${({ theme }) => theme.buttonTextColor};
    &:hover {
      background-color: ${({ theme }) => theme.buttonHoverColor};
    }
  }
`;

export const lightTheme = {
  backgroundColor: '#f5f7fa',
  textColor: '#000000',
  headingColor: '#333333',
  paragraphColor: '#555555',
  buttonColor: '#007bff',
  buttonTextColor: '#ffffff',
  buttonHoverColor: '#0056b3',
  navbg:'#d0dbe7',
};

export const darkTheme = {
  backgroundColor: '#31455b',
  textColor: '#ffffff',
  navbg:'#24303f',
  headingColor: '#ffffff',
  paragraphColor: '#cccccc',
  buttonColor: '#007bff',
  buttonTextColor: '#ffffff',
  buttonHoverColor: '#0056b3',
};
