// Pagination.js
import React from 'react';
import classes from '../recipes/recipe-list.module.css';

function Pagination({ currentPage, totalCount, handlePageChange }) {
  const pageNumbers = Array.from(
    { length: totalCount },
    (_, index) => index + 1
  );

  return (
    <div className={classes.pagination}>
      {currentPage > 1 && (
        <span onClick={() => handlePageChange(currentPage - 1)}>Previous</span>
      )}

      {pageNumbers.map((page) => (
        <span
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? classes.activePage : ''}
        >
          {page}
        </span>
      ))}

      {currentPage < totalCount && (
        <span onClick={() => handlePageChange(currentPage + 1)}>Next</span>
      )}
    </div>
  );
}

export default Pagination;
