import backButton from "../../assets/left-button.svg";
import playButton from "../../assets/play.svg";
import pauseButton from "../../assets/pause.svg";
import nextButton from "../../assets/right-button.svg";
import flowerImg from "../../assets/flower.png";

import { useMediaPlayer } from "../../hooks/useMediaPlayer";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import styles from "./styles.module.scss";

const classNames = {
  left: styles.leftPlayer,
  right_up: styles.rightPlayerUp,
  right_down: styles.rightPlayerDown,
};

interface PlayerProps {
  side?: "left" | "right_up" | "right_down";
  hasSlider?: boolean;
}

export function Player({ side = "left", hasSlider = true }: PlayerProps) {
  const {
    songProgress,
    isPlaying,
    maxDuration,
    remainingDuration,
    currentTime,
    song,
    setSongProgress,
    handleToggleSong,
    setSongCurrentTime,
    playSong,
    pauseSong,
    previewSong,
    nextSong,
  } = useMediaPlayer();

  const remainingDurationFormatted =
    String(Math.floor(remainingDuration / 60)).padStart(2, "0") +
    ":" +
    String(Math.floor(remainingDuration % 60)).padStart(2, "0");

  const currentTimeFormatted =
    String(Math.floor(currentTime / 60)).padStart(2, "0") +
    ":" +
    String(Math.floor(currentTime % 60)).padStart(2, "0");

  return (
    <div className={classNames[side]}>
      {side === "left" ? (
        <>
          <img src={song.image} />

          <div className={styles.infos}>
            <strong>{song.name}</strong>
            <span>{song.artist}</span>
          </div>
        </>
      ) : (
        <div className={styles.imageAndInfos}>
          <img src={song.image} />

          <div className={styles.infos}>
            <strong>{song.name}</strong>
            <span>{song.artist}</span>
          </div>
        </div>
      )}

      <div className={styles.buttons}>
        <button onClick={previewSong}>
          <img src={backButton} />
        </button>
        <button className={styles.playPause}>
          <img
            src={isPlaying ? pauseButton : playButton}
            onClick={handleToggleSong}
          />
        </button>
        <button onClick={nextSong}>
          <img src={nextButton} />
        </button>
      </div>

      {hasSlider && (
        <div className={styles.timer}>
          <Slider
            railStyle={{ backgroundColor: "var(--gray-300)", opacity: 0.7 }}
            trackStyle={{ backgroundColor: "var(--gray-300)" }}
            handleStyle={{
              border: "none",
              opacity: 1,
            }}
            onChange={(value) => {
              pauseSong();
              setSongCurrentTime(Number(value));
              setSongProgress(Number(value));
            }}
            onAfterChange={() => {
              if (isPlaying) {
                playSong();
              }
            }}
            min={0}
            max={maxDuration}
            value={songProgress}
          />

          <div className={styles.times}>
            <span>{currentTimeFormatted}</span>
            <span>{remainingDurationFormatted}</span>
          </div>
        </div>
      )}
    </div>
  );
}
