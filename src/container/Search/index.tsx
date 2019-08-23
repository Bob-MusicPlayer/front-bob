import React, {useState} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ISearchState} from "./state";
import {SetExample} from "./actions";
import SearchIcon from '@material-ui/icons/SearchRounded';
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {
    Badge,
    Box,
    Button,
    Container, Divider,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select, Tab, Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import {SearchStyles} from "./styles";

interface ISearchContainerProps {
    example: string,
    setExample: () => {}
}

ReducerRegistry.register(reducerName, reducer);

const SearchContainer: React.FC<ISearchContainerProps> = (props: ISearchContainerProps) => {
    const {example} = props;
    const classes = SearchStyles();

    const [source, setSource] = useState<string>("all");

    return (
        <Container fixed>
            <Box marginY={4}>
                <Typography variant="h4" className={classes.header}>Search</Typography>
                <Typography variant="subtitle1">Search for Songs among different Players</Typography>
                <Box marginTop={2} marginBottom={1} width="100%" display="flex">
                    <Select value={source} onChange={(e) => setSource(e.target.value as string)} input={<OutlinedInput labelWidth={0} name="age"
                                                  id="outlined-age-simple"/>}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                        <MenuItem value="mpd">MPD</MenuItem>
                    </Select>
                    <Box marginX={2} flexGrow={1}>
                        <OutlinedInput fullWidth startAdornment={<InputAdornment position="start">
                            <SearchIcon className={classes.textSecondary}/>
                        </InputAdornment>} labelWidth={0} placeholder="Search..."/>
                    </Box>
                    <Button variant="contained" color="primary">Search</Button>
                </Box>
                <Tabs textColor="primary" variant="standard" indicatorColor="primary" value={0}>
                    <Tab label="Youtube"/>
                    <Tab label="Mpd"/>
                </Tabs>
                <Divider/>
            </Box>
        </Container>
    );
};

const mapStateToProps = (state: any) => {
    const reducerState = state[reducerName];

    return {
        example: reducerState.example
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setExample: () => dispatch(SetExample("search"))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);


