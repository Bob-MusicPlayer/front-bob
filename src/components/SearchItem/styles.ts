import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const SearchItemStyles = makeStyles((theme: Theme) =>
    createStyles({
       playButton: {
            border: "2px solid " + theme.palette.text.secondary,
            padding: 5
       }
    }),
);
