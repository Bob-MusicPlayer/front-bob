import {AnyAction} from "redux";
import {IPlayerControlsState} from "./state";
import produce from "immer";
import {PLAYERCONTROLS_EXAMPLE} from "./constants";

export const reducerName = 'Test';

const initialState: IPlayerControlsState = {
  example: "test"
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: IPlayerControlsState) => {
        switch (action.type) {
            case PLAYERCONTROLS_EXAMPLE:
                draft.example = action.text;
                break;
            default:
                return state;
        }
    });
}
