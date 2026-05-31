import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import stripePromise from './config/stripeConfig.js';
import AppProvider from './hooks/index.jsx';
import { Router } from './routes';
import GlobalStyles from './styles/globalStyles.js';
import { standardTheme } from './styles/themes/standart.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <GlobalStyles />
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>

        <ToastContainer autoClose={2000} theme='dark' />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
