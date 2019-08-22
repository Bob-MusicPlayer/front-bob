import {AnyAction} from "redux";
import {IPanelState} from "./state";
import produce from "immer";
import {PANEL_EXAMPLE} from "./constants";

export const reducerName = 'Test';

const initialState: IPanelState = {
  example: "test"
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: IPanelState) => {
        switch (action.type) {
            case PANEL_EXAMPLE:
                draft.example = action.text;
                break;
            default:
                return state;
        }
    });
}
