// import { useState, useEffect } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { utilService } from "../services/util.service"
// import { gigService } from "../services/gig.service.local"

// const gigTags = gigService.getGigTags()

// export function GigFilter({ onSetFilter }) {
//   const location = useLocation()
//   const navigate = useNavigate()

//   // Parse query parameters from the URL
//   const searchParams = new URLSearchParams(location.search)
//   const filterByFromURL = {
//     txt: searchParams.get("txt") || "", // Initialize with text from URL
//     tags: searchParams.getAll("tags") || [], // Initialize with tags from URL
//   }

//   const [filterBy, setFilterBy] = useState(filterByFromURL)

//   const debouncedUpdateURL = utilService.debounce(updateURL, 500)


//   useEffect(() => {
//     // Call onSetFilter whenever filterBy changes
//     onSetFilter(filterBy)
//   }, [filterBy, onSetFilter])

//   // Initialize filterBy state when the component first loads
//   useEffect(() => {
//     setFilterBy(filterByFromURL)
//   }, [])

//   function handleTagButtonClick(tag) {
//     // Create a new array with the clicked tag
//     const updatedTags = [tag]
//     setFilterBy({ txt: filterBy.txt, tags: updatedTags }) // Preserve text filter
//     debouncedUpdateURL({ txt: filterBy.txt, tags: updatedTags })
//   }

//   function handleClearAll() {
//     setFilterBy({ txt: "", tags: [] }) // Clear existing filter
//     debouncedUpdateURL({ txt: "", tags: [] })
//   }

//   function handleChange({ target }) {
//     const { value, name: field } = target
//     setFilterBy({ ...filterBy, [field]: value })
//     debouncedUpdateURL({ ...filterBy, [field]: value })
//   }

//   function updateURL(params) {
//     const queryString = new URLSearchParams(params).toString()
//     navigate(`/gigs?${queryString}`)
//   }

  

//   return (
//     <div>
//       <section className="gig-filter">
//         <div className="filter-group">
//           <label htmlFor="txt"></label>
//           <br />
//           <input
//             value={filterBy.txt}
//             onChange={handleChange}
//             type="text"
//             placeholder="By txt"
//             id="txt"
//             name="txt"
//           />
//         </div>
//         <div className="filter-group">
//           <label></label>
//           <br />
//           {gigTags.map((tag) => (
//             <button
//               key={tag}
//               className={filterBy.tags.includes(tag) ? "selected" : ""}
//               onClick={() => handleTagButtonClick(tag)}
//             >
//               {tag}
//             </button>
//           ))}
//           <button className="clear-all-button" onClick={handleClearAll}>
//             Clear All
//           </button>
//         </div>
//       </section>
//     </div>
//   )
// }
