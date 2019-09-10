import {call, put, takeEvery, all, takeLatest} from 'redux-saga/effects'
import {PAUSE, PLAY, SEEK} from "../container/PlayerControls/constants";
import {SearchRequest} from "../models/SearchRequest.model";
import {SEARCH} from "../container/Search/constants";
import {AnyAction} from "redux";
import {SearchResponse} from "../models/SearchResponse.model";
import {SearchSucceed} from "../container/Search/actions";
import {PLAYBACK_SET, SET_PLAYBACK, SYNC} from "../utils/globalConstants";
import {PlaybackSet, Sync as PlayerSync} from "../utils/globalActions";

const baseUrl: string = "http://192.168.11.241:5002/api/v1/";

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
        yield put(PlayerSync());
        yield put(PlaybackSet())
    } catch (e) {
        console.log(e);
    }
}

function* Seek(action: AnyAction) {
    if (!action.sync) {
        return
    }
    const seconds = Math.round(action.seconds);

    try {
        yield call(fetch, baseUrl + "playback/seek?seconds=" + seconds, {method: "POST"});
    } catch (e) {
        console.log(e);
    }
}

function* Sync() {
    try {
        yield call(fetch, baseUrl + "sync", {method: "POST"});
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
        takeLatest(SEEK, Seek),
        takeLatest(SYNC, Sync)
    ]);
}

export default rootSaga;
