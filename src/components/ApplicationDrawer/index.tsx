import * as React from "react";
import {ApplicationDrawerStyles} from "./styles";
import {Drawer, Hidden, useTheme} from "@material-ui/core";
import ApplicationDrawerContent from "../ApplicationDrawerContent";

interface IApplicationDrawerProps {

}

const ApplicationDrawer: React.FC<IApplicationDrawerProps> = (props: IApplicationDrawerProps) => {
    const classes = ApplicationDrawerStyles();
    const theme = useTheme();

    return (
        <div>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <ApplicationDrawerContent/>
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <ApplicationDrawerContent/>
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
};

export default ApplicationDrawer;