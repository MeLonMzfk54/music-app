import {useCallback, useEffect, useRef, useState} from "react";
import {getTrackInfo, type TrackDetailsItemOutput, type TrackItemOutput} from "../api/api.ts";

function getTrackUrl(track: TrackItemOutput): string | null {
    return track.attributes.attachments[0]?.url ?? null;
}

let currentVolume = 0.75;

if (localStorage.getItem('currentVolume')) {
    currentVolume = Number(localStorage.getItem("currentVolume"));
}

export function useMusicPlayer(tracks: TrackItemOutput[] | null) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const activeTrackIdRef = useRef<string | null>(null);
    const [currentTrack, setCurrentTrack] = useState<TrackItemOutput | null>(null);
    const [trackInfo, setTrackInfo] = useState<TrackDetailsItemOutput | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState<number>(currentVolume);

    const findIndex = useCallback(
        (trackId: string) => tracks?.findIndex(t => t.id === trackId) ?? -1,
        [tracks]
    );

    const loadAndPlay = useCallback(async (track: TrackItemOutput) => {
        const audio = audioRef.current;
        const url = getTrackUrl(track);
        if (!audio || !url) return;

        activeTrackIdRef.current = track.id;
        setCurrentTrack(track);
        setTrackInfo(null);
        setCurrentTime(0);
        setDuration(0);

        getTrackInfo(track.id)
            .then(info => {
                if (activeTrackIdRef.current === track.id) {
                    setTrackInfo(info);
                }
            })
            .catch(() => {
                if (activeTrackIdRef.current === track.id) {
                    setTrackInfo(null);
                }
            });

        audio.src = url;
        audio.load();
        try {
            await audio.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    }, []);

    const playTrack = useCallback(
        (track: TrackItemOutput) => {
            if (currentTrack?.id === track.id) {
                const audio = audioRef.current;
                if (!audio) return;
                if (isPlaying) {
                    audio.pause();
                    setIsPlaying(false);
                } else {
                    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
                }
                return;
            }
            void loadAndPlay(track);
        },
        [currentTrack, isPlaying, loadAndPlay]
    );

    const playAtIndex = useCallback(
        (index: number) => {
            if (!tracks?.length) return;
            const normalized = ((index % tracks.length) + tracks.length) % tracks.length;
            void loadAndPlay(tracks[normalized]);
        },
        [tracks, loadAndPlay]
    );

    const playNext = useCallback(() => {
        if (!tracks?.length) return;
        if (!currentTrack) {
            playAtIndex(0);
            return;
        }
        const idx = findIndex(currentTrack.id);
        playAtIndex(idx < 0 ? 0 : idx + 1);
    }, [tracks, currentTrack, findIndex, playAtIndex]);

    const playPrevious = useCallback(() => {
        if (!tracks?.length || !currentTrack) return;
        const audio = audioRef.current;
        if (audio && audio.currentTime > 3) {
            audio.currentTime = 0;
            setCurrentTime(0);
            return;
        }
        const idx = findIndex(currentTrack.id);
        playAtIndex(idx <= 0 ? tracks.length - 1 : idx - 1);
    }, [tracks, currentTrack, findIndex, playAtIndex]);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
        }
    }, [currentTrack, isPlaying]);

    const seek = useCallback((time: number) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = time;
        setCurrentTime(time);
    }, []);

    const changeVolume = useCallback((value: number) => {
        const clamped = Math.min(1, Math.max(0, value));
        setVolume(clamped);
        localStorage.setItem('currentVolume', String(clamped));
        if (audioRef.current) {
            audioRef.current.volume = clamped;
        }
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;

        const onTimeUpdate = () => setCurrentTime(audio.currentTime);
        const onDurationChange = () => setDuration(audio.duration || 0);
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => playNext();

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('durationchange', onDurationChange);
        audio.addEventListener('loadedmetadata', onDurationChange);
        audio.addEventListener('play', onPlay);
        audio.addEventListener('pause', onPause);
        audio.addEventListener('ended', onEnded);

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('durationchange', onDurationChange);
            audio.removeEventListener('loadedmetadata', onDurationChange);
            audio.removeEventListener('play', onPlay);
            audio.removeEventListener('pause', onPause);
            audio.removeEventListener('ended', onEnded);
        };
    }, [volume, playNext]);

    return {
        audioRef,
        currentTrack,
        trackInfo,
        isPlaying,
        currentTime,
        duration,
        volume,
        playTrack,
        playNext,
        playPrevious,
        togglePlay,
        seek,
        changeVolume,
    };
}
