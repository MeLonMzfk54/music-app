import {useTracks} from "./bll/useTracks.tsx";
import {useMusicPlayer} from "./bll/useMusicPlayer.tsx";
import TracksList from './components/TracksList.tsx';
import TrackDetails from './components/TrackDetails.tsx';
import Player from './components/Player.tsx';
import './App.css';

function App() {
    const { tracks } = useTracks();
    const player = useMusicPlayer(tracks);

    if (!tracks) {
        return (
            <div className="app app--loading">
                <div className="loader" />
                <p>Загрузка плейлиста…</p>
            </div>
        );
    }

    if (!tracks.length) {
        return (
            <div className="app app--empty">
                <h1>G-Music</h1>
                <p>Плейлист пуст</p>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app__header">
                <h1 className="app__logo">
                    <span className="app__logo-accent">G</span>-Music
                </h1>
                <p className="app__tagline">Слушайте и управляйте плейлистом</p>
            </header>

            <main className="app__main">
                <TracksList
                    tracks={tracks}
                    currentTrackId={player.currentTrack?.id ?? null}
                    isPlaying={player.isPlaying}
                    onTrackClick={player.playTrack}
                />
                <TrackDetails
                    currentTrack={player.currentTrack}
                    trackInfo={player.trackInfo}
                />
            </main>

            <Player
                audioRef={player.audioRef}
                currentTrack={player.currentTrack}
                isPlaying={player.isPlaying}
                currentTime={player.currentTime}
                duration={player.duration}
                volume={player.volume}
                onTogglePlay={player.togglePlay}
                onPrevious={player.playPrevious}
                onNext={player.playNext}
                onSeek={player.seek}
                onVolumeChange={player.changeVolume}
            />
        </div>
    );
}

export default App;
