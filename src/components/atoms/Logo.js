import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes/index';

const Logo = (props) => (
  <StyledLogo to={routes.home} {...props}>
    <FirstSegment>Fav</FirstSegment>
    <SecondSegment>Note.</SecondSegment>
  </StyledLogo>
);

const StyledLogo = styled(NavLink)`
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
  font-weight: 800;
  color: black;
  text-decoration: none;
  font-size: 10px;
`;

const FirstSegment = styled.span`
  font-size: 2.5em;
  margin: 0;
  padding: 0;
  line-height: 0.6em;
`;

const SecondSegment = styled.span`
  font-size: 1.65em;
`;

export default Logo;
