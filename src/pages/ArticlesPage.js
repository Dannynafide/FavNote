import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'components/molecules/Card';
import GridTemplate from 'templates/GridTemplate';
import { fetchItems } from 'features/root/rootSlice';

export default function Articles() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.root.articles);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchItems({ itemType: 'articles' }));
  }, [items, user]);

  const listItems = items.map(({ id, title, content, created, articleUrl }) => (
    <Card
      key={id}
      id={id}
      title={title}
      created={created}
      content={content}
      articleUrl={articleUrl}
    />
  ));

  return <GridTemplate>{listItems}</GridTemplate>;
}
