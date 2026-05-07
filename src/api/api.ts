import * as playlistTracksMockData from "../mockData/playlist-tracks.json";
import * as selectedTrackInfoMockData from "../mockData/getSelectedTrack.json";

const USE_MOCK = true;
const API_KEY = '37d39d16-0b1a-45be-bc39-dac551910cca';

type AttachmentDTO = {
    url: string,
}

type TrackItemOutputAttributes = {
    title: string,
    attachments: AttachmentDTO[],
}

export type TrackDetailsItemOutput = {
    id: string,
    attributes: {
        title: string,
        lyrics: string | null,
    }
}

export type TrackItemOutput = {
    id: string,
    attributes: TrackItemOutputAttributes,
}

export const getTracks = async (): Promise<TrackItemOutput[]> => {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => resolve(playlistTracksMockData?.data), 1000));
    } else {
        return fetch('https://musicfun.it-incubator.app/api/1.0/playlists/tracks', {
            headers: { 'api-key': API_KEY }
        })
            .then(res => res.json())
            .then(json => json.data);
    }
}

export const getTrackInfo = async (trackId: string): Promise<TrackDetailsItemOutput> => {
    if (USE_MOCK) {
        return new Promise(resolve => setTimeout(() => resolve(selectedTrackInfoMockData), 1000));
    } else {
        return fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${trackId}`, {
            headers: { 'api-key': API_KEY }
        })
            .then(res => res.json())
            .then(json => json.data);
    }
}