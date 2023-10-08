import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function TextFilterMain({ filterBy, onSetFilter }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const filterByFromURL = {
    txt: searchParams.get("txt") || "",
  };

  const [filterByText, setFilterByText] = useState(filterByFromURL);
  const [allOptions, setAllOptions] = useState([]); // Replace with your list of all available options
  const [filteredOptions, setFilteredOptions] = useState([]);

  const debouncedUpdateURL = utilService.debounce(updateURL, 500);

  useEffect(() => {
    onSetFilter(filterByText);
  }, [filterByText, onSetFilter]);

  useEffect(() => {
    setFilterByText(filterByFromURL);
  }, [location.search]);

  // Simulate fetching options from an API when the component mounts (you can replace this with your actual data fetching)
  useEffect(() => {
    // Replace this with your code to fetch options
    // Example: const fetchedOptions = await fetchOptionsFromAPI();
    const fetchedOptions = [
      'Graphics-Design',
      'Programming-Tech',
      'Digital-Marketing',
      'Video-Animation',
      'Writing-Translation',
      'Music-Audio',
      'Business',
      'Data',
      'Photography',
    ];
    setAllOptions(fetchedOptions);
  }, []);

  // Filter options based on the text input
  useEffect(() => {
    const filtered = allOptions.filter((option) =>
      option.toLowerCase().includes(filterByText.txt.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [allOptions, filterByText.txt]);

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
            onChange={(e) => setFilterByText({ txt: e.target.value })}
            type="text"
            placeholder="By txt"
            id="txt"
            name="txt"
          />
          <button className="btn-search" type="button" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </button>
        </div>
        {/* Display the autocomplete suggestions */}
        {filterByText.txt && (
          <div className="autocomplete-suggestions-main">
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => {
                  // Set the selected option in the input field
                  setFilterByText({ txt: option });
                  // Perform the search or any other action here
                  handleSearch();
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}
