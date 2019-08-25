import {Playback} from "../models/Playback.model";
import {AnyAction} from "redux";
import {SET_PLAYBACK} from "./globalConstants";

export function SetPlayback(playback: Playback): AnyAction {
    return {
        type: SET_PLAYBACK,
        playback
    }
}