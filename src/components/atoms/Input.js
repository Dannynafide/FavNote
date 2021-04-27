import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WrapperInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 220px;
  height: 40px;

  padding: 10px 15px 10px 15px;
  margin: 10px 0px;
  font-size: 13px;
  letter-spacing: 0.15px;
  border: none;
  outline: none;
  background-color: #ecf0f3;
  transition: 0.25s ease;
  border-radius: 8px;
  box-shadow: inset 2px 2px 4px rgb(209, 217, 230),
    inset -2px -2px 4px rgb(249, 249, 249);

  ::placeholder {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${({ theme }) => theme.grey300};
  }

  &:focus {
    box-shadow: inset 4px 4px 4px rgb(209, 217, 230),
      inset -4px -4px 4px rgb(249, 249, 249);
  }

  ${({ search }) =>
    search &&
    css`
      background-color: #f5f5f5;
      padding: 10px 15px 10px 40px;
      font-size: 12px;
      padding: 10px 20px 10px 40px;
      font-size: ${({ theme }) => theme.fontSize.xs};
    `}
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  position: absolute;
  left: 15px;
  color: rgb(139, 139, 139);
  font-size: 1.5rem;
`;

function InputSearch(props) {
  const { icon } = props;
  return (
    <WrapperInput>
      {icon && <FontAwesomeIconStyled icon={icon} />}
      <Input {...props} />
    </WrapperInput>
  );
}
InputSearch.propTypes = {
  icon: PropTypes.shape({
    prefix: PropTypes.string,
    iconName: PropTypes.string,
  }).isRequired,
};

export { Input, InputSearch };
