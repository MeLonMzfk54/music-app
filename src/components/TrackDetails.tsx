function TrackDetails({ selectedTrack, selectedTrackInfo }) {
    if (!selectedTrack) return <div>Track is not selected</div>;
    if (!selectedTrackInfo) return <div>Loading...</div>;

    return (
        <>
            <h2>Track Details</h2>
            <div>
                <h3>{selectedTrackInfo.attributes.title}</h3>
                <h4>Lyrics</h4>
                <p>{selectedTrackInfo.attributes.lyrics || 'no lyrics'}</p>
            </div>
        </>
    );
}

export default TrackDetails;