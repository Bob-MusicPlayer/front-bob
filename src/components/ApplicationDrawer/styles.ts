import {createStyles, makeStyles, Theme} from "@material-ui/core";

const drawerWidth = 240;

export const ApplicationDrawerStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        h100: {
            height: "100%",
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
                height: "100%",
            },
        },
        appBar: {
            marginLeft: drawerWidth,
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
            position: "relative",
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);