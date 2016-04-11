import React from 'react';
import { render } from 'react-dom';
import Listing from './App';
import ListFolder from './components/List';
import Dropzone from './components/layout/dropzone';

render(<Dropzone type='folder' />, document.getElementById('root'));
