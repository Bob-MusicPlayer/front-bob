import {createMuiTheme} from "@material-ui/core";
import {orange} from "@material-ui/core/colors";

export const AppTheme = createMuiTheme({
    palette: {
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