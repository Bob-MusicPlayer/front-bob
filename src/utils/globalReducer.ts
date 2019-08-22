import {AnyAction} from "redux";
import produce from "immer";
import {IGlobalState} from "./globalState";

const reducerName = 'global';

const initialState: IGlobalState = {};

export default function globalReducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: IGlobalState) => {
        switch (action.type) {
            default:
                return state;
        }
    });
}
