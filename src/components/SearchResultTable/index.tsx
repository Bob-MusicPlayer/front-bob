import React from "react";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Playback} from "../../models/Playback.model";
import SearchItem from "../SearchItem";
import {SearchPlayer} from "../../models/SearchResponse.model";

interface ISearchResultTable {
    results: SearchPlayer,
    onQueueNext: (playback: Playback) => void,
    onSetPlayback: (playback: Playback) => void,
}

const SearchResultTable: React.FC<ISearchResultTable> = (props: ISearchResultTable) => {
    const {results, onQueueNext, onSetPlayback} = props;

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell/>
                    <TableCell/>
                    <TableCell padding={"none"}/>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Author</TableCell>
                    <TableCell align="left">Duration</TableCell>
                    <TableCell/>
                </TableRow>
            </TableHead>
            <TableBody>
                {results.playbacks.map((playback: Playback) => <SearchItem
                    key={playback.title} playback={playback} onQueueNext={() => onQueueNext(playback)} onSetPlayback={onSetPlayback}/>)
                }
                {
                    console.log("lololol")
                }
            </TableBody>
        </Table>
    );
};

export default React.memo(SearchResultTable);