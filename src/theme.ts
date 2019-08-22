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
        background: {
            default: "#FAFCFE"
        },
        primary: {
            main: "#554FD8",
        },
        text: {
            primary: "#363636",
        },
        secondary: {
            main: orange[500],
        },
    },
    shape: {
        borderRadius: 8
    },
    overrides: {
        MuiDrawer: {
            paper: {
                backgroundColor: "#554FD8",
                color: "#ffffff",
            },
        },
        MuiOutlinedInput: {
            input: {
                backgroundColor: "#fff",
                borderColor: "#EAEEF4",
                padding: "12px 16px",
                fontSize: "16px"
            },
        },
    }
});