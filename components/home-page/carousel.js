import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomArrow = ({ type, onClick }) => {
  return (
    <button onClick={onClick} className="carousel-arrow">
      {type === 'PREV' ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
};

const MyCarousel = ({ images }) => {
  return (
    <Carousel className="carouselWrapper" renderArrow={CustomArrow}>
      {images.map((image, index) => (
        <img
          className="carousel-item img "
          key={index}
          src={image}
          alt={`Recipe Image ${index + 1}`}
          width={200}
          height={200}
        />
      ))}
    </Carousel>
  );
};

export default MyCarousel;
