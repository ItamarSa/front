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
    const [showTagFilter, setShowTagFilter] = useState(false);

    //   const [headerColorIndex, setHeaderColorIndex] = useState(0); // Index for selecting header colors
    //   const headerColors = ["#a7445a", "#0f4926", "#ad3906", "#5f1628","#0a4226"]; // List of header colors


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScroll = () => {
        if (window.scrollY > 50) {
          if (!showFilter) {
            // First scroll, change background to white
            setShowFilter(true);
          }
          if (window.scrollY > 100) {
            // Second scroll, show tag filter
            setShowTagFilter(true);
          } else {
            // Scroll position between 100 and 200, hide tag filter
            setShowTagFilter(false);
          }
        } else {
          // Scroll position less than 100, hide both filter and tag filter
          setShowFilter(false);
          setShowTagFilter(false);
        }
      };
      
      
      


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
    //   useEffect(() => {
    //     const intervalId = setInterval(() => {
    //       setHeaderColorIndex((prevIndex) => (prevIndex + 1) % headerColors.length);
    //     }, 4000);

    //     return () => {
    //       clearInterval(intervalId);
    //     };
    //   }, []);

    //   const headerStyle = {
    //     backgroundColor: headerColors[headerColorIndex],
    //   };
    return (
        <header className={`app-header full ${showFilter ? 'white-background' : ''}`}>
            <div className="main-nav">
                <div className="logo">
                    <NavLink className="btn" title="home" to="/">
                        <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" /></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" /></g></svg>
                    </NavLink>
                </div>

                <div className="search-text">
                    {showFilter && <TextFilter onSetFilter={onSetFilterText} />}
                </div>

                <div className="nav-bar">
                    <select className="nav btn" name="BusinessSolution" >
                        <option className="option-header" value="Business Solution">Business Solution</option>
                        <option value="Fiverr Certified">Fiverr Certified</option>
                        <option value="Fiverr Enterprise">Fiverr Enterprise</option><hr />
                        <option value="Contact sales">Contact sales</option>
                    </select>

                    <NavLink className="nav btn" title="gig" to="/gig">
                    Explore
                    </NavLink>
                    {/* <select className="nav btn" name="Explore" value="Explore" >
                        <option className="option-header" value="Explore">Explore</option>
                        <option value="">Discover</option>
                        <option value="">Community</option>
                        <option value="">Guides</option>
                        <option value="">Podcast</option>
                        <option value="">Learn</option>
                        <option value="">Blog</option>
                        <option value="">Logo Maker</option>
                        <option value="">Fiverr Workspace</option>
                    </select> */}

                    <button className="nav btn">Become a Seller</button>


                    <NavLink className="nav  btn sigin-in" title="Login" to="/login">
                        Sign in
                    </NavLink>

                    {/* <button className="btn btn-join"> */}
                    <NavLink className="nav btn btn-join" title="Login" to="/login">
                        Join
                    </NavLink>
                    <NavLink className="nav btn " title="orders" to="/gig/:gigId/order">
                        Orders
                    </NavLink>
                </div>

            </div>
            <div className='filter-container'>
              {showTagFilter && <TagFilter onSetFilter={onSetFilterTag} />}
            </div>

        </header>
    )
}

// return (
//     <header className="app-header" >
//         {/* <nav className="header"> */}
//         {/* <div className="main-nav"> */}
//         <div className="logo">
//             <NavLink className="btn" title="home" to="/">
//                 <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" /></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" /></g></svg>
//             </NavLink>
//         </div>
//         <div className="header-nav">
//             {showFilter && <TextFilter onSetFilter={onSetFilterText} />}

//             <select className="btn" name="BusinessSolution" >
//                 <option className="option-header" value="Business Solution">Business Solution</option>
//                 <option value="Fiverr Certified">Fiverr Certified</option>
//                 <option value="Fiverr Enterprise">Fiverr Enterprise</option><hr />
//                 <option value="Contact sales">Contact sales</option>
//             </select>


//             <select className="btn" name="Explore" value="Explore" >
//                 <option className="option-header" value="Explore">Explore</option>
//                 <option value="">Discover</option>
//                 <option value="">Community</option>
//                 <option value="">Guides</option>
//                 <option value="">Podcast</option>
//                 <option value="">Learn</option>
//                 <option value="">Blog</option>
//                 <option value="">Logo Maker</option>
//                 <option value="">Fiverr Workspace</option>
//             </select>

//             <button className="btn">Become a Seller</button>


//             <NavLink className=" btn sigin-in" title="Login" to="/login">
//                 Sign in
//             </NavLink>

//             {/* <button className="btn btn-join"> */}
//             <NavLink className="btn btn-join" title="Login" to="/login">
//                 Join
//             </NavLink>

//         </div>
//         <br />
//         <div className='filter-container'>
//             <div className="filter">
//                 {showFilter && <TagFilter onSetFilter={onSetFilterTag} />}
//             </div>
//         </div>
//         {/* </button> */}


//         {/* <NavLink className="btn" title="gig" to="/gig">
//               gigs
//             </NavLink>
        

//           {user && (
//             <span className=" btn user-info">
//               <Link to={`user/${user._id}`}>
//                 {user.imgUrl && <img src={user.imgUrl} />}
//                 {user.email}
//               </Link>
//             </span>
//           )} */}
//         {/* </div> */}


//         {/* </nav> */}
//     </header>
// );
// }
