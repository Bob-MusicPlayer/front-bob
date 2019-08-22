import {createMuiTheme} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";

export const AppTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: "#554FD8"
        },
        secondary: {
            main: orange[500],
        },
    },
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: "#554FD8",
                color: "#ffffff",
            },
        },
    }
});