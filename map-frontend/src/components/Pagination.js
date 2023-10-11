import React from 'react';
import './styles.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
    {pageNumbers.map((number) => (
      <li key={number} className={currentPage === number ? 'active' : ''}>
        <button onClick={() => onPageChange(number)}>{number}</button>
      </li>
    ))}
  </ul>
  
  );
};

export default Pagination;
