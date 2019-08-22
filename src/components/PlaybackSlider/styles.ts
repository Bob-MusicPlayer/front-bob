import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const PlaybackSliderStyles = makeStyles((theme: Theme) =>
    createStyles({
        slider: {
            position: "absolute",
            width: "100%",
            zIndex: 2,
        },
        progress: {
            position: "absolute",
            width: "100%",
            zIndex: 1,
        },
        sliderRail: {
            backgroundColor: "transparent"
        },
        sliderTrack: {
            backgroundColor: "transparent"
        },
        sliderThumb: {
            height: 21,
            width: 21,
            marginTop: -10,
            border: "3px solid white"
        }
    }),
);
