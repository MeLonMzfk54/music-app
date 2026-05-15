
import {useTracks} from "./bll/useTracks.tsx";
import {useTrackSelection} from "./bll/useTrackSelection.tsx";

import TracksList from './components/TracksList.tsx';
import TrackDetails from './components/TrackDetails.tsx';


function App() {

    const {tracks} = useTracks();

    const {selectedTrack, selectedTrackInfo, chooseTrack} = useTrackSelection();


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