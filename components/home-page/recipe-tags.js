import React from 'react';
import styles from './../../pages/recipe/RecipeDetailPage.module.css';

const RecipeTags = ({ tags, tagsError, selectedTags, clearSelectedTags }) => {
  return (
    <div>
      <h1 className={styles.title}>Tags:</h1>
      {tagsError ? (
        <div className={styles.errorMessage}>Failed to load tags.</div>
      ) : (
        <p>{tags}</p>
      )}
      {selectedTags.length > 0 ? (
        <p>Selected Tags: {selectedTags.join(', ')}</p>
      ) : (
        <p>No tags selected.</p>
      )}
      <button className="btn" onClick={clearSelectedTags}>
        Clear Selected Tags
      </button>
    </div>
  );
};

export default RecipeTags;
