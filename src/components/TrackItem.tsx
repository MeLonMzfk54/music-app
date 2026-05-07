import * as React from "react";

import type {TrackItemOutput} from "../App.tsx";

type Props = {
    track: TrackItemOutput,
    isSelected: boolean,
    onClickTrack: (track: TrackItemOutput) => void,
}

const TrackItem = React.memo(function TrackItem({ track, isSelected, onClickTrack }: Props) {
    return (
        <li style={{ border: isSelected ? '1px solid orange' : 'none' }}>
            <div
                style={{ overflowX: 'scroll', cursor: 'pointer' }}
                onClick={() => onClickTrack(track)}
            >
                {track.attributes.title}
            </div>
            {track.attributes.attachments[0]?.url && (
                <audio src={track.attributes.attachments[0].url} controls />
            )}
        </li>
    );
});
export default TrackItem;