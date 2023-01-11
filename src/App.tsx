import styles from "./styles/app.module.scss";

import "rc-slider/assets/index.css";
import { Player } from "./components/Player";
import { MediaPlayerProvider } from "./contexts/MediaPlayerContext";

function App() {
  return (
    <MediaPlayerProvider>
      <div className={styles.container}>
        <div className={styles.playersWrapper}>
          <Player />

          <Player side="right_up" />

          <Player side="right_down" hasSlider={false} />
        </div>
      </div>
    </MediaPlayerProvider>
  );
}

export default App;
