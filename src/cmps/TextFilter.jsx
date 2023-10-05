import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function TextFilter({ filterBy, onSetFilter }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const filterByFromURL = {
    txt: searchParams.get("txt") || "",
  };

  const [filterByText, setFilterByText] = useState(filterByFromURL);

  const handleSearch = () => {
    // Update URL parameters here
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("txt", filterByText.txt);
    navigate(`/gigs?${newSearchParams.toString()}`);
    // Call onSetFilter with the updated filter
    onSetFilter(filterByText);
    // Reset the filter value
    setFilterByText({ txt: "" });
  };

  return (
    <div>
      <div className="filter-group">
        <label htmlFor="txt"></label>
        <br />
        <input
          value={filterByText.txt}
          onChange={(e) => setFilterByText({ txt: e.target.value })}
          type="text"
          placeholder="By txt"
          id="txt"
          name="txt"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
