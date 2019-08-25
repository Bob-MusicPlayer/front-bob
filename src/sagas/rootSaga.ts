import {call, put, takeEvery, all, takeLatest} from 'redux-saga/effects'
import {PAUSE, PLAY, SEEK} from "../container/PlayerControls/constants";
import {SearchRequest} from "../models/SearchRequest.model";
import {SEARCH} from "../container/Search/constants";
import {AnyAction} from "redux";
import {SearchResponse} from "../models/SearchResponse.model";
import {SearchSucceed} from "../container/Search/actions";
import {SET_PLAYBACK} from "../utils/globalConstants";

const baseUrl: string = "http://localhost:5002/api/v1/";

function* Play() {
    try {
        yield call(fetch, baseUrl + "play", {method: "POST"});
    } catch (e) {
        console.log(e);
    }
}

function* Pause() {
    try {
        yield call(fetch, baseUrl + "pause", {method: "POST"});
    } catch (e) {
        console.log(e);
    }
}

function* Search(action: AnyAction) {
    const searchRequest: SearchRequest = {
        query: action.query,
        source: ""
    };

    var data = JSON.stringify(searchRequest);

    try {
        const httpResponse: Response = yield call(fetch, baseUrl + "search", {method: "POST", body: data});
        const searchResponse: SearchResponse = yield httpResponse.json();
        yield put(SearchSucceed(searchResponse))
    } catch (e) {
        console.log(e);
    }
}

function* SetPlayback(action: AnyAction) {
    var data = JSON.stringify(action.playback);

    try {
        yield call(fetch, baseUrl + "playback", {method: "POST", body: data});
    } catch (e) {
        console.log(e);
    }
}

function* Seek(action: AnyAction) {
    const seconds = Math.round(action.seconds);

    try {
        yield call(fetch, baseUrl + "playback/seek?seconds=" + seconds, {method: "POST"});
    } catch (e) {
        console.log(e);
    }
}

function* rootSaga() {
    yield all([
        takeLatest(PLAY, Play),
        takeLatest(PAUSE, Pause),
        takeLatest(SEARCH, Search),
        takeLatest(SET_PLAYBACK, SetPlayback),
        takeLatest(SEEK, Seek)
    ]);
}

export default rootSaga;
