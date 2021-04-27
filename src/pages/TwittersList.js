import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'components/molecules/Card';
import GridTemplate from 'templates/GridTemplate';
import { fetchItems } from 'features/rootSlice';

export default function Twitters() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.root.twitters);

  useEffect(() => {
    dispatch(fetchItems({ itemType: 'twitters' }));
  }, []);

  const listItems = items.map(
    ({ id, title, content, created, twitterName }) => (
      <Card
        key={id}
        id={id}
        title={title}
        created={created}
        content={content}
        twitterName={twitterName}
      />
    )
  );

  return <GridTemplate>{listItems}</GridTemplate>;
}
