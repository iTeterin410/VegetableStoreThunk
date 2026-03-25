import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { store } from './store';
import App from './App';
import '@mantine/core/styles.css';
import './index.css';

const globalStyles = {
  body: {
    backgroundColor: '#F3F5FA',
    fontFamily: 'Inter, sans-serif',
    margin: 0,
    padding: 0,
  },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider theme={{ globalStyles }}>
        <App />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);