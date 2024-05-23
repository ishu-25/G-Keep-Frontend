import React, { useState } from "react";

const SearchFilterBar = ({ handleSearchNote, handleFilterNote }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Default");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    handleSearchNote(event.target.value);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    handleFilterNote(event.target.value);
  };

  return (
    <div className="search-filter">
      <input
        className="search"
        type="text"
        placeholder="Search Note..."
        value={searchText}
        onChange={handleSearchChange}
      />
      <select
        className="filter"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value="Default">Select filter</option>
        <option value="All">All</option>
        <option value="New to old">New to Old</option>
        <option value="Old to New">Old to New</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;