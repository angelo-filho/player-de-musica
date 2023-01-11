import {
  createContext,
  ReactNode,
  SyntheticEvent,
  useRef,
  useState,
} from "react";

import music from "../assets/songs/namora_eu_ai.mp3";
import { playlist } from "../data/playlist";

interface Song {
  name: string;
  artist: string;
  src: string;
  image: string;
}

interface MediaPlayerContextItems {
  songProgress: number;
  isPlaying: boolean;
  maxDuration: number;
  remainingDuration: number;
  currentTime: number;
  song: Song;
  setSongProgress: (value: number) => void;
  handleToggleSong: () => void;
  setSongCurrentTime: (value: number) => void;
  playSong: () => void;
  pauseSong: () => void;
  previewSong: () => void;
  nextSong: () => void;
}

interface MediaPlayerProviderProps {
  children: ReactNode;
}

export const MediaPlayerContext = createContext({} as MediaPlayerContextItems);

export function MediaPlayerProvider({ children }: MediaPlayerProviderProps) {
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);
  const [songProgress, setSongProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const songAmount = playlist.length;

  const song = playlist[currentMusicIndex];

  const maxDuration = audioRef.current ? audioRef.current.duration : 0;

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;

  const remainingDuration = maxDuration ? maxDuration - currentTime : 0;

  function handleUpdateSongProgress(
    e: SyntheticEvent<HTMLAudioElement, Event>
  ) {
    setSongProgress(e.currentTarget.currentTime);
  }

  function handleToggleSong() {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }

    setIsPlaying(!isPlaying);
  }

  function setSongCurrentTime(value: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  }

  function previewSong() {
    if (audioRef.current) {
      const newSongAmount =
        currentMusicIndex - 1 < 0 ? songAmount - 1 : currentMusicIndex - 1;

      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      audioRef.current.src = playlist[newSongAmount].src;
      setCurrentMusicIndex(newSongAmount);
      setIsPlaying(false);
    }
  }

  function nextSong() {
    if (audioRef.current) {
      const nextSongIndex = (currentMusicIndex + 1) % songAmount;

      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      audioRef.current.src = playlist[nextSongIndex].src;

      setCurrentMusicIndex(nextSongIndex);
      setIsPlaying(false);
    }
  }

  function playSong() {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  function pauseSong() {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }

  return (
    <MediaPlayerContext.Provider
      value={{
        songProgress,
        isPlaying,
        maxDuration,
        remainingDuration,
        currentTime,
        song,
        setSongProgress,
        setSongCurrentTime,
        handleToggleSong,
        pauseSong,
        playSong,
        previewSong,
        nextSong,
      }}
    >
      <audio
        src={song.src}
        ref={audioRef}
        onTimeUpdate={handleUpdateSongProgress}
        onEnded={() => setIsPlaying(false)}
      ></audio>
      {children}
    </MediaPlayerContext.Provider>
  );
}
