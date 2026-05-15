import {useState} from "react";
import {getTrackInfo, type TrackDetailsItemOutput, type TrackItemOutput} from "../api/api.ts";

export function useTrackSelection() {
    const [selectedTrack, setSelectedTrack] = useState<TrackItemOutput | null>(null);
    const [selectedTrackInfo, setSelectedTrackInfo] = useState<TrackDetailsItemOutput | null>(null);

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

    return {
        selectedTrack,
        selectedTrackInfo,
        chooseTrack
    };
}