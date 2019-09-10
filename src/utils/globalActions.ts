import {Playback} from "../models/Playback.model";
import {Action, AnyAction} from "redux";
import {PLAYBACK_SET, SET_PLAYBACK, SYNC} from "./globalConstants";

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

export function Sync(): Action {
    return {
        type: SYNC
    }
}
