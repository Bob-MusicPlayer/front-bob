import {Playback} from "../models/Playback.model";
import {Action, AnyAction} from "redux";
import {NEXT, PLAYBACK_SET, PREVIOUS, QUEUE_NEXT, SET_LOADING, SET_PLAYBACK, SYNC} from "./globalConstants";

export function SetPlayback(playback: Playback): AnyAction {
    return {
        type: SET_PLAYBACK,
        playback
    }
}

export function PlaybackSet(): Action {
    return {
        type: PLAYBACK_SET
    }
}

export function QueueNext(playback: Playback): AnyAction {
    return {
        type: QUEUE_NEXT,
        playback
    }
}

export function Next() {
    return {
        type: NEXT
    }
}

export function Previous() {
    return {
        type: PREVIOUS
    }
}

export function Sync(): Action {
    return {
        type: SYNC
    }
}

export function SetLoading(loading: boolean): AnyAction {
    return {
        type: SET_LOADING,
        loading,
    }
}
