import React, {useState} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ISearchState} from "./state";
import {Search} from "./actions";
import SearchIcon from '@material-ui/icons/SearchRounded';
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {
    Badge,
    Box,
    Button, CircularProgress,
    Container, Divider,
    InputAdornment, List, ListItem, ListItemAvatar, ListItemText,
    MenuItem,
    OutlinedInput,
    Select, Tab, Tabs,
    TextField,
    Typography
} from "@material-ui/core";
import {SearchStyles} from "./styles";
import {SearchResponse} from "../../models/SearchResponse.model";
import {act, Simulate} from "react-dom/test-utils";
import Thumbnail from "../../components/Thumbnail";
import {Playback} from "../../models/Playback.model";
import {SetPlayback} from "../../utils/globalActions";

interface ISearchContainerProps {
    onSearch: (query: string) => void,
    loading: boolean,
    results: SearchResponse,
    onSetPlayback: (playback: Playback) => void
}

ReducerRegistry.register(reducerName, reducer);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}

function PlaybackFromIdAndSource(id: string, source: string): Playback {
    return {
        id: id,
        source: source,
    }
}

const SearchContainer: React.FC<ISearchContainerProps> = (props: ISearchContainerProps) => {
    const {onSearch, loading, results, onSetPlayback} = props;
    const classes = SearchStyles();

    const [source, setSource] = useState<string>("all");
    const [query, setQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <Container fixed>
            <Box marginY={4}>
                <Typography variant="h4" className={classes.header}>Search</Typography>
                <Typography variant="subtitle1">Search for Songs among different Players</Typography>
                <Box marginTop={2} marginBottom={1} width="100%" display="flex">
                    <Select value={source} onChange={(e) => setSource(e.target.value as string)}
                            input={<OutlinedInput labelWidth={0} name="age"
                                                  id="outlined-age-simple"/>}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                        <MenuItem value="mpd">MPD</MenuItem>
                    </Select>
                    <Box marginX={2} flexGrow={1}>
                        <OutlinedInput fullWidth startAdornment={<InputAdornment position="start">
                            <SearchIcon className={classes.textSecondary}/>
                        </InputAdornment>} labelWidth={0} value={query} onChange={(e) => setQuery(e.target.value)}
                                       onKeyUp={event => event.keyCode === 13 ? onSearch(query) : null}
                                       placeholder="Search..."/>
                    </Box>
                    <Button variant="contained" onClick={() => onSearch(query)} color="primary">Search</Button>
                </Box>
                {
                    loading ?
                        <Box display="flex" justifyContent="center" marginTop={4}>
                            <CircularProgress variant="indeterminate"/>
                        </Box> : null
                }
                {
                    Object.keys(results).length > 0 ?
                        <div>
                            <Tabs textColor="primary" variant="standard" indicatorColor="primary" value={activeTab}
                                  onChange={(e, v) => setActiveTab(v)}>
                                {
                                    Object.keys(results).map(x => <Tab label={x}/>)
                                }
                            </Tabs>
                            <Divider/>
                            {
                                Object.keys(results).map((x, i) => <TabPanel value={activeTab} index={i}>
                                    <List dense>
                                        {results[x].playbacks.map(playback => <ListItem button onClick={() => onSetPlayback(playback)}>
                                            <ListItemAvatar>
                                                {
                                                    playback.thumbnailUrl !== undefined ?
                                                    <Thumbnail thumbnailUrl={playback.thumbnailUrl}/>
                                                    : null
                                                }
                                            </ListItemAvatar>
                                            <ListItemText primary={playback.title} secondary={playback.author}/>
                                        </ListItem>)}
                                    </List>
                                </TabPanel>)
                            }
                        </div> : null
                }

            </Box>
        </Container>
    );
};

const mapStateToProps = (state: any) => {
    const reducerState: ISearchState = state[reducerName];

    return {
        loading: reducerState.loading,
        results: reducerState.results
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSearch: (query: string) => dispatch(Search(query)),
        onSetPlayback: (playback: Playback) => dispatch(SetPlayback(playback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);


