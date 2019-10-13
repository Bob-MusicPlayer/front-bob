import {PAUSE, PLAY, SEEK, SET_PLAYBACK_INFO} from "./constants";
import {AnyAction} from "redux";
import {IPlayerControlsState} from "./state";
import produce from "immer";
import {IS_PLAYING} from "./constants";
import {PLAYBACK_SET, SET_PLAYBACK} from "../../utils/globalConstants";
import {PlayerState} from "../../models/PlayerState.enum";

export const reducerName = 'PlayerControls';

const initialState: IPlayerControlsState = {
    isPlaying: false,
    isStopped: false,
    nextAvailable: false,
    previousAvailable: false,
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
            case SET_PLAYBACK:
                draft.playback.cachePosition = 0;
                draft.playback.duration = 0;
                draft.playback.position = 0;
                draft.playback.title = "";
                draft.playback.thumbnailUrl = "";
                draft.playback.author = "";
                break;
            case PLAYBACK_SET:
                break;
            case SET_PLAYBACK_INFO:
                if (action.info.playback !== null) {
                    draft.playback = action.info.playback;
                }
                draft.isPlaying = action.info.playerState === PlayerState.Playing;
                draft.isStopped = action.info.playerState === PlayerState.NoPlayback;
                draft.nextAvailable = action.info.nextAvailable;
                draft.previousAvailable = action.info.previousAvailable;
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
