// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { Web3Provider } from './Web3Context';
import './index.css'; // Import global styles

ReactDOM.render(
  <React.StrictMode>
    <Web3Provider>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </Web3Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
