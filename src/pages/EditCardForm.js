import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import PropTypes from 'prop-types';

import { cardUpdatedAsync } from 'features/root/rootSlice';

import Heading from 'components/atoms/Heading';
import { Input } from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import UserPageTemplate from 'templates/UserPageTemplate';

const StyledArticle = styled.article`
  padding: 20px 60px 20px 50px;
  max-width: 50vw;
  position: relative;

  @media (max-width: 1200px) {
    max-width: 80vw;
  }
`;

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const StyledInput = styled(Input)`
  width: 100%;
  margin-top: 15px;
`;
const StyledTextArea = styled(Input)`
  width: 100%;
  margin: 15px 0 50px;
  height: 100px;
`;

const EditCardForm = ({ match, themeContext }) => {
  const { id, page } = match.params;

  const card = useSelector((state) =>
    state.root[page].find((item) => String(item.id) === String(id))
  );

  if (!card) {
    return (
      <section>
        <h2>Page not found!</h2>
      </section>
    );
  }

  const [title, setTitle] = useState(card.title);
  const [content, setContent] = useState(card.content);
  const [twitterName, setTwitterName] = useState(card.twitterName);
  const [articleUrl, setArticleUrl] = useState(card.articleUrl);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onTwitterNameChanged = (e) => setTwitterName(e.target.value);
  const onArticleUrlChanged = (e) => setArticleUrl(e.target.value);

  const onSaveCardClicked = () => {
    if (title && content) {
      if (twitterName) {
        dispatch(cardUpdatedAsync({ page, id, title, content, twitterName }));
      } else if (articleUrl) {
        dispatch(cardUpdatedAsync({ page, id, title, content, articleUrl }));
      } else {
        dispatch(cardUpdatedAsync({ page, id, title, content }));
      }
      history.push(`/${page}/details/${id}`);
    }
  };

  return (
    <UserPageTemplate>
      <section className="newCard">
        <StyledArticle>
          <Heading big>Edit Card</Heading>
          <StyledForm>
            <StyledInput
              type="text"
              name="cardTitle"
              id="cardTitle"
              placeholder="title"
              onChange={onTitleChanged}
              value={title}
            />
            {themeContext === 'twitters' && (
              <StyledInput
                placeholder="twitter name eg. hello_roman"
                type="text"
                name="twitterName"
                onChange={onTwitterNameChanged}
                value={twitterName}
              />
            )}
            {themeContext === 'articles' && (
              <StyledInput
                placeholder="link"
                type="text"
                name="articleUrl"
                onChange={onArticleUrlChanged}
                value={articleUrl}
              />
            )}

            <StyledTextArea
              id="cardContent"
              name="cardContent"
              as="textarea"
              placeholder="Enter a content"
              onChange={onContentChanged}
              value={content}
            />
            <Button
              type="submit"
              activecolor={themeContext}
              onClick={onSaveCardClicked}
            >
              Save Post
            </Button>
          </StyledForm>
        </StyledArticle>
      </section>
    </UserPageTemplate>
  );
};

EditCardForm.propTypes = {
  themeContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string, page: PropTypes.string }),
  }).isRequired,
};

EditCardForm.defaultProps = {
  themeContext: 'notes',
};

export default withContext(EditCardForm);
