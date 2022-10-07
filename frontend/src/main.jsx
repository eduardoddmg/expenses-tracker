import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ContextProvider } from './context';
import "./style.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <ContextProvider>
          <App />
        </ContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
)
