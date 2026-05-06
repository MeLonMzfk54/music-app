function TracksList({ tracks, selectedTrackId, onTrackClick }) {
    return (
        <ul style={{ maxWidth: '300px' }}>
            {tracks.map(track => (
                <li
                    key={track.id}
                    style={{ border: track.id === selectedTrackId ? '1px solid orange' : 'none' }}
                >
                    <div
                        style={{ overflowX: 'scroll', cursor: 'pointer' }}
                        onClick={() => onTrackClick(track)}
                    >
                        {track.attributes.title}
                    </div>
                    <audio src={track.attributes.attachments[0].url} controls></audio>
                </li>
            ))}
        </ul>
    );
}

export default TracksList;