import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {SetExample} from "./actions";
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {PanelStyles} from "./styles";
import ApplicationDrawer from "../../components/ApplicationDrawer";
import PlayerControlsContainer from "../PlayerControls";
import {Switch, Route} from "react-router-dom";
import SearchContainer from "../Search";
import {Box} from "@material-ui/core";

interface IPanelContainerProps {
    example: string,
    setExample: (t: string) => void
}

ReducerRegistry.register(reducerName, reducer);

const PanelContainer: React.FC<IPanelContainerProps> = (props: IPanelContainerProps) => {
    const classes = PanelStyles();
    const {example, setExample} = props;

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
                <PlayerControlsContainer/>
            </Box>
        </Box>
    );
};

const mapStateToProps = (state: any) => {
    const reducerState = state[reducerName];

    return {
        example: reducerState.example
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setExample: (t: string) => dispatch(SetExample(t))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelContainer);


