import {AnyAction} from "redux";
import {ISearchState} from "./state";
import produce from "immer";
import {SEARCH} from "./constants";

export const reducerName = 'Search';

const initialState: ISearchState = {
    loading: false,
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: ISearchState) => {
        switch (action.type) {
            case SEARCH:
                draft.loading = true;
                break;
            default:
                return state;
        }
    });
}
