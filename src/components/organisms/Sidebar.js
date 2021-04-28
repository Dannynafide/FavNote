import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faPencilAlt,
  faLightbulb,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import withContext from 'hoc/withContext';
import ButtonIcon from 'components/atoms/ButtonIcon';
import { routes } from 'routes/index';
import Logo from 'components/atoms/Logo';
import { signOutAsync } from 'features/auth/authSlice';

const WrapperSidebar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 150px;
  height: 100vh;
  align-items: center;
  background-color: ${({ activeColor, theme }) =>
    activeColor ? theme[activeColor] : theme.notes};
  left: 0;
  top: 0;
  box-shadow: 10px 10px 10px rgb(209, 217, 230),
    -10px -10px 10px rgb(249, 249, 249);
  overflow: hidden;

  ul {
    list-style-type: none;
  }
`;

const Sidebar = ({ themeContext }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <WrapperSidebar activeColor={themeContext}>
        <Logo />

        <nav>
          <ul>
            <li>
              <ButtonIcon as={NavLink} to={routes.notes} icon={faPencilAlt} />
            </li>
            <li>
              <ButtonIcon as={NavLink} to={routes.twitters} icon={faTwitter} />
            </li>
            <li>
              <ButtonIcon
                as={NavLink}
                to={routes.articles}
                icon={faLightbulb}
              />
            </li>
          </ul>
        </nav>

        <ButtonIcon
          icon={faSignOutAlt}
          flip="horizontal"
          onClick={() => dispatch(signOutAsync())}
        />
      </WrapperSidebar>
    </div>
  );
};
Sidebar.propTypes = {
  themeContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
};

Sidebar.defaultProps = {
  themeContext: 'notes',
};

export default withContext(Sidebar);
