import type {TrackDetailsItemOutput, TrackItemOutput} from "../api/api.ts";
import {getTrackCover} from "../utils/trackCover.ts";
import './TrackDetails.css';

type Props = {
    currentTrack: TrackItemOutput | null,
    trackInfo: TrackDetailsItemOutput | null,
}

function TrackDetails({ currentTrack, trackInfo }: Props) {
    if (!currentTrack) {
        return (
            <aside className="track-details track-details--empty">
                <div className="track-details__placeholder">
                    <span className="track-details__icon">♪</span>
                    <p>Выберите трек из списка</p>
                </div>
            </aside>
        );
    }

    const cover = getTrackCover(currentTrack, trackInfo);
    const title = trackInfo?.attributes?.title ?? currentTrack.attributes.title;
    const lyrics = trackInfo?.attributes?.lyrics;

    return (
        <aside className="track-details">
            <div className="track-details__hero">
                {cover ? (
                    <img className="track-details__cover" src={cover} alt="" />
                ) : (
                    <div className="track-details__cover track-details__cover--placeholder">♪</div>
                )}
            </div>
            <h2 className="track-details__title">{title}</h2>
            {(trackInfo?.attributes.user?.name ?? currentTrack.attributes.user?.name) && (
                <p className="track-details__artist">
                    {trackInfo?.attributes.user?.name ?? currentTrack.attributes.user?.name}
                </p>
            )}

            <div className="track-details__lyrics">
                <h3 className="track-details__lyrics-heading">Текст песни</h3>
                {!trackInfo ? (
                    <p className="track-details__loading">Загрузка…</p>
                ) : lyrics ? (
                    <pre className="track-details__lyrics-text">{lyrics}</pre>
                ) : (
                    <p className="track-details__no-lyrics">Текст недоступен</p>
                )}
            </div>
        </aside>
    );
}

export default TrackDetails;
