import {useState, useEffect} from 'react'
import * as playlistTracksMockData from '../public/mockData/playlist-tracks.json';

function App() {
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [tracks, setTracks] = useState(null);

    useEffect(() => {
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
            <div style={{ display: 'flex' }}>
                <ul>
                    {tracks.map((track) => (
                        <li key={track.id} style={{border: track.id === selectedTrack ? '1px solid orange' : 'none'}}>
                            <div onClick={() => {
                              return track.id === selectedTrack ? setSelectedTrack(null) : setSelectedTrack(track.id)
                            }}>{track.attributes.title}</div>
                            <audio src={track.attributes.attachments[0].url} controls></audio>
                        </li>
                    ))}
                </ul>
                <div>
                    <h3>Details</h3>
                    {selectedTrack === null ? 'Track is not selected' : ''}
                </div>
            </div>
        </>
    )
}

export default App;