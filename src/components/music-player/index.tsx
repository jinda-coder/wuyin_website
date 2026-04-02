import "./index.scss"
import { useEffect, useRef, useState } from "react";
import { lyrics, musicInfo } from "./lyrics";
import musicSrc from "./心做し.mp3";


export const MusicPlayer: React.FC = () => {
    const [musicState, setMusicState] = useState("paused");
    const [lyricsIndex, setLyricsIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playingIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-5">
        <path d="M4.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1ZM10.5 2a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-1Z" />
    </svg>;

    const pausedIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
    </svg>;

    useEffect(() => {
        const audio = new Audio(musicSrc);
        audioRef.current = audio;

        const handlePlay = () => setMusicState("playing");
        const handlePause = () => setMusicState("paused");
        const handleEnded = () => {
            setMusicState("paused");
            setLyricsIndex(0);
        };
        const handleTimeUpdate = () => {
            const currentTime = audio.currentTime;
            let nextLyricIndex = 0;

            for (let index = 0; index < lyrics.length; index += 1) {
                if (lyrics[index].time <= currentTime) {
                    nextLyricIndex = index;
                    continue;
                }

                break;
            }

            setLyricsIndex(nextLyricIndex);
        };

        audio.addEventListener("play", handlePlay);
        audio.addEventListener("pause", handlePause);
        audio.addEventListener("ended", handleEnded);
        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audio.pause();
            audio.removeEventListener("play", handlePlay);
            audio.removeEventListener("pause", handlePause);
            audio.removeEventListener("ended", handleEnded);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audioRef.current = null;
        };
    }, []);

    async function handleToggleMusic() {
        const audio = audioRef.current;
        if (!audio) {
            console.error("音频元素未找到");
            return;
        }

        if (musicState === "playing") {
            audio.pause();
            return;
        }

        try {
            await audio.play();
        } catch (error) {
        }
    }
    return (
        <div className={`music-player ${musicState === "playing" ? "is-playing" : ""}`}>
            <button type="button" className="btn" onClick={handleToggleMusic}>
                {musicState === "playing" ? playingIcon : pausedIcon}
            </button>
            {/* 歌曲 */}
            <div className="music-info">
                {/* 歌曲信息 */}
                <p className="music-meta">{musicInfo.name} - {musicInfo.artist}</p>
                {/* 歌词滚动组件 */}
                {/* <p className="lyrics">{lyrics[lyricsIndex]?.text || "无歌词"}</p> */}
                <div className="lyrics-window">
                    <div
                        className="lyrics-track"
                        style={{ transform: `translateY(-${lyricsIndex * 20}px)` }}
                    >
                        {lyrics.map((lyric, index) => (
                            <p key={index} className="lyrics-line">{lyric.text}</p>
                        ))}
                    </div>
                </div>
            </div>
            {/* 律动效果 */}
            <div className="effect" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="bar" />
                ))}
            </div>
        </div>
    )
}