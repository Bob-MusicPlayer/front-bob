import React from "react";
import {connect} from "react-redux";
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import ApplicationDrawer from "../../components/ApplicationDrawer";
import PlayerControlsContainer from "../PlayerControls";
import {Switch, Route} from "react-router-dom";
import SearchContainer from "../Search";
import {Box, Slide, Snackbar} from "@material-ui/core";
import {Simulate} from "react-dom/test-utils";
import {IGlobalState} from "../../utils/globalState";
import {PanelStyles} from "./styles";
import LoadingSnackbar from "../../components/LoadingSnackbar";

interface IPanelContainerProps {
    loading: boolean,
}

ReducerRegistry.register(reducerName, reducer);

const PanelContainer: React.FC<IPanelContainerProps> = (props: IPanelContainerProps) => {
    const {loading} = props;
    const classes = PanelStyles();

    return (
        <Box height="100%">
            <Box display="flex" height="100%">
                <ApplicationDrawer/>
                <Box flexGrow={1} overflow="auto" paddingBottom="84px">
                    <Switch>
                        <Route path="/" exact component={SearchContainer}/>
                    </Switch>
                </Box>
            </Box>
            <Box position="absolute" bottom={0} width="100%" zIndex={1200}>
                <PlayerControlsContainer />
            </Box>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={loading}
            >
                <LoadingSnackbar message="Loading Song..." />
            </Snackbar>
        </Box>
    );
};

const mapStateToProps = (state: any) => {
    const reducerState = state[reducerName];
    const globalState: IGlobalState = state["Global"];

    return {
        example: reducerState.example,
        loading: globalState.loading
    };
};

export default connect(mapStateToProps)(PanelContainer);


