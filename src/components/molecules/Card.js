import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import withContext from 'hoc/withContext';
import { cardRemovedAsync } from 'features/rootSlice';
import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const StyledHiddenButton = styled(Button)`
  padding-left: 20px;
  width: 150px;
  height: 35px;
  font-size: 12px;
  border-radius: 25px;
  transition: visibility 0s, opacity 0.3s linear;
  background-color: ${({ activecolor, theme }) =>
    activecolor ? theme[activecolor] : theme.notes};

  visibility: hidden;
  opacity: 0;

  .nextButton {
    margin-left: 15px;
    width: 22px;
    height: 22px;
    border-radius: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.background};

    box-shadow: -3px -3px 8px rgba(255, 255, 255, 0.5),
      5px 5px 8px rgba(0, 0, 0, 0.15);
  }
`;

const StyledCard = styled.article`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: -6px -6px 20px rgba(255, 255, 255, 1),
    6px 6px 20px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: -3px -3px 8px rgba(255, 255, 255, 0.9),
      5px 5px 8px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s;
  }
  &:hover ${StyledHiddenButton} {
    visibility: visible;
    opacity: 1;
  }
`;

const StyledLabel = styled.div`
  position: relative;
  padding: ${({ activecolor }) =>
    activecolor === 'articles' ? '15px 80px 15px 25px' : '15px 25px 15px 25px'};
  background-color: ${({ activecolor, theme }) =>
    activecolor ? theme[activecolor] : theme.notes};
  text-decoration: none;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const DateInfo = styled.p`
  font-weight: ${({ theme }) => theme.semiBold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledLinkButton = styled(Button)`
  position: absolute;
  width: 60px;
  height: 60px;
  right: 15px;
  top: 10px;
`;

const StyledAvatar = styled.img`
  width: 86px;
  height: 86px;
  border: 5px solid ${({ theme }) => theme.twitters};
  background: ${({ theme }) => theme.background};
  border-radius: 100%;
  position: absolute;
  right: 25px;
  top: 10px;
  z-index: 1;
`;

const StyledContent = styled.div`
  position: relative;
  padding: 17px 30px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* flex child */
  flex-grow: 1;
`;

const StyledWrapperButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > * {
    &:first-child {
      margin-right: 5px;
    }
  }
`;

const Card = ({
  id,
  title,
  created,
  content,
  twitterName,
  articleUrl,
  themeContext,
}) => {
  const dispatch = useDispatch();

  const onRemoveCardClicked = () => {
    if (id) {
      dispatch(cardRemovedAsync({ themeContext, id }));
    }
  };

  return (
    <StyledCard>
      <StyledLabel activecolor={themeContext}>
        <Heading as="h2">{title}</Heading>
        <DateInfo>{created}</DateInfo>
        {themeContext === 'twitters' && (
          <StyledAvatar
            src={`https://unavatar.now.sh/twitter/${twitterName}`}
          />
        )}
        {themeContext === 'articles' && (
          <StyledLinkButton
            className="styledLinkButton"
            activecolor={themeContext}
            href={articleUrl}
            link
            as="a"
          >
            <FontAwesomeIcon icon={faLink} size="2x" flip="horizontal" />
          </StyledLinkButton>
        )}
      </StyledLabel>
      <StyledContent>
        <p>{content}</p>
        <StyledWrapperButton>
          <Button onClick={onRemoveCardClicked} secondary>
            Remove
          </Button>
          <StyledHiddenButton
            as={Link}
            to={`${themeContext}/details/${id}`}
            className="view-post-button"
            secondary="true"
            activecolor={themeContext}
          >
            Read more
            <FontAwesomeIcon
              className="nextButton"
              icon={faAngleRight}
              size="2x"
            />
          </StyledHiddenButton>
        </StyledWrapperButton>
      </StyledContent>
    </StyledCard>
  );
};

Card.propTypes = {
  themeContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  created: PropTypes.string,
};

Card.defaultProps = {
  themeContext: 'notes',
  twitterName: null,
  articleUrl: null,
  created: null,
};

export default withContext(Card);
