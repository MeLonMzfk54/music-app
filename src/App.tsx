import { useState, useEffect } from 'react';


import TracksList from './components/TracksList.tsx';
import TrackDetails from './components/TrackDetails.tsx';
import {getTrackInfo, getTracks} from "./api/api.ts";
import type {TrackDetailsItemOutput, TrackItemOutput} from "./api/api.ts";


function App() {
    const [selectedTrack, setSelectedTrack] = useState<TrackItemOutput | null>(null);
    const [selectedTrackInfo, setSelectedTrackInfo] = useState<TrackDetailsItemOutput | null>(null);
    const [tracks, setTracks] = useState<TrackItemOutput[] | null>(null);

    useEffect(() => {
        getTracks().then(setTracks);
    }, []);

    function chooseTrack(track: TrackItemOutput) {
        if (selectedTrack?.id === track.id) {
            setSelectedTrack(null);
            setSelectedTrackInfo(null);
            return;
        }

        setSelectedTrack(track);
        setSelectedTrackInfo(null); // показываем Loading…

        getTrackInfo(track.id).then(setSelectedTrackInfo);
    }

    if (!tracks) return <div><h1>G-Music</h1><p>Loading...</p></div>;
    if (!tracks.length) return <div><h1>G-Music</h1><p>Empty list of songs</p></div>;

    return (
        <>
            <h1>G-Music</h1>
            <button>Next</button>
            <div style={{ display: 'flex', gap: '30px' }}>
                <TracksList
                    tracks={tracks}
                    selectedTrackId={selectedTrack?.id ?? null}
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