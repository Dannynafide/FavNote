import styled, { css } from 'styled-components';

const Button = styled.button`
  width: 220px;
  height: 47px;
  padding: 0 10px;
  margin: 20px 10px;
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  border: none;
  border-radius: 25px;
  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  color: black;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: -3px -3px 8px rgba(255, 255, 255, 0.5),
    5px 5px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: -3px -3px 4px rgba(255, 255, 255, 0.45),
      3px 3px 4px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.1s;
  }

  &:active {
    box-shadow: -1px -1px 1px 0 rgba(255, 255, 255, 0.2),
      1px 1px 1px 0 rgba(0, 0, 0, 0.2);
  }

  ${({ secondary }) =>
    secondary &&
    css`
      width: 100px;
      height: 30px;
      background-color: hsl(0, 0%, 90%);
      font-size: 10px;
    `}

  ${({ link }) =>
    link &&
    css`
      border: solid 4px ${({ activecolor, theme }) => theme[activecolor]};
      border-radius: 100%;
      background-color: hsl(0, 0%, 90%);
      font-size: 12px;
    `}
`;

export default Button;
