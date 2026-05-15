import {useEffect, useState} from "react";
import {getTracks, type TrackItemOutput} from "../api/api.ts";

export function useTracks() {
    const [tracks, setTracks] = useState<TrackItemOutput[] | null>(null);

    useEffect(() => {
        getTracks().then(setTracks);
    }, []);

    return { tracks}
}