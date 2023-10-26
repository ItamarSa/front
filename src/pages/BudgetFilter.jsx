import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../services/util.service";

export function BudgetFilter({ filterBy, onSetFilter }) {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const filterByFromURL = {
    fromPrice: searchParams.get("fromPrice") || "",
    toPrice: searchParams.get("toPrice") || "",
  };

  const [filterByBudget, setFilterByBudget] = useState(filterByFromURL);
  const debouncedUpdateURL = utilService.debounce(updateURL, 500);

  useEffect(() => {
    onSetFilter(filterByBudget);
  }, [filterByBudget, onSetFilter]);

  useEffect(() => {
    setFilterByBudget(filterByFromURL);
  }, [location.search]);

  function handleFilter() {
    // Update URL parameters here
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("fromPrice", filterByBudget.fromPrice);
    newSearchParams.set("toPrice", filterByBudget.toPrice);
    debouncedUpdateURL({
      fromPrice: filterByBudget.fromPrice,
      toPrice: filterByBudget.toPrice,
    });
    // Reset the filter values
    setFilterByBudget({ fromPrice: "", toPrice: "" });
  }

  function updateURL(params) {
    const queryString = new URLSearchParams(params).toString();
    navigate(`/gigs?${queryString}`);
  }

  return (
    <div>
      <div className="budget-filter-container">
        <input
          type="text"
          placeholder="From Price"
          value={filterByBudget.fromPrice}
          onChange={(e) =>
            setFilterByBudget({ ...filterByBudget, fromPrice: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="To Price"
          value={filterByBudget.toPrice}
          onChange={(e) =>
            setFilterByBudget({ ...filterByBudget, toPrice: e.target.value })
          }
        />
        <button className="btn" onClick={handleFilter}>
          Filter by Budget
        </button>
      </div>
 </div>
);
}