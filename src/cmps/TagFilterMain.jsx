import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";
import { gigService } from "../services/gig.service.local";

const gigTags = gigService.getGigTags();

export function TagFilterMain({ filterBy, onSetFilter }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const filterByFromURL = {
    tags: searchParams.getAll("tags") || [],
  };

  const [filterByTags, setFilterByTags] = useState(filterByFromURL);

  const debouncedUpdateURL = utilService.debounce(updateURL, 500);

  useEffect(() => {
    onSetFilter(filterByTags);
  }, [filterByTags, onSetFilter]);

  useEffect(() => {
    setFilterByTags(filterByFromURL);
  }, [location.search]);

  function handleTagButtonClick(tag) {
    const updatedTags = [tag];
    setFilterByTags({ tags: updatedTags });
    debouncedUpdateURL({ tags: updatedTags });
    // Reset the filter value
    setFilterByTags({ tags: [] });
  }

  function updateURL(params) {
    const queryString = new URLSearchParams(params).toString();
    navigate(`/gigs?${queryString}`);
  }
  let newTag = ''
  return (
    <div>
      <div className="filter-group-main">
        <br />
        {gigTags.slice(0, 4).map((tag) => ( // Slice the first 4 tags
          <button
            key={tag}
            className={filterByTags.tags.includes(tag) ? "selected" : ""}
            onClick={() => handleTagButtonClick(tag)}
          >
            {newTag=tag.replace('-', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
  }  
