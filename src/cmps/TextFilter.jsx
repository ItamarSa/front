import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function TextFilter({ filterBy, onSetFilter }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const filterByFromURL = {
    txt: searchParams.get("txt") || "",
  };

  const [filterByText, setFilterByText] = useState(filterByFromURL);

  const debouncedUpdateURL = utilService.debounce(updateURL, 500);

  useEffect(() => {
    onSetFilter(filterByText);
  }, [filterByText, onSetFilter]);

  useEffect(() => {
    setFilterByText(filterByFromURL);
  }, [location.search]);

  function handleSearch() {
    // Update URL parameters here
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("txt", filterByText.txt);
    debouncedUpdateURL({ txt: filterByText.txt });
    // Reset the filter value
    setFilterByText({ txt: "" });
  }

  function updateURL(params) {
    const queryString = new URLSearchParams(params).toString();
    navigate(`/gigs?${queryString}`);
  }

  return (
    <div>
      <form className="search-form">
        <div className="search-input-container">
          <label htmlFor="txt"></label>
          <br />
          <input
            className="search-input"
            value={filterByText.txt}
            onChange={(e) =>
              setFilterByText({ txt: e.target.value })
            }
            type="text"
            placeholder="By txt"
            id="txt"
            name="txt"
          />
          <button
            className="btn-search"
            type="button"
            onClick={handleSearch}
          >
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </button>
        </div>
      </form>
    </div>
  );
}
