import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import {PAUSE, PLAY} from "../container/PlayerControls/constants";

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

function* rootSaga() {
    yield all([
        takeLatest(PLAY, Play),
        takeLatest(PAUSE, Pause),
    ]);
}

export default rootSaga;
