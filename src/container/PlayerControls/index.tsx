import React, {useEffect} from "react";
import {connect, useDispatch, useStore} from "react-redux";
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
import {PlayerController} from "./playerController";

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

    const dispatch = useDispatch();
    const store = useStore();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null)
    }

    useEffect(() => {
        console.log("lolo");
        const playerController = new PlayerController(dispatch, store);
    }, []);

    const open = Boolean(anchorEl);

    return (
        <Card elevation={4} classes={{
            root: classes.card
        }}>
            <Box display="flex" width="100%" paddingX={2} justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" marginRight={4}>
                    {
                        playback.thumbnailUrl !== undefined ?
                            <Thumbnail thumbnailUrl={playback.thumbnailUrl}/>
                            : null
                    }
                    <Box maxWidth="300px">
                        <Typography classes={{root: classes.title}} variant="h5"
                                    color="textPrimary">{playback.title}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">{playback.author}</Typography>
                    </Box>
                </Box>
                <Box>
                    <IconButton href="#4"><PreviousIcon/></IconButton>
                    <Fab onClick={() => onPlayPause(isPlaying)} size="medium" color="primary" href="#">
                        {isPlaying ? <PauseIcon/> : <PlayIcon/>}
                    </Fab>
                    <IconButton href="#"><NextIcon/></IconButton>
                </Box>
                <Box flexGrow={1} marginX={4}>
                    {
                        playback.duration !== undefined && playback.position !== undefined && playback.cachePosition !== undefined ?
                            <PlaybackSlider onValueChanged={(value: number) => onSeek(value)} max={playback.duration} value={playback.position}
                                            buffer={playback.cachePosition} isPaused={playback.paused as boolean}/>
                            : null
                    }

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


