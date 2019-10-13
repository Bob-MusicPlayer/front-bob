import * as React from "react";
import {Box, CircularProgress, Icon, makeStyles, SnackbarContent, Theme} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/CloseRounded"

interface ILoadingSnackbarProps {
    className?: string;
    message?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    bar: {
        backgroundColor: "rgba(255, 255, 255, .3)",
        backdropFilter: "blur(8px)",
        borderRadius: "50rem",
        color: theme.palette.text.primary
    },
    icon: {
        fontSize: 20,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

const LoadingSnackbar: React.FC<ILoadingSnackbarProps> = (props: ILoadingSnackbarProps) => {
    const classes = useStyles();
    const {className, message, ...other} = props;

    return (
        <SnackbarContent
            className={classes.bar}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <CircularProgress variant="indeterminate" color="primary" size={20}/>
          <Box ml={2}>
            {message}
          </Box>
        </span>
            }
            {...other}
        />
    );
};

export default LoadingSnackbar;