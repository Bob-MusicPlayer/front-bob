import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import PreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import NextIcon from "@material-ui/icons/SkipNextRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import ShuffleIcon from "@material-ui/icons/ShuffleRounded";
import RepeateIcon from "@material-ui/icons/RepeatRounded";
import VolumeUpIcon from "@material-ui/icons/VolumeUpRounded";
import VolumeDownIcon from "@material-ui/icons/VolumeDownRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {Box, Card, Fab, IconButton, Popover, Slider, Typography} from "@material-ui/core";
import {PlayerControlsStyles} from "./styles";
import PlaybackSlider from "../../components/PlaybackSlider";
import {IPlayerControlsState} from "./state";
import {Pause, Play, Seek} from "./actions";
import Thumbnail from "../../components/Thumbnail";
import {Playback} from "../../models/Playback.model";

interface IPlayerControlsContainerProps {
    isPlaying: boolean,
    playback: Playback,
    onSeek: (time: number) => void,
    onPlayPause: (isPlaying: boolean) => void,
}

ReducerRegistry.register(reducerName, reducer);

const PlayerControlsContainer: React.FC<IPlayerControlsContainerProps> = (props: IPlayerControlsContainerProps) => {
    const {isPlaying, playback, onSeek, onPlayPause} = props;
    const classes = PlayerControlsStyles();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl);

    return (
        <Card elevation={4}>
            <Box display="flex" width="100%" paddingX={2} justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" marginRight={4}>
                    <Thumbnail thumbnailUrl={playback.thumbnailUrl}/>
                    <div>
                        <Typography className={classes.title} variant="h5"
                                    color="textPrimary">{playback.title}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{playback.author}</Typography>
                    </div>
                </Box>
                <Box>
                    <IconButton><PreviousIcon/></IconButton>
                    <Fab onClick={() => onPlayPause(isPlaying)} size="medium" color="primary">
                        {isPlaying ? <PauseIcon/> : <PlayIcon/>}
                    </Fab>
                    <IconButton><NextIcon/></IconButton>
                </Box>
                <Box flexGrow={1} marginX={4}>
                    <PlaybackSlider onValueChanged={onSeek} max={playback.duration} value={playback.position}
                                    buffer={playback.cachePosition}/>
                </Box>
                <Box>
                    <IconButton><ShuffleIcon/></IconButton>
                    <IconButton><RepeateIcon/></IconButton>
                    <IconButton onClick={handleClick}><VolumeUpIcon/></IconButton>
                    <Popover
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Box height={250} display="flex" flexDirection="column" padding={3}>
                            <VolumeUpIcon className={classes.textSecondary}/>
                            <Box marginY={1} flexGrow={1}>
                                <Slider
                                    orientation="vertical"
                                    defaultValue={30}
                                    aria-labelledby="vertical-slider"
                                />
                            </Box>
                            <VolumeDownIcon className={classes.textSecondary}/>
                        </Box>
                    </Popover>
                </Box>
            </Box>
        </Card>
    );
};

const mapStateToProps = (state: any) => {
    const reducerState: IPlayerControlsState = state[reducerName];

    return {
        isPlaying: reducerState.isPlaying,
        playback: reducerState.playback
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSeek: (time: number) => dispatch(Seek(time)),
        onPlayPause: (isPlaying: boolean) => {
            if (isPlaying) {
                dispatch(Pause())
            } else {
                dispatch(Play())
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControlsContainer);


