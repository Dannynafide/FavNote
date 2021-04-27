import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading';
import { Input } from 'components/atoms/Input';
import Button from 'components/atoms/Button';
import { cardAddedAsync } from 'features/rootSlice';

const StyledWrapper = styled.div`
  border-left: 10px solid ${({ theme, activecolor }) => theme[activecolor]};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 90px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 680px;
  background-color: ${({ theme }) => theme.background};
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
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

const NewItemBar = ({ themeContext, isVisible, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [twitterName, setTwitterName] = useState('');
  const [articleUrl, setArticleUrl] = useState('');

  const dispatch = useDispatch();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onTwitterNameChanged = (e) => setTwitterName(e.target.value);
  const onArticleUrlChanged = (e) => setArticleUrl(e.target.value);

  const onSaveCardClicked = () => {
    if (title && content) {
      dispatch(
        cardAddedAsync({
          themeContext,
          title,
          content,
          twitterName,
          articleUrl,
        })
      );
      setTitle('');
      setContent('');
      setTwitterName('');
      handleClose();
    }
  };

  const canSave = Boolean(title) && Boolean(content);

  return (
    <section>
      <StyledWrapper isVisible={isVisible} activecolor={themeContext}>
        <Heading big>Create new {themeContext}</Heading>
        <StyledForm>
          <StyledInput
            type="text"
            name="postTitle"
            id="postTitle"
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
            disabled={!canSave}
          >
            Save Post
          </Button>
        </StyledForm>
      </StyledWrapper>
    </section>
  );
};
NewItemBar.propTypes = {
  themeContext: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  isVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

NewItemBar.defaultProps = {
  themeContext: 'notes',
};

export default withContext(NewItemBar);
