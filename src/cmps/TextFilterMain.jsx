import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { utilService } from "../services/util.service"

export function TextFilterMain({ filterBy, handleFilterChange }) {
  const location = useLocation()
  const navigate = useNavigate()
  const searchSymbol=<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path></svg>

  const searchParams = new URLSearchParams(location.search)
  const filterByFromURL =searchParams.get("txt") || ""



  const [filterByText, setFilterByText] = useState(filterByFromURL)
  // const [allOptions, setAllOptions] = useState([]) 
  // const [filteredOptions, setFilteredOptions] = useState([])

  const debouncedUpdateURL = utilService.debounce(updateURL, 500)

  // useEffect(() => {
  //   onSetFilter(filterByText)
  // }, [filterByText, onSetFilter])

  // useEffect(() => {
  //   setFilterByText(filterByFromURL)
  // }, [location.search])

  // useEffect(() => {
    
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
  //   ]
  //   setAllOptions(fetchedOptions)
  // }, [])

  // useEffect(() => {
  //   const filtered = allOptions.filter((option) =>
  //     option.toLowerCase().includes(filterByText.txt.toLowerCase())
  //   )
  //   setFilteredOptions(filtered)
  // }, [allOptions, filterByText.txt])

  // function handleSearch() {
  //   const newSearchParams = new URLSearchParams(location.search)
  //   newSearchParams.set("txt", filterByText.txt)
  //   debouncedUpdateURL({ txt: filterByText.txt })
  //   setFilterByText({ txt: "" })
  // }

  // function updateURL(params) {
  //   const queryString = new URLSearchParams(params).toString()
  //   navigate(`/gigs?${queryString}`)
  // }

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
            className="search-input-main"
            value={filterByText}
            onChange={(e) => setFilterByText(e.target.value )}
            type="text"
            placeholder="Search for any service..."
            id="txt"
            name="txt"
          />
          
          <button className="btn-search" type="button" onClick={handleSearch}>
            {searchSymbol}
          </button>
        </div>
        {/* {filterByText.txt && (
          <div className="autocomplete-suggestions-main">
            {filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setFilterByText({ txt: option })
                  handleSearch()
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )} */}
      </form>
    </div>
  )
}
