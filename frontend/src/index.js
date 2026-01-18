import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Import the UI Library Logic
import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css'; 

const theme = createTheme({
  primaryColor: 'indigo',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);