import React, {useState} from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ISearchState} from "./state";
import {Search} from "./actions";
import SearchIcon from '@material-ui/icons/SearchRounded';
import ReducerRegistry from "../../utils/reducerRegistry";
import reducer, {reducerName} from "./reducer";
import {
    Box,
    Button, CircularProgress,
    Container, Divider,
    InputAdornment, List,
    MenuItem,
    OutlinedInput,
    Select, Tab, Table, TableBody, TableCell, TableHead, TableRow, Tabs,
    Typography
} from "@material-ui/core";
import {SearchStyles} from "./styles";
import {SearchResponse} from "../../models/SearchResponse.model";
import {Playback} from "../../models/Playback.model";
import {QueueNext, SetPlayback} from "../../utils/globalActions";
import SearchItem from "../../components/SearchItem";
import SearchResultTable from "../../components/SearchResultTable";

interface ISearchContainerProps {
    onSearch: (query: string) => void,
    loading: boolean,
    results: SearchResponse,
    onSetPlayback: (playback: Playback) => void,
    onQueueNext: (playback: Playback) => void,
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

const SearchContainer: React.FC<ISearchContainerProps> = (props: ISearchContainerProps) => {
    const {onSearch, loading, results, onSetPlayback, onQueueNext} = props;
    const classes = SearchStyles();

    const [source, setSource] = useState<string>("all");
    const [query, setQuery] = useState<string>("");
    const [activeTab, setActiveTab] = useState<number>(0);

    function _setSource(e: any, children: React.ReactNode) {
        setSource(e.target.value);
    }

    function _setQuery(e: any) {
        setQuery(e.target.value);
    }

    return (
        <Container fixed>
            <Box marginY={4}>
                <Typography variant="h4" className={classes.header}>Search</Typography>
                <Typography variant="subtitle1">Search for Songs among different Players</Typography>
                <Box marginTop={2} marginBottom={1} width="100%" display="flex">
                    <Select value={source} onChange={_setSource}
                            input={<OutlinedInput labelWidth={0} name="age"
                                                  id="outlined-age-simple"/>}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="youtube">Youtube</MenuItem>
                        <MenuItem value="mpd">MPD</MenuItem>
                    </Select>
                    <Box marginX={2} flexGrow={1}>
                        <OutlinedInput fullWidth startAdornment={<InputAdornment position="start">
                            <SearchIcon className={classes.textSecondary}/>
                        </InputAdornment>} labelWidth={0} value={query} onChange={_setQuery}
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
                                    Object.keys(results).map((x: string, i: number) => <Tab key={i} label={x}/>)
                                }
                            </Tabs>
                            <Divider/>
                            {
                                Object.keys(results).map((x: string, i: number) => <TabPanel key={i} value={activeTab}
                                                                                             index={i}>
                                    <SearchResultTable results={results[x]} onQueueNext={onQueueNext} onSetPlayback={onSetPlayback}/>
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
        onSetPlayback: (playback: Playback) => dispatch(SetPlayback(playback)),
        onQueueNext: (playback: Playback) => dispatch(QueueNext(playback))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);


