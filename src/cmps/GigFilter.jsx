import { useState, useRef, useEffect } from "react"
import { utilService } from "../services/util.service"
import { gigService } from "../services/gig.service.local"
import { NavLink } from "react-router-dom"



// const gigLabels = gigService.getGigLabels()


export function GigFilter() {
    // const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    // onSetFilter = useRef(utilService.debounce(onSetFilter))
    // useEffect(() => {
    //     onSetFilter.current(filterByToEdit)
    // }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (field === 'inStock' && value === '') {
            value = ''
        } else if (type === 'select-one') {
            value = value === 'true'
        } else if (type === 'number') {
            value = +value || ''
        } else if (type === 'select-multiple') {
            value = Array.from(target.selectedOptions, (option) => option.value)
            // console.log('value', value)
        }

        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // if (!filterBy) return <div>loading</div>
    return (

        <div>
            {/* <h2>Filter Our Gigs</h2> */}
            <section className="gig-filter">
                <div className="filter-group">
                    <label htmlFor="txt"></label><br />
                    <NavLink title='Toys' to="/toy">logo</NavLink>
                    <input value="" onChange={handleChange} type="txt" placeholder="What service are you looking for today?" id="txt" name="txt" />
                    <NavLink title='Dashboard' to="/dashboard">business solutions</NavLink>
                    <NavLink title='Dashboard' to="/dashboard">explor</NavLink>
                    <NavLink title='Reviews' to="/review">english</NavLink>
                    <NavLink title='Dashboard' to="/dashboard">become a seller</NavLink>
                    <NavLink title='Dashboard' to="/dashboard">signin</NavLink>
                    <NavLink title='Reviews' to="/review">join</NavLink>
                </div>
                {/* <div className="filter-group">
                    <label htmlFor="inStock">Stoke available:</label>
                    <select value="{filterByToEdit.inStock}" name="inStock" id="inStock" onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In Stock</option>
                        <option value="false">Out Of Stock</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="gigs">Label:</label>
                    <select multiple value="{filterByToEdit.labels}" name="labels" id="labels" onChange={handleChange}>
                        <option value="">All</option>
                        <>
                            {gigLabels.map(label => (
                                <option key={label} value={label}>{label}</option>
                            ))}
                        </>
                    </select>
                </div> */}

            </section>
        </div>
    )
}