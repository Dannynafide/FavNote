import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import withContext from 'hoc/withContext';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';

const StyledArticle = styled.article`
  padding: 20px 60px 20px 50px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledCardContainer = styled.div`
  margin-bottom: 50px;
`;

const StyledPageHeader = styled.div`
  margin: 25px 0 50px 0;
`;

const StyledParagraph = styled.p`
  margin: 0;
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: black;
  text-transform: uppercase;
  margin: 20px 0 50px;
  color: ${({ theme }) => theme.articles};
`;

const StyledImage = styled.img`
  position: absolute;
  right: -60px;
  top: 10px;
  width: 120px;
  height: 120px;
  border-radius: 100%;
  border: 5px solid ${({ theme }) => theme.twitters};
  background: white;
`;

const StyledContent = styled.p`
  margin-bottom: 20px;
`;

function SingleCardTemplate({
  id,
  themeContext,
  title,
  created,
  content,
  articleUrl,
  twitterName,
}) {
  return (
    <section>
      <StyledArticle key={id}>
        <StyledCardContainer>
          <StyledPageHeader>
            <Heading big as="h1">
              {title}
            </Heading>
            <StyledParagraph className="card-created">
              {created}
            </StyledParagraph>
          </StyledPageHeader>
          <StyledContent className="card-content">{content}</StyledContent>
          {themeContext === 'articles' && (
            <StyledLink href={articleUrl}>Open article</StyledLink>
          )}
          {themeContext === 'twitters' && (
            <StyledImage
              alt={title}
              src={`https://unavatar.now.sh/twitter/${twitterName}`}
            />
          )}
          <Link to={`/${themeContext}/edit/${id}`} className="view-post-button">
            Edit Post
          </Link>
        </StyledCardContainer>
        <Button as={Link} to={`/${themeContext}`} activecolor={themeContext}>
          save / close
        </Button>
      </StyledArticle>
    </section>
  );
}

SingleCardTemplate.propTypes = {
  themeContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  created: PropTypes.string,
};

SingleCardTemplate.defaultProps = {
  themeContext: 'notes',
  twitterName: null,
  articleUrl: null,
  created: null,
};

export default withContext(SingleCardTemplate);
