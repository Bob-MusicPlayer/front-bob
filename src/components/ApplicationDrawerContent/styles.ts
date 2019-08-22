import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const ApplicationDrawerContentStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: theme.mixins.toolbar,
        icon: {
            color: "white"
        },
        listItemIcon: {
            minWidth: 0,
            paddingLeft: 20,
            paddingRight: 15
        }
    }),
);