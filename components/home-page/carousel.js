<<<<<<< Updated upstream
import React from 'react'
=======
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../pages/recipe/recipe-list.module.css';

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
>>>>>>> Stashed changes

export default function carousel() {
  return (
    <div>
      <h1>Carousel</h1>
    </div>
  )
}
