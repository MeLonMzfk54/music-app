import {useEffect, useState} from "react";
import {getTracks, type TrackItemOutput} from "../api/api.ts";

export function useTracks(): {tracks: TrackItemOutput[] | null} {
    const [tracks, setTracks] = useState<TrackItemOutput[] | null>(null);

    useEffect(() => {
        getTracks().then(setTracks);
    }, []);

    return { tracks }
}