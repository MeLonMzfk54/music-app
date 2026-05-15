import {useCallback} from "react";
import type {TrackItemOutput} from "../api/api.ts";
import TrackItem from "./TrackItem.tsx";
import './TracksList.css';

type Props = {
    tracks: TrackItemOutput[],
    currentTrackId: string | null,
    isPlaying: boolean,
    onTrackClick: (track: TrackItemOutput) => void,
}

function TracksList({ tracks, currentTrackId, isPlaying, onTrackClick }: Props) {
    const handleTrackClick = useCallback(
        (track: TrackItemOutput) => onTrackClick(track),
        [onTrackClick]
    );

    return (
        <section className="tracks-list">
            <h2 className="tracks-list__heading">Плейлист</h2>
            <p className="tracks-list__count">{tracks.length} треков</p>
            <ul className="tracks-list__items">
                {tracks.map(track => (
                    <TrackItem
                        key={track.id}
                        track={track}
                        isSelected={currentTrackId === track.id}
                        isPlaying={isPlaying && currentTrackId === track.id}
                        onClickTrack={handleTrackClick}
                    />
                ))}
            </ul>
        </section>
    );
}

export default TracksList;
