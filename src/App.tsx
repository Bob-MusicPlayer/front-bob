import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./createStore";
import PanelContainer from "./container/Panel";
import {ThemeProvider} from '@material-ui/styles';
import {AppTheme} from "./theme";
import {CssBaseline} from "@material-ui/core";
import {BrowserRouter} from "react-router-dom";
import {IsPlaying, Play, Seek, SetPlaybackInfo} from "./container/PlayerControls/actions";

const e1 = new EventSource('http://localhost:5002/api/v1/events');
e1.onerror = () => {
    console.log("sef")
};
e1.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.event) {
        case "play":
            store.dispatch(IsPlaying(true));
            break;
        case "pause":
            store.dispatch(IsPlaying(false));
            break;
        case "sync":
            if (data.payload.playback != null) {
                store.dispatch(SetPlaybackInfo(data.payload));
            }
            break;
        case "seek":
            store.dispatch(Seek(data.payload, false));
            break;
        default:
            console.warn("Got unknown event: " + data.event);
            break;
    }
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={AppTheme}>
            <Provider store={store}>
                <BrowserRouter>
                    <CssBaseline/>
                    <div className="App">
                        <PanelContainer/>
                    </div>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
