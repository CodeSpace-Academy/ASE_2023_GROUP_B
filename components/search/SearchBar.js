import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import classes from '../search/Search.module.css';

export default function SearchBar({ recipes, onSearch, search, setSearch }) {
  const [searchHist, setSearchHist] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const hist = localStorage.getItem('searchHist');

    if (hist) {
      setSearchHist(JSON.parse(hist));
    }
  }, []);

  function handleChange(e) {
    const text = e.target.value;
    setSearch(text);
    setIsExpanded(text.length > 0);
  }

  function clear() {
    setSearch('');
    setIsExpanded(false);
  }

  function handleSearch() {
    onSearch(search);
    setSearchHist((prevHistory) => {
      const updatedHist = [search, ...prevHistory].slice(0, 5);
      localStorage.setItem('searchHist', JSON.stringify(updatedHist));
      return updatedHist;
    });
  }

  return (
    <div className={classes.whole}>
      <form className={classes.form}>
        <input
          required
          value={search}
          onChange={(e) => handleChange(e)}
          type="text"
          className={classes.input}
        />
        <span className={classes.caret}></span>
        {isExpanded && (
          <>
            <button type="button" onClick={clear} className={classes.clearButton}>
              <FaTimes />
            </button>
            <button type="button" onClick={handleSearch}>
              Submit
            </button>
          </>
        )}
      </form>

      {isExpanded && searchHist.length > 0 && (
        <ul>
          {searchHist.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
