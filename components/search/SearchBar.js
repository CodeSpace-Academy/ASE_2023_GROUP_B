import React, { useEffect, useState } from 'react';
import classes from '../search/Search.module.css';

export default function SearchBar({ recipes, onSearch , search , setSearch }) {
  // const [searchText, setSearchText] = useState('');
  const [searchHist, setSearchHist] = useState([]);

  useEffect(() => {
    const hist = localStorage.getItem('searchHist');

    if (hist) {
      setSearchHist(JSON.parse(hist));
    }
  }, []);

  function handleChange(e) {
    const text = e.target.value;
    setSearch(text);
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

console.log(search)

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
          onChange={(e)=> {setSearch(e.target.value)}}
          type="text"
          className={classes.input}
        />
        <span className={classes.caret}></span>
        <button type="button" onClick={handleSearch}>
          Submit
        </button>
      </form>


      {searchHist.length > 0 && (
        <ul>
          {searchHist.map((historyItem, index) => (
            <li key={index}>{historyItem}</li>
          ))}
        </ul>
      )}
    </div>
  );
}