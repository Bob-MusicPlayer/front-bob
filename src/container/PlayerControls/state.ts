import {Playback} from "../../models/Playback.model";

export interface IPlayerControlsState {
    isPlaying: boolean;
    isLoading: boolean;
    playback: Playback
}
