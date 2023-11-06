import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function TextFilter({ filterBy, handleFilterChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search)
  const filterByFromURL =searchParams.get("txt") || ""
  

  const [filterByText, setFilterByText] = useState(filterByFromURL);
  const [allOptions, setAllOptions] = useState([]); // Replace with your list of all available options
  const [filteredOptions, setFilteredOptions] = useState([]);

  const debouncedUpdateURL = utilService.debounce(updateURL, 500);

  // useEffect(() => {
  //   onSetFilter(filterByText);
  // }, [filterByText]);

  // useEffect(() => {
  //   setFilterByText(filterByFromURL);
  // }, [location.search]);

  // Simulate fetching options from an API when the component mounts (you can replace this with your actual data fetching)
  // useEffect(() => {
  //   // Replace this with your code to fetch options
  //   // Example: const fetchedOptions = await fetchOptionsFromAPI();
  //   const fetchedOptions = [
  //     'Graphics-Design',
  //     'Programming-Tech',
  //     'Digital-Marketing',
  //     'Video-Animation',
  //     'Writing-Translation',
  //     'Music-Audio',
  //     'Business',
  //     'Data',
  //     'Photography',
  //   ];
  //   setAllOptions(fetchedOptions);
  // }, []);

  // Filter options based on the text input
  // useEffect(() => {
  //   const filtered = allOptions.filter((option) =>
  //     option.toLowerCase().includes(filterByText.txt.toLowerCase())
  //   );
  //   setFilteredOptions(filtered);
  // }, [allOptions, filterByText.txt]);
  // / Filter options based on the text input
  // useEffect(() => {
  // handleSearch()
  // }, [filterByText]);
  
  function handleSearch(ev) {
    if (ev)ev.preventDefault()
    console.log('handle:')
    // Update URL parameters here
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("txt", filterByText);
    debouncedUpdateURL({ txt: filterByText});
    // onSetFilter(filterByText)
    // Reset the filter value
    handleFilterChange(filterByText,"txt")
    // setFilterByText({ txt: "" });
  }

  function updateURL(params) {
    const queryString = new URLSearchParams(params).toString();
    navigate(`/gigs?${queryString}`);
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <label htmlFor="txt"></label>
          <br />
          <input
            className="search-input"
            value={filterByText}
            onChange={(e) => setFilterByText(e.target.value )}
            type="text"
            placeholder="What service are you looking for today?"
            id="txt"
            name="txt"
          />
          <button onClick={handleSearch} className="btn-search-header" type="button">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
          </button>
        </div>
        {/* Display the autocomplete suggestions */}
        {/* {filterByText.txt && (
          <div className="autocomplete-suggestions">
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
        )} */}
      </form>
    </div>
  );
}
