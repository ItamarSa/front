import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import routes from "../routes";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { login, logout, signup } from "../store/action/user.actions.js";
import { LoginSignup } from "./LoginSignup.jsx";
import { setGigFilter } from "../store/action/gig.actions";
import { TextFilter } from "./TextFilter";
import { TagFilter } from "./TagFilter";

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.user)
  const [showBusinessModal, setShowBusinessModal] = useState(false)
  const [showExploreModal, setShowExploreModal] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filterText, setFilterText] = useState("") //Local state for text filter
  const [filterTags, setFilterTags] = useState([]) // Local state for tag filter

  const closeModals = () => {
    setShowBusinessModal(false)
    setShowExploreModal(false)
  };

  useEffect(() => {
    document.body.addEventListener("click", closeModals)
    return () => {
      document.body.removeEventListener("click", closeModals)
    };
  }, []);

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
          <button>
            <NavLink title="home" to="/">
              Tenner
            </NavLink>
          </button>
          <TextFilter onSetFilter={onSetFilterText} />

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowBusinessModal(!showBusinessModal)
            }}
          >
            Business solutions
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowExploreModal(!showExploreModal)
            }}
          >
            Explore
          </button>
          {/* ... */}

          {showBusinessModal && (
            <div className="side-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Business Solutions</h2>
              <div className="child-buttons">
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                <button>Button 4</button>
              </div>
            </div>
          )}

          {/* Render Explore Modal */}
          {showExploreModal && (
            <div className="side-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Explore</h2>
              <div className="child-buttons">
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                <button>Button 4</button>
              </div>
            </div>
          )}

          <button>Become a Seller</button>
          {/* <button>🌐English</button> */}
          <button>
            <NavLink title="Login" to="/login">
              Sign in
            </NavLink>
          </button>
          <button>
            <NavLink title="Login" to="/login">
              Join
            </NavLink>
          </button>
          <button>
            <NavLink title="gig" to="/gig">
              gigs
            </NavLink>
          </button>
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
