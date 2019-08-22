import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {SetExample} from "./actions";
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {PanelStyles} from "./styles";
import ApplicationDrawer from "../../components/ApplicationDrawer";

interface IPanelContainerProps {
    example: string,
    setExample: (t: string) => void
}

ReducerRegistry.register(reducerName, reducer);

const PanelContainer: React.FC<IPanelContainerProps> = (props: IPanelContainerProps) => {
    const classes = PanelStyles();
    const {example, setExample} = props;

    return (
       <div>
          <ApplicationDrawer />
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


