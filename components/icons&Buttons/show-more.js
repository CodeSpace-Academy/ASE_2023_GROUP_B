import React from 'react';
import classes from './show-more.module.css';

/**
 * ShowMoreButton Component
 * Button component to display remaining recipes
 * @param {Object} props - Component props
 * @param {number} props.remainingRecipes - Number of remaining recipes to display
 * @param {function} props.onClick - Click handler function
 * @returns {JSX.Element} React component
 */
export default function ShowMoreButton({ remainingRecipes, onClick }) {
  return (
    <button className={classes.btn} onClick={onClick}>
      ShowMore ({remainingRecipes})
    </button>
  );
}
