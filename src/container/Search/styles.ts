import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const SearchStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            fontWeight: "bold"
        },
        textSecondary: {
            color: theme.palette.text.disabled,
        }
    }),
);