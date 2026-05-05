import { useState, useEffect } from 'react';
import * as playlistTracksMockData from '../public/mockData/playlist-tracks.json';
import * as selectedTrackInfoMockData from '../public/mockData/getSelectedTrack.json';

const USE_MOCK = true;

function fetchTracks() {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => resolve(playlistTracksMockData?.data), 1000));
    } else {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: { 'api-key': '37d39d16-0b1a-45be-bc39-dac551910cca' }
        }).then(res => res.json()).then(json => json.data);
    }
}

function fetchTrackInfo(trackId) {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => resolve(selectedTrackInfoMockData), 1000));
    } else {
        return fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${trackId}`, {
            headers: { 'api-key': '37d39d16-0b1a-45be-bc39-dac551910cca' }
        }).then(res => res.json());
    }
}

function App() {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedTrackInfo, setSelectedTrackInfo] = useState(null);
    const [tracks, setTracks] = useState(null);

    useEffect(() => {
        fetchTracks().then(setTracks);
    }, []);

    function chooseTrack(track) {
        if (selectedTrack?.id === track.id) {
            setSelectedTrack(null);
            setSelectedTrackInfo(null);
            return;
        }

        setSelectedTrack(track);
        setSelectedTrackInfo(null); // чтобы показывать Loading…

        fetchTrackInfo(track.id).then(setSelectedTrackInfo);
    }

    if (tracks === null) return <div><h1>G-Music</h1><p>Loading...</p></div>;
    if (!tracks.length) return <div><h1>G-Music</h1><p>Empty list of songs</p></div>;

    return (
        <>
            <h1>G-Music</h1>
            <div style={{ display: 'flex', gap: '30px' }}>
                <ul style={{ maxWidth: '300px' }}>
                    {tracks.map(track => (
                        <li key={track.id} style={{ border: track.id === selectedTrack?.id ? '1px solid orange' : 'none' }}>
                            <div
                                style={{ overflowX: 'scroll', cursor: 'pointer' }}
                                onClick={() => chooseTrack(track)}
                            >
                                {track.attributes.title}
                            </div>
                            <audio src={track.attributes.attachments[0].url} controls></audio>
                        </li>
                    ))}
                </ul>
                <div style={{ position: 'sticky', top: '10px', maxHeight: '300px' }}>
                    <h2>Details</h2>
                    {selectedTrack === null ? 'Track is not selected'
                        : selectedTrackInfo === null ? 'Loading...'
                            : (
                                <div>
                                    <h3>{selectedTrackInfo.attributes.title}</h3>
                                    <h4>Lyrics</h4>
                                    <p>{selectedTrackInfo.attributes.lyrics || 'no lyrics'}</p>
                                </div>
                            )}
                </div>
            </div>
        </>
    );
}

export default App;