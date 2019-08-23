import {AnyAction} from "redux";
import {ISearchState} from "./state";
import produce from "immer";
import {SEARCH_EXAMPLE} from "./constants";

export const reducerName = 'Test';

const initialState: ISearchState = {
  example: "test"
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: ISearchState) => {
        switch (action.type) {
            case SEARCH_EXAMPLE:
                draft.example = action.text;
                break;
            default:
                return state;
        }
    });
}
