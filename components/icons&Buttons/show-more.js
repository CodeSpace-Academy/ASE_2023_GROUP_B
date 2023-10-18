import React from 'react'
import classes from './show-more.module.css'


export default function ShowMoreButton ({ onClick }) {
  return (
    <button className={classes.btn} onClick={onClick}>
    ShowMore 
  </button>
  );
}
