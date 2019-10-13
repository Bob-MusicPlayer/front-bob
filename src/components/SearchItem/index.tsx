import {Avatar, Box, IconButton, Menu, MenuItem, TableCell, TableRow} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVertRounded";
import FavoriteIcon from "@material-ui/icons/FavoriteRounded";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorderRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import React, {useEffect, useState} from "react";
import {Playback} from "../../models/Playback.model";
import {SearchItemStyles} from "./styles";

interface ISearchItemProps {
    playback: Playback,
    onSetPlayback: (playback: Playback) => void,
    onQueueNext: (playback: Playback) => void,
}

function SearchItem(props: ISearchItemProps) {
    const {playback, onSetPlayback, onQueueNext} = props;
    const classes = SearchItemStyles();

    const [hover, setHover] = useState<boolean>(false);
    const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);

    function handleMenu(event: React.MouseEvent<HTMLButtonElement>) {
        setMenuEl(event.currentTarget);
    }

    function handleClose() {
        setMenuEl(null);
    }

    useEffect(() => {
        console.log("UPDATE");
    }, [playback]);

    return (
        <TableRow hover key={playback.id} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <TableCell>
                <Box visibility={hover ? 'visible' : 'hidden'}>
                    <IconButton classes={{root: classes.playButton}} onClick={() => onSetPlayback(playback)}>
                        <PlayIcon/>
                    </IconButton>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row">
                <Avatar src={playback.thumbnailUrl}/>
            </TableCell>
            <TableCell>
                <IconButton>
                    <FavoriteBorderIcon/>
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {playback.title}
            </TableCell>
            <TableCell align="right">{playback.author}</TableCell>
            <TableCell align="right">{playback.duration}</TableCell>
            <TableCell>
                <Box visibility={hover ? 'visible' : 'hidden'}>
                    <IconButton onClick={handleMenu}>
                        <MoreVertIcon/>
                    </IconButton>
                </Box>
            </TableCell>
            <Menu
                id="simple-menu"
                anchorEl={menuEl}
                keepMounted
                open={Boolean(menuEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    onSetPlayback(playback);
                    handleClose();
                }}>Abspielen</MenuItem>
                <MenuItem onClick={() => {
                    onQueueNext(playback);
                    handleClose();
                }}>In Warteschlange</MenuItem>
                <MenuItem onClick={handleClose}>Zur Playlist hinzufügen</MenuItem>
            </Menu>
        </TableRow>
    );
}

export default SearchItem;