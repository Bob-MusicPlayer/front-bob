---
to: src/container/<%= name %>/index.tsx
---
import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {I<%= name %>State} from "./state";
import {SetExample} from "./actions";
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";

interface I<%= name %>ContainerProps {
    example: string,
    setExample: () => {}
}

ReducerRegistry.register(reducerName, reducer);

const <%= name %>Container: React.FC<I<%= name %>ContainerProps> = (props: I<%= name %>ContainerProps) => {
    const {example} = props;
    return (
        <div><%= name %>Container works! <br /><span>{example}</span></div>
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
        setExample: () => dispatch(SetExample("<%= name.toLowerCase() %>"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(<%= name %>Container);


