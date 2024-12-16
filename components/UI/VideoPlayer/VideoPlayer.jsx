'use client'
import { useState } from 'react';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({ caption, preview, videoPath, newsVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section className={`${styles.videoContainer} ${newsVideo ? styles.newsVideoContainer : ''}`}>
   
      {!isPlaying ? (
        <div className={styles.previewContainer}>
          <div className={styles.previewImageContainer}>
            <img
              src={preview}
              alt="Video Preview"
              className={styles.previewImage}
            />
            <button className={styles.playButton} onClick={handlePlayVideo}>
              <span className={styles.playIcon}>▶</span>
            </button>
          </div>
          <p className={styles.caption}>
            {caption}
          </p>
        </div>
      ) : (
        <div className={styles.videoFrame}>
          <video controls autoPlay>
            <source src={videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
};

export default VideoPlayer;
