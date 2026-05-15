import type {CSSProperties, RefObject} from "react";
import type {TrackItemOutput} from "../api/api.ts";
import {formatTime} from "../utils/formatTime.ts";
import {getTrackCover} from "../utils/trackCover.ts";
import './Player.css';

type Props = {
    audioRef: RefObject<HTMLAudioElement | null>,
    currentTrack: TrackItemOutput | null,
    isPlaying: boolean,
    currentTime: number,
    duration: number,
    volume: number,
    onTogglePlay: () => void,
    onPrevious: () => void,
    onNext: () => void,
    onSeek: (time: number) => void,
    onVolumeChange: (volume: number) => void,
}

function Player({
    audioRef,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    onTogglePlay,
    onPrevious,
    onNext,
    onSeek,
    onVolumeChange,
}: Props) {
    const cover = getTrackCover(currentTrack);
    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
    const seekStyle = { '--progress': `${progress}%` } as CSSProperties;

    return (
        <footer className="player">
            <audio ref={audioRef} preload="metadata" />

            <div className="player__track">
                <div className="player__cover-wrap">
                    {cover ? (
                        <img className="player__cover" src={cover} alt="" />
                    ) : (
                        <div className="player__cover player__cover--placeholder" aria-hidden>
                            ♪
                        </div>
                    )}
                </div>
                <div className="player__meta">
                    <p className="player__title">
                        {currentTrack?.attributes.title ?? 'Выберите трек'}
                    </p>
                    <p className="player__artist">
                        {currentTrack?.attributes.user?.name ?? 'G-Music'}
                    </p>
                </div>
            </div>

            <div className="player__controls">
                <div className="player__buttons">
                    <button
                        type="button"
                        className="player__btn"
                        onClick={onPrevious}
                        disabled={!currentTrack}
                        aria-label="Предыдущий трек"
                    >
                        <SkipBackIcon />
                    </button>
                    <button
                        type="button"
                        className="player__btn player__btn--play"
                        onClick={onTogglePlay}
                        disabled={!currentTrack}
                        aria-label={isPlaying ? 'Пауза' : 'Воспроизведение'}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button
                        type="button"
                        className="player__btn"
                        onClick={onNext}
                        disabled={!currentTrack}
                        aria-label="Следующий трек"
                    >
                        <SkipForwardIcon />
                    </button>
                </div>

                <div className="player__progress">
                    <span className="player__time">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        className="player__seek"
                        min={0}
                        max={duration || 100}
                        step={0.1}
                        value={currentTime}
                        disabled={!currentTrack}
                        onChange={e => onSeek(Number(e.target.value))}
                        style={seekStyle}
                    />
                    <span className="player__time">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="player__volume">
                <VolumeIcon />
                <input
                    type="range"
                    className="player__volume-slider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={e => onVolumeChange(Number(e.target.value))}
                    aria-label="Громкость"
                />
            </div>
        </footer>
    );
}

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
        </svg>
    );
}

function PauseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
        </svg>
    );
}

function SkipBackIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
        </svg>
    );
}

function SkipForwardIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M16 6h2v12h-2V6zM6 6l8.5 6L6 18V6z" />
        </svg>
    );
}

function VolumeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" width={20} height={20} aria-hidden>
            <path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
    );
}

export default Player;
