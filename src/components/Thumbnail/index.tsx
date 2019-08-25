import * as React from "react";
import {Box} from "@material-ui/core";
import {Playback} from "../../models/Playback.model";

interface IThumbnailProps {
    thumbnailUrl: string
}

const Thumbnail: React.FC<IThumbnailProps> = (props: IThumbnailProps) => {
    const {thumbnailUrl} = props;

    return (
        <Box margin={2} borderRadius={8} overflow="hidden">
            <div style={{
                backgroundImage: "url(" + thumbnailUrl + ")",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                height: 52,
                width: 52
            }}/>
        </Box>
    );
};

export default Thumbnail;