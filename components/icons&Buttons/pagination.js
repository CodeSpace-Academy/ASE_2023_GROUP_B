import React from "react";
import ReactPaginate from "react-paginate";
function PaginationComponent({ pageCount, onPageChange }) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
}
export default PaginationComponent;