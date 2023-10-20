import React from 'react'
import classes from './show-more.module.css'


export default function ShowMoreButton ({ remainingRecipes, onClick }) {
  return (
    <button className={classes.btn} onClick={onClick}>
      ShowMore ({remainingRecipes} )
    </button>
  );
}
