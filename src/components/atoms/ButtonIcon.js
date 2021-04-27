import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonIconStyled = styled.button`
  position: relative;
  display: block;
  width: 67px;
  height: 67px;
  color: black;
  border: none;
  border-radius: 20px;
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;

  &.active {
    background-color: white;
    box-shadow: inset 2px 2px 4px rgb(209, 217, 230),
      inset -2px -2px 4px rgb(249, 249, 249);
  }

  &.buttonShadow {
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
  }
`;

const WrapperFontAwesomeIcon = styled.div`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
`;

function ButtonIcon(props) {
  const { icon, flip } = props;

  return (
    <ButtonIconStyled {...props}>
      <WrapperFontAwesomeIcon>
        <FontAwesomeIcon icon={icon} size="2x" flip={flip} />
      </WrapperFontAwesomeIcon>
    </ButtonIconStyled>
  );
}
ButtonIcon.propTypes = {
  icon: PropTypes.shape({
    prefix: PropTypes.string,
    iconName: PropTypes.string,
  }).isRequired,
  flip: PropTypes.oneOf(['horizontal', 'vertical', 'both']),
};
ButtonIcon.defaultProps = {
  flip: null,
};

export default ButtonIcon;
