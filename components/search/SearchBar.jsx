import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import classes from '../search/Search.module.css';
import { FaTimes } from 'react-icons/fa';

export default function SearchBar({ onSearch, search, setSearch }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [isLongQuery, setIsLongQuery] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState(0)
  
  useEffect(() => {
    const hist = localStorage.getItem('searchHistory');

    if (hist) {
      setSearchHistory(JSON.parse(hist));
    }
  }, []);

  function clear() {
    setSearch('');
  }

  const handleChange = (e) => {
    const text = e.target.value;
    setSearch(text);
    // setIsExpanded(text.length > 0);
    setIsLongQuery(text.length >= 4);

    if (isLongQuery) {
      setShowSearchButton(true);
    }

    if (text.length <= 4) {
      clearTimeout(typingTimeout);
      setShowSearchButton(false);

      const newTimeout = setTimeout(() => {
        onSearch(search);
      }, 500);

      setTypingTimeout(newTimeout);
    } else {
      clearTimeout(typingTimeout);
    }
  };

  function clear() {
    setSearch('');
    setIsExpanded(false);
  }

  const handleSearch = () => {
    if (isLongQuery) {
      onSearch(search);

      setSearchHistory((prevHistory) => {
        const updatedHistory = [search, ...prevHistory].slice(0, 5);
        localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
        return updatedHistory;
      });
    }
  };
  
return (
    <div className={classes.whole}>
      <form className={classes.form}>
        <input
          required
          value={search || ''}
          onClick={() => setShowSearchButton(true)}
          onChange={handleChange}
          type="text"
          className={classes.input}
        />
        <span className={classes.caret}></span>
        {isLongQuery && showSearchButton && (
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

      { showSearchButton && searchHistory.length > 0 && !isLongQuery && (
        <ul>
          {searchHistory.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
          }


  