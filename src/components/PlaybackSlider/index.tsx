import * as React from "react";
import {Box, LinearProgress, Slider, Typography} from "@material-ui/core";
import {PlaybackSliderStyles} from "./styles";
import {MouseEventHandler, useEffect, useState} from "react";
import {MouseEvent} from "react";

interface IPlaybackSliderProps {
    value: number,
    buffer?: number,
    max: number,
    onValueChanged: (value: number) => void,
    isPaused: boolean,
    isLoading: boolean,
}

const PlaybackSlider: React.FC<IPlaybackSliderProps> = (props: IPlaybackSliderProps) => {
    const classes = PlaybackSliderStyles();

    const {value, buffer, max, onValueChanged, isPaused, isLoading} = props;

    const [progress, setProgress] = useState<number>(-1);
    const [sliderChanging, setSliderChanging] = useState<boolean>(false);

    function prependZero(seconds: number): string {
        if (seconds < 10) {
            return "0" + seconds
        } else {
            return seconds.toString()
        }
    }

    function mouseupListener (e: Event) {
        document.removeEventListener('mouseup', mouseupListener);
        setSliderChanging(false);
        e.stopPropagation();
    }

    function captureMouseUp (e: MouseEvent) {
        document.addEventListener('mouseup', mouseupListener);
        e.preventDefault();
        e.stopPropagation();
    }

    useEffect(() => {
        if (!sliderChanging && progress > 0) {
            onValueChanged(progress);
        }
    }, [sliderChanging]);

    useEffect(() => {
        if (!sliderChanging) {
                setProgress(value);
        }
    }, [value]);

    return (
        <Box display="flex" alignItems="center" width="100%">
            <Box display="flex" alignItems="center" flexGrow={1} marginRight={2} position="relative">
                <Slider className={classes.slider}
                        classes={{
                            rail: classes.sliderRail,
                            track: classes.sliderTrack,
                            thumb: classes.sliderThumb,
                        }}
                        value={progress}
                        onMouseUp={() => {
                            setSliderChanging(false);
                        }}
                        onMouseDown={() => setSliderChanging(true)}
                        onMouseLeave={captureMouseUp}
                        max={max}
                        disabled={isLoading}
                        step={0.01}
                        onChange={(e, v) => {
                            return setProgress(v as number);
                        }}/>
                <LinearProgress className={classes.progress} classes={{bar: classes.bar}}
                                value={progress == max ? 0 : (progress / max) * 100} variant={isLoading ? "indeterminate" : "buffer"}
                                valueBuffer={buffer ? (buffer / max) * 100 : 100}/>
            </Box>
            <Typography>{prependZero(Math.floor(progress / 60))}:{prependZero(Math.floor((progress % 60)))}</Typography>
        </Box>
    );
};

export default PlaybackSlider;
