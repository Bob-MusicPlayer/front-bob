import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const PlayerControlsStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontWeight: "bold",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden"
        },
        textSecondary: {
            color: theme.palette.text.secondary
        },
        card: {
            borderRadius: 0,
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(6px)"
        }
    }),
);