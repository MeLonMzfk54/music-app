import {useCallback} from "react";
import type {TrackItemOutput} from "../api/api.ts";
import TrackItem from "./TrackItem.tsx";

type Props = {
    tracks: TrackItemOutput[],
    selectedTrackId: string | null,
    onTrackClick: (track: TrackItemOutput) => void,
}

function TracksList({ tracks, selectedTrackId, onTrackClick }: Props) {
    const handleTrackClick = useCallback(
        (track: TrackItemOutput) => {
            onTrackClick(track);
        },
        [onTrackClick]
    );

    return (
        <ul style={{ maxWidth: '300px' }}>
            {tracks.map((track: TrackItemOutput) => (
                <TrackItem
                    key={track.id}
                    track={track}
                    isSelected={selectedTrackId === track.id}
                    onClickTrack={handleTrackClick}
                />
            ))}
        </ul>
    );
}

export default TracksList;