---
to: src/container/<%= name %>/reducer.ts
---
import {AnyAction} from "redux";
import {I<%= name %>State} from "./state";
import produce from "immer";
import {<%= name.toUpperCase() %>_EXAMPLE} from "./constants";

export const reducerName = '<%= name %>';

const initialState: I<%= name %>State = {
  example: "test"
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: I<%= name %>State) => {
        switch (action.type) {
            case <%= name.toUpperCase() %>_EXAMPLE:
                draft.example = action.text;
                break;
            default:
                return state;
        }
    });
}
