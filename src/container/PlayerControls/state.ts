import {Playback} from "../../models/Playback.model";

export interface IPlayerControlsState {
    isPlaying: boolean;
    isStopped: boolean;
    nextAvailable: boolean;
    previousAvailable: boolean;
    playback: Playback;
}
