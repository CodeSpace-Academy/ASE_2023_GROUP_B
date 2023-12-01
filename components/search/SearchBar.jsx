import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import classes from '../search/Search.module.css';

export default function SearchBar({ recipes, onSearch, search, setSearch }) {
  const [searchHist, setSearchHist] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  useEffect(() => {
    const hist = localStorage.getItem('searchHist');

    if (hist) {
      setSearchHist(JSON.parse(hist));
    }
  }, []);

  useEffect(() => {
    const searchDelay = 1000;

    const debouncedSearchHandler = debounce((query) => {
      onSearch(query);
    }, searchDelay);

    debouncedSearchHandler(debouncedSearch);

    // Cleanup the debounced function on component unmount
    return () => debouncedSearchHandler.cancel();
  }, [debouncedSearch, onSearch]);

  function handleChange(e) {
    const text = e.target.value;
    setSearch(text);
    setCurrentSearchTerm(text);

    // Cancel previous searches before triggering a new one
    setDebouncedSearch('');

    // Set a new debounced search term after a short delay
    setTimeout(() => {
      setDebouncedSearch(text);
    }, 300);
  }

  function clear() {
    setSearch('');
  }

  function handleSearch() {
    onSearch(search);
    setSearchHist((prevHistory) => {
      const updatedHist = [search, ...prevHistory].slice(0, 10);
      localStorage.setItem('searchHist', JSON.stringify(updatedHist));
      return updatedHist;
    });
  }

  return (
    <div className={classes.whole}>
      <button type="button" onClick={clear}>
        Clear
      </button>
      <form className={classes.form}>
        <input
          required
          value={search}
          onChange={handleChange}
          type="text"
          className={classes.input}
        />
        <span className={classes.caret}></span>
        <button type="button" onClick={handleSearch}>
          Submit
        </button>
      </form>

      {searchHist.length > 0 && (
        <ul style={{ zIndex: 1 }}>
          {searchHist.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
