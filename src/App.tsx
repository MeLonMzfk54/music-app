import { useState, useEffect } from 'react';
import * as playlistTracksMockData from './mockData/playlist-tracks.json';
import * as selectedTrackInfoMockData from './mockData/getSelectedTrack.json';
import TracksList from './components/TracksList.tsx';
import TrackDetails from './components/TrackDetails.tsx';

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
        setSelectedTrackInfo(null); // показываем Loading…

        fetchTrackInfo(track.id).then(setSelectedTrackInfo);
    }

    if (!tracks) return <div><h1>G-Music</h1><p>Loading...</p></div>;
    if (!tracks.length) return <div><h1>G-Music</h1><p>Empty list of songs</p></div>;

    return (
        <>
            <h1>G-Music</h1>
            <div style={{ display: 'flex', gap: '30px' }}>
                <TracksList
                    tracks={tracks}
                    selectedTrackId={selectedTrack?.id || null}
                    onTrackClick={chooseTrack}
                />
                <div style={{ position: 'sticky', top: '10px', maxHeight: '300px' }}>
                    <TrackDetails
                        selectedTrack={selectedTrack}
                        selectedTrackInfo={selectedTrackInfo}
                    />
                </div>
            </div>
        </>
    );
}

export default App;