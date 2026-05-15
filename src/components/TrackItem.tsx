import * as React from "react";
import type {TrackItemOutput} from "../api/api.ts";
import {getTrackCover} from "../utils/trackCover.ts";
import './TrackItem.css';

type Props = {
    track: TrackItemOutput,
    isSelected: boolean,
    isPlaying: boolean,
    onClickTrack: (track: TrackItemOutput) => void,
}

const TrackItem = React.memo(function TrackItem({
    track,
    isSelected,
    isPlaying,
    onClickTrack,
}: Props) {
    const cover = getTrackCover(track);

    return (
        <li
            className={`track-item${isSelected ? ' track-item--active' : ''}${isPlaying ? ' track-item--playing' : ''}`}
        >
            <button
                type="button"
                className="track-item__button"
                onClick={() => onClickTrack(track)}
            >
                <span className="track-item__cover-wrap">
                    {cover ? (
                        <img className="track-item__cover" src={cover} alt="" />
                    ) : (
                        <span className="track-item__cover track-item__cover--placeholder">♪</span>
                    )}
                    {isPlaying && (
                        <span className="track-item__equalizer" aria-hidden>
                            <span /><span /><span />
                        </span>
                    )}
                </span>
                <span className="track-item__info">
                    <span className="track-item__title">{track.attributes.title}</span>
                    {track.attributes.user?.name && (
                        <span className="track-item__artist">{track.attributes.user.name}</span>
                    )}
                </span>
            </button>
        </li>
    );
});

export default TrackItem;
