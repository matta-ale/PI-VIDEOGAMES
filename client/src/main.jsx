import React from 'react';
import {createRoot} from 'react-dom/client'
import './main.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import axios from 'axios'
import config from '../config';

axios.defaults.baseURL= config.apiUrl
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  
);


