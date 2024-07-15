import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.theme.buttonColor};
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.buttonHoverColor};
  }
`;

const Button = ({ children, ...rest }) => (
  <StyledButton {...rest}>
    {children}
  </StyledButton>
);

export default Button;
