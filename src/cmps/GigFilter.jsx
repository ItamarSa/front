import { useState, useEffect } from 'react'
import { gigService } from '../services/gig.service.local'
import { useNavigate } from 'react-router-dom'

const gigTags = gigService.getGigTags()

export function GigFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy, tags: [] })
    const navigate = useNavigate()

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit, onSetFilter])

    function handleTagButtonClick(tag) {
        const updatedTags = [...filterByToEdit.tags]
        // Toggle the tag in the array
        if (updatedTags.includes(tag)) {
            updatedTags.splice(updatedTags.indexOf(tag), 1)
        } else {
            updatedTags.push(tag)
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, tags: updatedTags }))
        updateURL({ ...filterByToEdit, tags: updatedTags })
    }

    function handleClearAll() {
        setFilterByToEdit({
            txt: '',
            tags: [],
        })
        updateURL({ txt: '', tags: [] })
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        updateURL({ ...filterByToEdit, [field]: value })
    }

    function updateURL(params) {
        const queryString = new URLSearchParams(params).toString()
        navigate(`/gigs?${queryString}`)
    }

    return (
        <div>
            <section className='gig-filter'>
                <div className='filter-group'>
                    <label htmlFor='txt'>Search By text</label><br />
                    <input
                        value={filterByToEdit.txt}
                        onChange={handleChange}
                        type='text'
                        placeholder='By txt'
                        id='txt'
                        name='txt'
                    />
                </div>
                <div className='filter-group'>
                    <label>Label:</label><br />
                    {gigTags.map((tag) => (
                        <button
                            key={tag}
                            className={
                                filterByToEdit.tags.includes(tag) ? 'selected' : ''
                            }
                            onClick={() => handleTagButtonClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                    <button className='clear-all-button' onClick={handleClearAll}>
                        Clear All
                    </button>
                </div>
            </section>
        </div>
    )
}
