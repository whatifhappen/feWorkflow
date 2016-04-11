import React from 'react';
import { render } from 'react-dom';
import Listing from './App';
import ListFolder from './components/List';

render(<ListFolder name="foleder" loc="location" />, document.getElementById('root'));
