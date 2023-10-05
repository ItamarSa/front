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
    console.log('filterByFromURL:', filterByFromURL)

    const [filterByText, setFilterByText] = useState(filterByFromURL);

    const debouncedUpdateURL = utilService.debounce(updateURL, 500);

    useEffect(() => {
        onSetFilter(filterByText);
    }, [filterByText, onSetFilter]);

    useEffect(() => {
        setFilterByText(filterByFromURL);
    }, [location.search]);

    function handleChange({ target }) {
        const { value, name: field } = target;
        setFilterByText((prevFilter) => ({
            ...prevFilter,
            [field]: value,
        }));
        // Update URL parameters here
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set(field, value);
        navigate(`/gigs?${newSearchParams.toString()}`);
    }
    function updateURL(params) {
        const queryString = new URLSearchParams(params).toString();
        navigate(`/gigs?${queryString}`);
    }

    return (
        <div>
            <div className="filter-group">
                <label htmlFor="txt"></label>
                <br />
                <input
                    value={filterByText.txt}
                    onChange={handleChange}
                    type="text"
                    placeholder="By txt"
                    id="txt"
                    name="txt"
                />
            </div>
        </div>
    );
}
