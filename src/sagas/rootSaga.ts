import {call, put, all, takeLatest} from 'redux-saga/effects'
import {PAUSE, PLAY, SEEK} from "../container/PlayerControls/constants";
import {SearchRequest} from "../models/SearchRequest.model";
import {SEARCH} from "../container/Search/constants";
import {AnyAction} from "redux";
import {SearchResponse} from "../models/SearchResponse.model";
import {SearchSucceed} from "../container/Search/actions";
import {NEXT, PREVIOUS, QUEUE_NEXT, SET_LOADING, SET_PLAYBACK, SYNC} from "../utils/globalConstants";
import {PlaybackSet, Sync as PlayerSync} from "../utils/globalActions";

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

    const data = JSON.stringify(searchRequest);

    try {
        const httpResponse: Response = yield call(fetch, baseUrl + "search", {method: "POST", body: data});
        const searchResponse: SearchResponse = yield httpResponse.json();
        yield put(SearchSucceed(searchResponse))
    } catch (e) {
        console.log(e);
    }
}

function* SetPlayback(action: AnyAction) {
    const data = JSON.stringify(action.playback);

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

function* QueueNext(action: AnyAction) {
    const data = JSON.stringify(action.playback);

    try {
        yield call(fetch, baseUrl + "queue/next", {method: "POST", body: data});
    } catch (e) {
        console.log(e);
    }
}

function* Next() {
    try {
        yield call(fetch, baseUrl + "next", {method: "POST"});
    } catch (e) {
        console.log(e);
    }
}

function* Previous() {
    try {
        yield call(fetch, baseUrl + "previous", {method: "POST"});
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
        takeLatest(SYNC, Sync),
        takeLatest(QUEUE_NEXT, QueueNext),
        takeLatest(NEXT, Next),
        takeLatest(PREVIOUS, Previous),
    ]);
}

export default rootSaga;
