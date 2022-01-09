import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './index.scss';
import App from './App';
import store from './redux/store';

const theme = createTheme({
    components: {
        // Name of the component
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1.5rem',
                    fontWeight: '500'
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    color: '#383838',
                },
            },
        },
    },
});

ReactDOM.render(
    <ThemeProvider theme={theme} >
        <React.StrictMode>
            <Provider store={store} >
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    </ThemeProvider>
    ,
    document.getElementById('root')
);

