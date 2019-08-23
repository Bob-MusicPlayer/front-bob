export interface IPlayerControlsState {
    isPlaying: boolean;
    playback: Playback
}

export interface Playback {
    author: string;
    cachePosition: number;
    duration: number;
    id: string;
    paused: boolean;
    position: number;
    source: string;
    thumbnailUrl: string;
    title: string;
}
