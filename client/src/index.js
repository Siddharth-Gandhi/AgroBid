import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './Context/auth'
import { ThemeProvider } from '@mui/material';
import theme from './theme'
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

