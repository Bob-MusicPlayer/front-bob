import * as React from "react";
import {Box, LinearProgress, Slider, Typography} from "@material-ui/core";
import {PlaybackSliderStyles} from "./styles";
import {useState} from "react";

interface IPlaybackSliderProps {
    value: number,
    buffer?: number,
    max: number,
    onValueChanged: (value: number) => void
}

const PlaybackSlider: React.FC<IPlaybackSliderProps> = (props: IPlaybackSliderProps) => {
    const classes = PlaybackSliderStyles();

    const {value, buffer, max, onValueChanged} = props;

    function prependZero(seconds: number): string {
        if (seconds < 10) {
            return "0" + seconds
        } else {
            return seconds.toString()
        }
    }

    return (
        <Box display="flex" alignItems="center" width="100%">
            <Box display="flex" alignItems="center" flexGrow={1} marginRight={2} position="relative">
                <Slider className={classes.slider} classes={{
                    rail: classes.sliderRail,
                    track: classes.sliderTrack,
                    thumb: classes.sliderThumb,
                }} value={value} max={max} step={0.01} onChange={(e, value) => onValueChanged(value as number)} />
                <LinearProgress className={classes.progress} classes={{bar: classes.bar}} value={value==max?0:(value/max)*100} variant="buffer" valueBuffer={buffer?(buffer/max)*100:100}/>
            </Box>
            <Typography>{prependZero(Math.floor(value/60))}:{prependZero(Math.floor((value%60)))}</Typography>
        </Box>
    );
};

export default PlaybackSlider;
