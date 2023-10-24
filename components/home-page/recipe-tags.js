import React from 'react';
import styles from './RecipeDetailPage.module.css';

const RecipeTags = ({ tags, tagsError }) => {
  return (
    <div>
      <h1 className={styles.title}>Tags:</h1>
      {tagsError ? (
        <div className={styles.errorMessage}>Failed to load tags.</div>
      ) : (
        <p>{tags}</p>
      )}
    </div>
  );
};

export default RecipeTags;
