import { useState, useEffect } from "react"
import { gigService } from "../services/gig.service.local"
import { useParams, Link } from 'react-router-dom';
import { NavLink } from "react-router-dom"

const gigTags = gigService.getGigTags()

export function GigFilter({ filterBy, onSetFilter }) {
    const { tag } = useParams();
    
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, tags: tag ? [tag] : [] }); // Initialize with the 'tag' parameter if available

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit, onSetFilter])

    useEffect(() => {
        // When the 'tag' parameter changes in the URL, update the 'filterByToEdit' state accordingly
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, tags: tag ? [tag] : [] }));
    }, [tag]);

    function handleTagButtonClick(tag) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, tags: [tag] }));
    }

    function handleClearAll() {
        setFilterByToEdit({
            txt: "",
            tags: [],
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
                        <Link
                            key={tag}
                            to={`/gigs/${tag}`}
                            className={
                                filterByToEdit.tags.includes(tag) ? "selected" : ""
                            }
                            onClick={() => handleTagButtonClick(tag)}
                        >
                            {tag}
                        </Link>
                    ))}
                    <button className="clear-all-button" onClick={handleClearAll}>
                        Clear All
                    </button>
                </div>
            </section>
        </div>
    )
}
