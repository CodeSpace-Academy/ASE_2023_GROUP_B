import React, { useState, useEffect, useRef } from 'react';
import styles from '../recipes/recipe-list.module.css';

const MyCarousel = ({ images }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slidesRef = useRef([]);

  useEffect(() => {
    showSlide(slideIndex);
  }, [slideIndex]);

  const showSlide = (n) => {
    const slides = slidesRef.current;
    if (!slides || slides.length === 0) return;
    if (n >= slides.length) {
      setSlideIndex(0);
    } else if (n < 0) {
      setSlideIndex(slides.length - 1);
    } else {
      for (let i = 0; i < slides.length; i++) {
        if (slides[i]) {
          slides[i].style.display = 'none';
        }
      }
      if (slides[slideIndex]) {
        slides[slideIndex].style.display = 'block';
      }
    }
  };

  const handlePaginationClick = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.slides}>
        {images.map((image, index) => (
          <img
            ref={(el) => (slidesRef.current[index] = el)}
            key={index}
            src={image}
            alt={`Recipe Image ${index + 1}`}
            width={200}
            height={200}
            style={{ display: index === slideIndex ? 'block' : 'none' }}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        {images.map((_, index) => (
          <span
            key={index}
            className={index === slideIndex ? styles.active : styles.dot}
            onClick={() => handlePaginationClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default MyCarousel;
