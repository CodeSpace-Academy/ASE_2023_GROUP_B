import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import classes from './arrow-up-icon.module.css';

export default function ScrollArrows() {
  const handleScroll = (direction) => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (direction === "up") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (direction === "down") {
      window.scrollTo({
        top: scrollHeight - windowHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <div
        style={{ cursor: "pointer", marginBottom: "10px" }}
        onClick={() => handleScroll("up")}
      >
        <FaArrowUp className={classes.scrollArrow} />
      </div>
      <div style={{ cursor: "pointer" }} onClick={() => handleScroll("down")}>
        <FaArrowDown className={classes.scrollArrow} />
      </div>
    </div>
  );
}
