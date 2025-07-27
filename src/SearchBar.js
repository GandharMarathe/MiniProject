import React from 'react';
import './App.css';

const SearchBar = ({ searchQuery, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search food..."
        value={searchQuery}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
