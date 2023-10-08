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
  const user = useSelector((storeState) => storeState.userModule.user);
//   const [showBusinessModal, setShowBusinessModal] = useState(false);
//   const [showExploreModal, setShowExploreModal] = useState(false);
  const [filterText, setFilterText] = useState(""); // Local state for text filter
  const [filterTags, setFilterTags] = useState([]); // Local state for tag filter
  const [headerColorIndex, setHeaderColorIndex] = useState(0); // Index for selecting header colors
  const headerColors = ["#a7445a", "#0f4926", "#ad3906", "#5f1628","#0a4226"]; // List of header colors

//   const closeModals = () => {
//     setShowBusinessModal(false);
//     setShowExploreModal(false);
//   };

//   useEffect(() => {
//     document.body.addEventListener("click", closeModals);
//     return () => {
//       document.body.removeEventListener("click", closeModals);
//     };
//   }, []);

  function onSetFilterTag(filterBy) {
    // Update local state for tags filter
    setFilterTags(filterBy.tags);
    // Update the store filter with both text and tags
    setGigFilter({ txt: filterText, tags: filterBy.tags });
  }

  function onSetFilterText(filterBy) {
    console.log("filterBy text:", filterBy);
    // Update local state for text filter
    setFilterText(filterBy.txt);
    // Update the store filter with both text and tags
    setGigFilter({ txt: filterBy.txt, tags: filterTags });
  }
  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeaderColorIndex((prevIndex) => (prevIndex + 1) % headerColors.length);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const headerStyle = {
    backgroundColor: headerColors[headerColorIndex],
  };

  return (
    <header className="app-header full" style={headerStyle}>
      <nav className="header">
        <div className="main-nav">
          <button>
            <NavLink title="home" to="/">
              Tenner
            </NavLink>
          </button>
          <TextFilter onSetFilter={onSetFilterText} />

          <button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setShowBusinessModal(!showBusinessModal);
            // }}
          >
            Business solutions
          </button>
          <button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   setShowExploreModal(!showExploreModal);
            // }}
          >
            Explore
          </button>
          {/* ... */}

          {/* {showBusinessModal && (
            <div className="side-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Business Solutions</h2>
              <div className="child-buttons">
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                <button>Button 4</button>
              </div>
            </div>
          )} */}

          {/* Render Explore Modal */}
          {/* {showExploreModal && (
            <div className="side-modal" onClick={(e) => e.stopPropagation()}>
              <h2>Explore</h2>
              <div className="child-buttons">
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                <button>Button 4</button>
              </div>
            </div>
          )} */}

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
              {/* <span className='score'>{user.score?.toLocaleString()}</span> */}
            </span>
          )}
        </div>
        <div className="filter">
            <br /><br/>
          {/* Render the TagFilter component */}
          <TagFilter onSetFilter={onSetFilterTag} />
          {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}
        </div>
      </nav>
    </header>
  );
}
