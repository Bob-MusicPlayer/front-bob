import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const PanelStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridContainer: {
            height: "100%",
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gridTemplateRows: "1fr auto",
            gridColumnGap: "0px",
            gridRowGap: "0px",
        },
        nav: {
            gridArea: "1 / 1 / 2 / 2",
            height: "100%",
        },
        content: {
            gridArea: "1 / 2 / 2 / 3"
        },
        playerControls: {
            gridArea: "2 / 1 / 3 / 3",
            backgroundColor: "white",
        }
    }),
);