import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import store from "./createStore";
import PanelContainer from "./container/Panel";
import { ThemeProvider } from '@material-ui/styles';
import {AppTheme} from "./theme";
import {CssBaseline} from "@material-ui/core";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={AppTheme}>
        <Provider store={store}>
            <CssBaseline />
            <div className="App">
                <PanelContainer />
            </div>
        </Provider>
        </ThemeProvider>
    );
}

export default App;
