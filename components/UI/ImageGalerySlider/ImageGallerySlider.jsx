import React, { useState } from 'react';
import styles from './ImageGallerySlider.module.scss';



const ImageGallerySlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigate to the previous image
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Navigate to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Navigate to a specific image thumbnail
  const selectImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.imageGallery}>
      {/* Main Image Display */}
      <div className={styles.mainImageContainer}>
        <button className={`${styles.navButton} ${styles.left}`} onClick={goToPrevious}>
          <img src='/images/icons/arrow-left-Icon.svg' className={styles.icon} />
        </button>
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className={styles.mainImage} />
        <button className={`${styles.navButton} ${styles.right}`} onClick={goToNext}>
        <img src='/images/icons/arrow-right-Icon.svg' className={styles.icon} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className={styles.thumbnailContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${index === currentIndex ? styles.selected : ''}`}
            onClick={() => selectImage(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallerySlider;
