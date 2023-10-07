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

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent form submission
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
            <form className="search-form" onSubmit={handleSearch}>
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
                    <button className="btn-search" type="submit">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}
