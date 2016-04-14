import React from 'react';
import { render } from 'react-dom';
import Listing from './App';
import ListFolder from './components/List';
// import Dropzone from './components/layout/dropzone';

// render(<Dropzone type='folder' />, document.getElementById('root'));

import CartItem from './components/temp';

const order = {
  title: 'fresh fruits package',
  image: 'img',
  initialQty: 3,
  price: 8
};

render(
  <CartItem
    title={order.title}
  />,
  document.getElementById('root')
);
