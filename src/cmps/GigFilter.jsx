import { useState, useEffect } from "react";
import { gigService } from "../services/gig.service.local";
import { NavLink } from "react-router-dom";

const gigTags = gigService.getGigTags();

export function GigFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, tags: [] });

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit, onSetFilter]);

    // function handleTagButtonClick(tag) {
    //     const updatedTags = [...filterByToEdit.tags];

    //     // Toggle the tag in the array
    //     if (updatedTags.includes(tag)) {
    //         updatedTags.splice(updatedTags.indexOf(tag), 1);
    //     } else {
    //         updatedTags.push(tag);
    //     }

    //     setFilterByToEdit((prevFilter) => ({ ...prevFilter, tags: updatedTags }));
    // }
    function handleTagButtonClick(tag) {
        // Create a new array with the clicked tag
        const updatedTags = [tag];
    
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, tags: updatedTags }));
    }
    function handleClearAll() {
        // Clear all filters by resetting filterByToEdit
        setFilterByToEdit({
            txt: "",
            tags: [],
            // Add other filter fields here if needed
        });
    }

    function handleChange({ target }) {
        const { value, name: field, type } = target;
        let updatedValue = value;

        if (field === "inStock" && value === "") {
            updatedValue = "";
        } else if (type === "number") {
            updatedValue = +value || "";
        } else if (type === "select-multiple") {
            updatedValue = Array.from(
                target.selectedOptions,
                (option) => option.value
            );
        }

        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: updatedValue }));
    }

    return (
        <div>
            <section className="gig-filter">
                <div className="filter-group">
                    <label htmlFor="txt">Search By text</label><br />
                    <input
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                        type="text"
                        placeholder="By txt"
                        id="txt"
                        name="txt"
                    />
                </div>
                <div className="filter-group">
                    <label>Label:</label><br />
                    {gigTags.map((tag) => (
                        <button
                            key={tag}
                            className={
                                filterByToEdit.tags.includes(tag) ? "selected" : ""
                            }
                            onClick={() => handleTagButtonClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                    <button className="clear-all-button" onClick={handleClearAll}>
                        Clear All
                    </button>
                </div>
            </section>
        </div>
    );
}
