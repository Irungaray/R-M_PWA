import React from 'react';
import ReactDOM from 'react-dom';

import ThemeContext from './context/ThemeContext'

import App from './App';

import './styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value="red">
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);