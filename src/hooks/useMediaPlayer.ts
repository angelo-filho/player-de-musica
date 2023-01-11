import { useContext } from "react";
import { MediaPlayerContext } from "../contexts/MediaPlayerContext";

export function useMediaPlayer() {
  const mediaPlayerContext = useContext(MediaPlayerContext);

  return mediaPlayerContext;
}
