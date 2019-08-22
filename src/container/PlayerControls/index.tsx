import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import PreviousIcon from "@material-ui/icons/SkipPreviousRounded";
import NextIcon from "@material-ui/icons/SkipNextRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import {SetExample} from "./actions";
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {Box, Card, Fab, IconButton, Slider, Typography} from "@material-ui/core";
import {PlayerControlsStyles} from "./styles";

interface IPlayerControlsContainerProps {
    example: string,
    setExample: () => {}
}

ReducerRegistry.register(reducerName, reducer);

const PlayerControlsContainer: React.FC<IPlayerControlsContainerProps> = (props: IPlayerControlsContainerProps) => {
    const {example} = props;
    const classes = PlayerControlsStyles();

    return (
        <Card elevation={4}>
            <Box display="flex" width="100%" paddingX={2} justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <Box margin={2} borderRadius={8} overflow="hidden">
                        <div style={{
                            backgroundImage: "url(https://picsum.photos/536/354)",
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            height: 52,
                            width: 52
                        }}/>
                    </Box>
                    <div>
                        <Typography className={classes.title} variant="h5" color="textPrimary">N.O.W. (Uraz Kurt Remix)</Typography>
                        <Typography variant="subtitle1" color="textSecondary">Uptown Funk Empire</Typography>
                    </div>
                </Box>
                <Box>
                    <IconButton><PreviousIcon /></IconButton>
                    <Fab size="medium" color="primary" ><PlayIcon /></Fab>
                    <IconButton><NextIcon /></IconButton>
                </Box>
                <Box>
                    <Slider
                        defaultValue={0}
                    />
                </Box>
            </Box>
        </Card>
    );
};

const mapStateToProps = (state: any) => {
    const reducerState = state[reducerName];

    return {
        example: reducerState.example
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setExample: () => dispatch(SetExample("playercontrols"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControlsContainer);


