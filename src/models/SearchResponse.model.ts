import {Playback} from "./Playback.model";

export interface SearchResponse {
    [key: string]: SearchPlayer
}

export interface SearchPlayer {
    amount:    number;
    error:     string;
    playbacks: Playback[];
}