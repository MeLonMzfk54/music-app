import * as React from "react";

const TrackItem = React.memo(function TrackItem({ track, isSelected, onClick }) {
    return (
        <li style={{ border: isSelected ? '1px solid orange' : 'none' }}>
            <div
                style={{ overflowX: 'scroll', cursor: 'pointer' }}
                onClick={() => onClick(track)}
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