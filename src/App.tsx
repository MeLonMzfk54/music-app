import {useState, useEffect} from 'react'
import * as playlistTracksMockData from '../public/mockData/playlist-tracks.json';
import * as selectedTrackInfoMockData from '../public/mockData/getSelectedTrack.json'

function App() {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [selectedTrackInfo, setSelectedTrackInfo] = useState(null);
    const [tracks, setTracks] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        // fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
        //     headers: {
        //         'api-key': '37d39d16-0b1a-45be-bc39-dac551910cca',
        //     }
        // })
        //     .then(res => res.json())
        //     .then(json => setTracks(json));

        new Promise(resolve => setTimeout(() => {
            resolve(playlistTracksMockData);
        }, 1000))
            .then(res => setTracks(res?.data));
    }, [])

    function chooseTrack(track) {
        console.log('trackId - ', track);
        if (selectedTrack?.id === track.id) {
            setSelectedTrack(null);
            setSelectedTrackInfo(null);
            return;
        }
        setSelectedTrack(track);

        new Promise(resolve => setTimeout(() => {
            resolve(selectedTrackInfoMockData);
        }, 1000))
            .then(res => setSelectedTrackInfo(res));

        // fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${track.id}`, {
        //     headers: {
        //         'api-key': '37d39d16-0b1a-45be-bc39-dac551910cca',
        //     }
        // })
        //     .then(res => res.json())
        //     .then(json => setSelectedTrackInfo(json));
    }



    if (tracks === null) {
        return <div>
            <h1>G-Music</h1>
            <p>Loading...</p>
        </div>
    }
    if (!tracks.length) {
        return <div>
            <h1>G-Music</h1>
            <p>Empty list of songs</p>
        </div>
    }

    return (
        <>
            <h1>G-Music</h1>
            <div style={{ display: 'flex', gap: '30px'}}>
                <ul style={{maxWidth: '300px'}}>
                    {tracks.map((track) => (
                        <li key={track.id} style={{border: track.id === selectedTrack?.id ? '1px solid orange' : 'none'}}>
                            <div style={{overflowX: 'scroll'}} onClick={() => chooseTrack(track)}>{track.attributes.title}</div>
                            <audio src={track.attributes.attachments[0].url} controls></audio>
                        </li>
                    ))}
                </ul>
                <div style={{position: 'sticky', top: '10px', maxHeight: '300px'}}>
                    <h2>Details</h2>
                    {selectedTrack === null ? 'Track is not selected' : (
                        <div>
                            <h3>{selectedTrackInfo?.attributes.title}</h3>
                            <h4>Lyrics</h4>
                            <p>{selectedTrackInfo?.attributes.lyrics ? selectedTrackInfo?.attributes.lyrics : 'no lyrics'}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default App;