import {AnyAction} from "redux";
import {SEARCH, SEARCH_SUCCEED} from "./constants";
import {SearchResponse} from "../../models/SearchResponse.model";

export function Search(query: string): AnyAction {
    return {
        type: SEARCH,
        query
    }
}

export function SearchSucceed(results: SearchResponse): AnyAction {
    return {
        type: SEARCH_SUCCEED,
        results
    }
}
