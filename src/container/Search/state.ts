import {SearchResponse} from "../../models/SearchResponse.model";

export interface ISearchState {
    loading: boolean;
    results: SearchResponse;
}
