import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
import storeFactory from './store/index';
import './style/style.css';

const store = storeFactory();


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
