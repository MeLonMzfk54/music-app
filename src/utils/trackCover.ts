import type {TrackDetailsItemOutput, TrackItemOutput} from "../api/api.ts";

export function getTrackCover(
    track: TrackItemOutput | null,
    trackInfo?: TrackDetailsItemOutput | null
): string | null {
    const fromList = track?.attributes.images?.main?.find(
        img => img.type === 'medium' || img.type === 'thumbnail'
    )?.url ?? track?.attributes.images?.main?.[0]?.url;

    if (fromList) return fromList;

    const fromDetails = (trackInfo as { attributes?: { images?: { main?: { url: string }[] } } })?.attributes?.images?.main?.find(
        img => (img as { type?: string }).type === 'medium'
    )?.url;

    return fromDetails ?? null;
}
