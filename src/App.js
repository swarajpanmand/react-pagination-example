import React, { useEffect, useReducer } from "react";
import "./App.css";

const itemsPerPage = 5;

const paginationReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_TOTAL_ITEMS":
      return { ...state, totalItems: action.payload };
    default:
      return state;
  }
};

const App = () => {
  const [paginationState, dispatch] = useReducer(paginationReducer, {
    currentPage: 1,
    totalItems: 0,
  });

  const data = Array.from({ length: 25 }, (_, index) => `Item ${index + 1}`);

  useEffect(() => {
    dispatch({ type: "SET_TOTAL_ITEMS", payload: data.length });
  }, [data]);

  const startIndex = (paginationState.currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedItems = data.slice(startIndex, endIndex);

  const handlePageClick = (newPage) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: newPage });
  };

  return (
    <div className="pagination-container">
      <h1 className="pagination-title">Pagination Example</h1>
      <ul className="item-list">
        {displayedItems.map((item, index) => (
          <li key={index} className="item">{item}</li>
        ))}
      </ul>
      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => handlePageClick(paginationState.currentPage - 1)}
          disabled={paginationState.currentPage === 1}
        >
          Previous
        </button>
        <span className="page-info">
          Page {paginationState.currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </span>
        <button
          className="pagination-button"
          onClick={() => handlePageClick(paginationState.currentPage + 1)}
          disabled={endIndex >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;