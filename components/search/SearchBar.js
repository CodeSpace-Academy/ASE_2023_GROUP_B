import React from 'react';
import classes from '../search/Search.module.css';

export default function SearchBar(props) {

  const{search, setSearch} = props

  return (
    <div className={classes.whole}>
      <form className={classes.form}>
        <input
          required
          pattern=".\S."
          type="search"
          value={search}
          className={classes.input}

          onChange={(e)=> setSearch(e.target.value) }
        />
        <span className={classes.caret}></span>
      </form>
    </div>
  );
}
