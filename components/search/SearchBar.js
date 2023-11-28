import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import classes from '../search/Search.module.css';

export default function SearchBar({ recipes, onSearch , search , setSearch }) {
  const [searchHist, setSearchHist] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const hist = localStorage.getItem('searchHist');

    if (hist) {
      setSearchHist(JSON.parse(hist));
    }
  }, []);

  useEffect(() => {
    const debouncedSearchHandler = debounce((query) => {
      onSearch(query);
    }, 500);

    debouncedSearchHandler(debouncedSearch);

    // Cleanup the debounced function on component unmount
    return () => {
        debouncedSearchHandler.cancel();
      };
  }, [debouncedSearch, onSearch]);


  function handleChange(e) {
    const text = e.target.value;
    setSearch(text);
    setDebouncedSearch(text);
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
        clear
      </button>
      <form className={classes.form}>
        <input
          required
          // pattern=".\S."
          value={search}
          // onChange={(e)=> {setSearch(e.target.value)}}
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
        <ul style={{zIndex: 1}}>
          {searchHist.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}