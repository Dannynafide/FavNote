import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

import withContext from 'hoc/withContext';
import { InputSearch } from 'components/atoms/Input';
import ButtonIcon from 'components/atoms/ButtonIcon';
import Heading from 'components/atoms/Heading';
import NewItemBar from 'components/organisms/NewItemBar';
import UserPageTemplate from './UserPageTemplate';

const StyledWrapper = styled.div`
  position: relative;
`;

const GridTemplateStyled = styled.section`
  display: grid;
  grid-gap: 45px;
  grid-template-columns: repeat(2, 1fr);
`;

const StyledPageHeader = styled.div`
  margin: 0px 0px 50px 0px;

  p {
    font-weight: 600;
  }
`;

const HeadingStyled = styled(Heading)`
  text-transform: capitalize;
  margin: 25px 0px 0px 0px;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledButtonIcon = styled(ButtonIcon)`
  position: fixed;
  bottom: 40px;
  right: 40px;
  background-color: ${({ activecolor, theme }) => theme[activecolor]};
  border-radius: 100%;
  z-index: 10000;
`;

class GridTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNewItemBarVisible: false,
    };
  }

  toggleNewItemBar = () => {
    this.setState((prevState) => ({
      isNewItemBarVisible: !prevState.isNewItemBarVisible,
    }));
  };

  render() {
    const { children, themeContext } = this.props;
    const { isNewItemBarVisible } = this.state;

    return (
      <UserPageTemplate>
        <StyledWrapper>
          <StyledPageHeader>
            <InputSearch placeholder="Search" search icon={faSearch} />
            <HeadingStyled>{themeContext}</HeadingStyled>
            <p>{children.length} notes</p>
          </StyledPageHeader>
          <GridTemplateStyled>{children}</GridTemplateStyled>

          <StyledButtonIcon
            onClick={this.toggleNewItemBar}
            icon={faPlus}
            activecolor={themeContext}
            className="buttonShadow"
          />
          <NewItemBar
            handleClose={this.toggleNewItemBar}
            isVisible={isNewItemBarVisible}
          />
        </StyledWrapper>
      </UserPageTemplate>
    );
  }
}
GridTemplate.propTypes = {
  themeContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

GridTemplate.defaultProps = {
  themeContext: 'notes',
};

export default withContext(GridTemplate);
