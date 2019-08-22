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
        },
        listItem: {
          paddingTop: 15,
          paddingBottom: 15
        },
        listItemSelected: {
            background: "linear-gradient(to right, rgba(255, 255, 255, 0.2), transparent) !important",
        }
    }),
);