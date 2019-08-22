import * as React from "react";
import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import PlaylistIcon from '@material-ui/icons/PlayCircleFilled';
import QueueIcon from '@material-ui/icons/QueueMusic';
import {ApplicationDrawerContentStyles} from "./styles";

interface IApplicationDrawerContentProps {

}

const ApplicationDrawerContent: React.FC<IApplicationDrawerContentProps> = (props: IApplicationDrawerContentProps) => {
    const classes = ApplicationDrawerContentStyles();

    return (
        <div>
            <div className={classes.toolbar}/>
            <List>
                <ListItem button selected={true} classes={{root: classes.listItem, selected: classes.listItemSelected}}>
                    <ListItemIcon className={classes.listItemIcon}><SearchIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText primary="Search"/>
                </ListItem>
                <ListItem button classes={{root: classes.listItem, selected: classes.listItemSelected}}>
                    <ListItemIcon className={classes.listItemIcon}><PlaylistIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText primary="Playlists"/>
                </ListItem>
                <ListItem button classes={{root: classes.listItem, selected: classes.listItemSelected}}>
                    <ListItemIcon className={classes.listItemIcon}><QueueIcon className={classes.icon}/></ListItemIcon>
                    <ListItemText primary="Queue"/>
                </ListItem>
            </List>
        </div>
    );
};

export default ApplicationDrawerContent;