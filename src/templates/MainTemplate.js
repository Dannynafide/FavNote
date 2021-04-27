import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ThemeContext } from 'context';
import GlobalStyle from 'theme/GlobalStyle';

const StyledWrapper = styled.div`
  position: relative;
  /* padding: 60px 150px 25px 70px; */
`;

class MainTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageType: 'notes',
    };
  }

  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);
  }

  setCurrentPage = (prevState = '') => {
    const pageTypes = ['twitters', 'articles', 'notes'];
    const {
      location: { pathname },
    } = this.props;

    const [currentPage] = pageTypes.filter((page) => pathname.includes(page));

    if (prevState.pageType !== currentPage) {
      this.setState({ pageType: currentPage });
    }
  };

  render() {
    const { children } = this.props;
    const { pageType } = this.state;

    return (
      <ThemeContext.Provider value={pageType}>
        <GlobalStyle />
        <StyledWrapper>{children}</StyledWrapper>
      </ThemeContext.Provider>
    );
  }
}
MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(MainTemplate);
