import * as React from "react";
import {Box, LinearProgress, Slider, Typography} from "@material-ui/core";
import {PlaybackSliderStyles} from "./styles";

interface IPlaybackSliderProps {

}

const PlaybackSlider: React.FC<IPlaybackSliderProps> = (props: IPlaybackSliderProps) => {
    const classes = PlaybackSliderStyles();

    return (
        <Box display="flex" alignItems="center" width="100%">
            <Box display="flex" alignItems="center" flexGrow={1} marginRight={2} position="relative">
                <Slider className={classes.slider} classes={{
                    rail: classes.sliderRail,
                    track: classes.sliderTrack,
                    thumb: classes.sliderThumb,
                }} value={50}/>
                <LinearProgress className={classes.progress} value={50} variant="buffer" valueBuffer={100}/>
            </Box>
            <Typography>02:16</Typography>
        </Box>
    );
};

export default PlaybackSlider;
