import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from 'components/molecules/Card';
import GridTemplate from 'templates/GridTemplate';
import { fetchItems } from 'features/rootSlice';

export default function Notes() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.root.notes);

  useEffect(() => {
    dispatch(fetchItems({ itemType: 'notes' }));
  }, []);

  const listItems = items.map(({ id, title, content, created }) => (
    <Card key={id} id={id} title={title} created={created} content={content} />
  ));

  return <GridTemplate>{listItems}</GridTemplate>;
}
