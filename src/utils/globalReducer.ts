import {AnyAction} from "redux";
import produce from "immer";
import {IGlobalState} from "./globalState";
import {SET_LOADING} from "./globalConstants";

// const reducerName = 'global';

const initialState: IGlobalState = {
    loading: false
};

export default function globalReducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: IGlobalState) => {
        switch (action.type) {
            case SET_LOADING:
                draft.loading = action.loading;
                break;
            default:
                return state;
        }
    });
}
