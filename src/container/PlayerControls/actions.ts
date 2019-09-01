import {AnyAction} from "redux";
import {SET_PLAYBACK_INFO, SEEK, IS_PLAYING, PLAY, PAUSE} from "./constants";

export function Play(): AnyAction {
    return {
        type: PLAY
    }
}

export function Pause(): AnyAction {
    return {
        type: PAUSE
    }
}

export function IsPlaying(playing: boolean): AnyAction {
    return {
        type: IS_PLAYING,
        playing
    }
}

export function SetPlaybackInfo(info: any): AnyAction {
    return {
        type: SET_PLAYBACK_INFO,
        info
    }
}

export function Seek(seconds: number, sync = true): AnyAction {
    return {
        type: SEEK,
        seconds,
        sync
    }
}
