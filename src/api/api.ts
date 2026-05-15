import * as playlistTracksMockData from "../mockData/playlist-tracks.json";

const USE_MOCK = true;
const MOCK_REQUEST_DELAY_MS = 400;
const API_KEY = '37d39d16-0b1a-45be-bc39-dac551910cca';

type AttachmentDTO = {
    url: string,
}

type TrackImageDTO = {
    type: string,
    url: string,
    width?: number,
    height?: number,
}

type TrackItemOutputAttributes = {
    title: string,
    attachments: AttachmentDTO[],
    images?: {
        main?: TrackImageDTO[],
    },
    user?: {
        name: string,
    },
}

export type TrackDetailsItemOutput = {
    id: string,
    attributes: {
        title: string,
        lyrics: string | null,
        images?: TrackItemOutputAttributes['images'],
        user?: TrackItemOutputAttributes['user'],
    }
}

type PlaylistTrackDTO = TrackItemOutput & {
    attributes: TrackItemOutputAttributes & {
        lyrics?: string | null,
    },
}

function buildMockLyrics(track: PlaylistTrackDTO): string {
    const { title, user } = track.attributes;
    const artist = user?.name ?? 'Неизвестный исполнитель';

    if (track.attributes.lyrics?.trim()) {
        return track.attributes.lyrics.trim();
    }

    return [
        title,
        `Исполнитель: ${artist}`,
        '',
        '— демо-текст для мок-режима —',
        '',
        `Сейчас играет: «${title}»`,
    ].join('\n');
}

function buildMockTrackDetails(track: PlaylistTrackDTO): TrackDetailsItemOutput {
    return {
        id: track.id,
        attributes: {
            title: track.attributes.title,
            lyrics: buildMockLyrics(track),
            images: track.attributes.images,
            user: track.attributes.user,
        },
    };
}

function findMockTrack(trackId: string): PlaylistTrackDTO | undefined {
    return playlistTracksMockData.data.find(t => t.id === trackId) as PlaylistTrackDTO | undefined;
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
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const track = findMockTrack(trackId);
                if (!track) {
                    reject(new Error(`Mock track not found: ${trackId}`));
                    return;
                }
                resolve(buildMockTrackDetails(track));
            }, MOCK_REQUEST_DELAY_MS);
        });
    } else {
        return fetch(`https://musicfun.it-incubator.app/api/1.0/playlists/tracks/${trackId}`, {
            headers: { 'api-key': API_KEY }
        })
            .then(res => res.json())
            .then(json => json.data);
    }
}