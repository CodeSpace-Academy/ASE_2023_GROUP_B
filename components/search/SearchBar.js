import React from 'react';
import classes from '../search/Search.module.css';

export default function SearchBar() {
  return (
    <div className={classes.whole}>
      <form className={classes.form}>
        <input
          required
          pattern=".\S."
          type="search"
          className={classes.input}
        />
        <span className={classes.caret}></span>
      </form>
    </div>
  );
}
