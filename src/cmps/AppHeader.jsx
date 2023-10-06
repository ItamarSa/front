import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { setGigFilter } from "../store/action/gig.actions";
import { TextFilter } from "./TextFilter";
import { TagFilter } from "./TagFilter";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const [showFilter, setShowFilter] = useState(false)
  const [filterText, setFilterText] = useState("") //Local state for text filter
  const [filterTags, setFilterTags] = useState([]) // Local state for tag filter


  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowFilter(true)
    } else {
      setShowFilter(false)
    }
  }


  function onSetFilterTag(filterBy) {
    console.log("filterBy tags:", filterBy)
    // Update local state for tags filter
    setFilterTags(filterBy.tags);
    // Update the store filter with both text and tags
    setGigFilter({ txt: filterText, tags: filterBy.tags })
  }

  function onSetFilterText(filterBy) {
    console.log("filterBy text:", filterBy)
    // Update local state for text filter
    setFilterText(filterBy.txt)
    // Update the store filter with both text and tags
    setGigFilter({ txt: filterBy.txt, tags: filterTags })
  }

  return (
    <header className="app-header full">
      <nav className="header">
        <div className="main-nav">

          
            <NavLink title="home" to="/">
            <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"/></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"/></g></svg>
            </NavLink>
         

            {showFilter && <TextFilter onSetFilter={onSetFilterText} />}

          <select name="BusinessSolution" >
            <option className="option-header" value="Business Solution">Business Solution</option>
            <option value="Fiverr Certified">Fiverr Certified</option>
            <option value="Fiverr Enterprise">Fiverr Enterprise</option><hr />
            <option value="Contact sales">Contact sales</option>
          </select>


          <select name="Explore" value="Explore" >
            <option className="option-header" value="Explore">Explore</option>
            <option value="">Discover</option>
            <option value="">Community</option>
            <option value="">Guides</option>
            <option value="">Podcast</option>
            <option value="">Learn</option>
            <option value="">Blog</option>
            <option value="">Logo Maker</option>
            <option value="">Fiverr Workspace</option>
          </select>

          <button>Become a Seller</button>

         
            <NavLink className="sigin-in" title="Login" to="/login">
              Sign in
            </NavLink>
        
            <button className="btn-join">
            <NavLink  title="Login" to="/login">
              Join
            </NavLink>
            </button>
     

            <NavLink title="gig" to="/gig">
              gigs
            </NavLink>
        

          {user && (
            <span className="user-info">
              <Link to={`user/${user._id}`}>
                {user.imgUrl && <img src={user.imgUrl} />}
                {user.email}
              </Link>
            </span>
          )}
        </div>

        <div className='filter-container'>
          <div className="filter">
            {showFilter && <TagFilter onSetFilter={onSetFilterTag} />}
          </div>
        </div>
      </nav>
    </header>
  );
}
