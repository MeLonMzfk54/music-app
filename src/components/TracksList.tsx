import {useCallback} from "react";
import TrackItem from "./TrackItem.tsx";

function TracksList({ tracks, selectedTrackId, onTrackClick }) {
    const handleTrackClick = useCallback(
        (track) => {
            onTrackClick(track);
        },
        [onTrackClick]
    );

    return (
        <ul style={{ maxWidth: '300px' }}>
            {tracks.map(track => (
                <TrackItem
                    key={track.id}
                    track={track}
                    isSelected={selectedTrackId === track.id}
                    onClick={handleTrackClick}
                />
            ))}
        </ul>
    );
}

export default TracksList;