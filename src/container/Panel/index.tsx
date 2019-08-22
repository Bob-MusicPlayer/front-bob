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

interface IPanelContainerProps {
    example: string,
    setExample: (t: string) => void
}

ReducerRegistry.register(reducerName, reducer);

const PanelContainer: React.FC<IPanelContainerProps> = (props: IPanelContainerProps) => {
    const classes = PanelStyles();
    const {example, setExample} = props;

    return (
        <div className={classes.gridContainer}>
            <div className={classes.nav}>
                <ApplicationDrawer/>
            </div>
            <div className={classes.content}>
                <Switch>
                    <Route path="/" exact component={SearchContainer} />
                </Switch>
            </div>
            <div className={classes.playerControls}>
                <PlayerControlsContainer />
            </div>
        </div>
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


