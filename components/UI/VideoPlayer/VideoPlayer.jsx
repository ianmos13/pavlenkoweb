'use client'
import { useState, useRef, useEffect } from 'react';
import styles from './VideoPlayer.module.scss';

const VideoPlayer = ({ caption, preview, videoPath, newsVideo }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      // Запускаем воспроизведение видео через реф
      videoRef.current.play();
    }
  }, [isPlaying]);

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
          <video
            ref={videoRef}
            
            playsInline
            webkit-playsinline="true"
            autoPlay
            muted
            controls
          >
            <source src={videoPath} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
};

export default VideoPlayer;
