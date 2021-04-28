import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import SingleCardTemplate from 'templates/SingleCardTemplate';
import { fetchItems } from 'features/root/rootSlice';
import UserPageTemplate from 'templates/UserPageTemplate';

const SingleCardPage = ({ match }) => {
  const { id, page } = match.params;
  const dispatch = useDispatch();

  const card = useSelector((state) =>
    state.root[page].find((item) => String(item.id) === String(id))
  );

  if (!card) {
    dispatch(fetchItems({ itemType: page }));
  }

  if (!card) {
    return (
      <UserPageTemplate>
        <section>
          <h2>Page not found!</h2>
        </section>
      </UserPageTemplate>
    );
  }

  return (
    <UserPageTemplate>
      <SingleCardTemplate
        id={card.id}
        title={card.title}
        created={card.created}
        content={card.content}
        articleUrl={card.articleUrl}
        twitterName={card.twitterName}
      />
    </UserPageTemplate>
  );
};

SingleCardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string, page: PropTypes.string }),
  }).isRequired,
};

export default SingleCardPage;
