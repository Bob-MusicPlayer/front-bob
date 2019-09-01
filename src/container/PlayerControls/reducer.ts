import {PAUSE, PLAY, SEEK, SET_PLAYBACK_INFO} from "./constants";
import {AnyAction} from "redux";
import {IPlayerControlsState} from "./state";
import produce from "immer";
import {IS_PLAYING} from "./constants";

export const reducerName = 'PlayerControls';

const initialState: IPlayerControlsState = {
    isPlaying: false,
    playback: {
        author: "",
        cachePosition: 0,
        duration: 0,
        id: "",
        paused: true,
        position: 0,
        source: "",
        thumbnailUrl: "",
        title: ""
    }
};

export default function reducer(state = initialState, action: AnyAction) {
    return produce(state, (draft: IPlayerControlsState) => {
        switch (action.type) {
            case IS_PLAYING:
                draft.isPlaying = action.playing;
                break;
            case SET_PLAYBACK_INFO:
                draft.playback = action.info.playback;
                draft.isPlaying = action.info.isPlaying;
                break;
            case SEEK:
                draft.playback.position = action.seconds;
                break;
            case PLAY:
                draft.isPlaying = true;
                break;
            case PAUSE:
                draft.isPlaying = false;
                break;
            default:
                return state;
        }
    });
}
