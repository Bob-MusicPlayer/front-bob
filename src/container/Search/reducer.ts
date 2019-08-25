import {AnyAction} from "redux";
import {ISearchState} from "./state";
import produce from "immer";
import {SEARCH, SEARCH_SUCCEED} from "./constants";
import {SearchResponse} from "../../models/SearchResponse.model";

export const reducerName = 'Search';

const initialState: ISearchState = {
    loading: false,
    results: {},
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: ISearchState) => {
        switch (action.type) {
            case SEARCH:
                draft.loading = true;
                break;
            case SEARCH_SUCCEED:
                draft.loading = false;
                draft.results = action.results;
                break;
            default:
                return state;
        }
    });
}
