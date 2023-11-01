import React, { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { setGigFilter } from "../store/action/gig.actions"
import { TextFilter } from "./TextFilter"
import { TagFilter } from "./TagFilter"
import { orderService } from "../services/order.service"
import { showErrorMsg } from "../services/event-bus.service"
import { utilService } from "../services/util.service"
import { UserMsg } from "./UserMsg"
import { logout } from "../store/action/user.actions"
import { ModalProvider, useModal } from '../cmps/ModalProvider';
import { LoginModal } from './LoginModal';

export function AppHeader() {
    const user = userService.getLoggedinUser()
    // const user = useSelector((storeState) => storeState.userModule.user)
    const [showFilter, setShowFilter] = useState(false)
    const [filterText, setFilterText] = useState("")
    const [filterTags, setFilterTags] = useState([])
    const [showTagFilter, setShowTagFilter] = useState(false)
    const [orders, setOrders] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const location = useLocation()
    const isHomePage = location.pathname === "/"
    const [textColor, setTextColor] = useState("#62646a")
    const [showBorder, setShowBorder] = useState(false)
    const [scrolling, setScrolling] = useState(false)
    const [scrollingNav, setScrollingNav] = useState(false)
    const [scrollingHeader, setScrollingHeader] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // const { openModal, closeModal } = useModal();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeModal = () => {
        setIsLoginModalOpen(false);
    };






    useEffect(() => {
        if (user && user.imgUrl) {
        }
    }, [user && user.imgUrl])

    useEffect(() => {
        loadOrders()
        if (isHomePage) {
            window.addEventListener('scroll', handleScroll)
            setTextColor(window.scrollY > 30 ? "#62646a" : "white")
            setScrolling(window.scrollY > 30)
            setScrollingNav(window.scrollY > 30)
            setScrollingHeader(window.scrollY > 30)
        } else {
            setTextColor("#62646a")
            setShowFilter(true)
            setShowTagFilter(true)
            setScrolling(true)
            setScrollingNav(true)
            setScrollingHeader(true)
        }

        return () => {
            if (isHomePage) {
                window.removeEventListener('scroll', handleScroll)
            } else {
                setShowFilter(false)
                setShowTagFilter(false)
            }
        }
    }, [isHomePage, orders])


    async function loadOrders() {
        try {
            // console.log('user:', user)
            const buyerId = user._id
            const orders = await orderService.query({ buyerId })
            setOrders(orders)
        } catch (err) {
            console.log('Had issues loading orders', err)
            {user && showErrorMsg('Cannot load orders')}
            
        }
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const closeOnOutsideClick = (e) => {
        if (isModalOpen && !document.querySelector(".modal").contains(e.target) && e.target.className !== "modal-button nav btn") {
            setIsModalOpen(false);
        }

        if (isMenuOpen && !document.querySelector(".toggler-popover").contains(e.target)) {
            setIsMenuOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeOnOutsideClick)
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick)
        }
    }, [isModalOpen, isMenuOpen])

    const handleScroll = () => {
        if (isHomePage) {
            if (window.scrollY > 30) {
                setTextColor("#62646a")
                setScrolling(true)
                setScrollingHeader(true)
                // document.querySelector(".app-header").classList.add("scrolling")

                if (!showFilter) {
                    // document.querySelector(".app-header").classList.add("scrolling")
                    setScrollingHeader(true)
                }
                if (window.scrollY > 100) {
                    setShowTagFilter(true)
                    setShowFilter(true)
                    // document.querySelector(".app-header").classList.add("scrolling")
                    setScrollingHeader(true)
                    setScrollingNav(true)
                    // document.querySelector(".main-nav").classList.add("scrolling")
                } else {
                    setShowTagFilter(false)
                    // document.querySelector(".main-nav").classList.remove("scrolling")
                    setScrollingNav(false)
                }
            } else {
                setShowFilter(false)
                setScrolling(false)
                setShowTagFilter(false)
                setTextColor("white")
                setScrollingHeader(false)
                // document.querySelector(".app-header").classList.remove("scrolling")
                // document.querySelector(".main-nav").classList.remove("scrolling")
                setScrollingNav(false)
            }
        }
    }
    function onSetFilterTag(filterBy) {
        setFilterTags(filterBy.tags)
        setGigFilter({ txt: filterText, tags: filterBy.tags })
    }
    function onSetFilterText(filterBy) {
        setFilterText(filterBy.txt)
        setGigFilter({ txt: filterBy.txt, tags: filterTags })
    }
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            // showErrorMsg('Cannot logout')
        }
    }






    return (
        <header
            className={`main-container full app-header ${isHomePage ? "fixed-header" : ""
                } ${isHomePage && scrollingHeader && window.scrollY > 25 ? "white-background scrolling" : ""}`}
            style={{ color: textColor, borderBottom: showBorder ? "1px solid #e4e5e7" : "none" }}

        >
            <div className={`header main-container full ${scrollingNav ? 'scrolling' : ""}`}>
                <div className="main-nav">
                    <div>
                        <NavLink className="btn" title="home" to="/">
                            <h1 className={`logo  ${(isHomePage && scrollingHeader && window.scrollY > 25) || (!isHomePage) ? "scrolling" : ""}`}>Tenner</h1>

                            {/* <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z" /></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z" /></g></svg> */}
                        </NavLink>
                    </div>


                    <div className="search-text">
                        {showFilter && <TextFilter onSetFilter={onSetFilterText} />}
                    </div>
                    
                    <div className="nav-bar">
                        <ul className="ul">
                            {/* <li>
                                <select className="nav btn" name="BusinessSolution" >
                                    <option className="option-header" value="Business solution">Business solution</option>
                                    <option value="Fiverr Certified">Fiverr Certified</option>
                                    <option value="Fiverr Enterprise">Fiverr Enterprise</option>
                                    <option value="Contact sales">Contact sales</option>
                                </select>
                            </li> */}
                            <li>
                                <NavLink className="nav btn" title="gig" to="/gigs">
                                    Explore
                                </NavLink>
                            </li>
                            <li onClick={toggleModal} className="modal-button nav btn">
                                {isModalOpen ? "Orders" : "Orders"}
                            </li>
                            <li className="nav btn sigin-in">
                                Become a Seller
                            </li>
                            {!user && <li onClick={openModal} className="nav  btn sigin-in">
                                Sign in
                            </li>}

                            {!user && <li onClick={openModal} className={`nav btn btn-join ${scrolling ? "green-color" : ''}`}>
                                Join
                            </li>}
                            <div>
                        {/* <button onClick={openModal}>Open Modal</button> */}
                        {/* // Inside your LoginModal component */}
                        {/* <button onClick={closeModal}>Close</button> */}

                        {isLoginModalOpen && <LoginModal closeModal={closeModal} />}
                    </div>
                            

                            <li>
                                <div className="toggler-popover">
                                    {user && user.imgUrl && (
                                        <span className="target-wrap" onClick={toggleMenu}>
                                            <div className="uy3dNJC">
                                                <figure className="fig">
                                                    <img className="img-user" src={user.imgUrl} alt={user.username} />
                                                </figure>
                                                <div className="cCSTnnY rHv1-nv" style={{ bottom: "-2px", right: "-2px" }}>
                                                    <div style={{ borderWidth: "2px", width: "10px", height: "10px" }}
                                                        className="G1NyNb1 fQXZI8+">
                                                    </div>
                                                </div>
                                            </div>

                                            <aside className="bottom place-left">
                                                <div className="tip" style={{ left: "calc(100% - 16px)" }}>
                                                </div>
                                                {
                                                    isMenuOpen &&
                                                    <ul className="nav-popover-items-content" style={{ width: "auto" }}>
                                                        <li className="profile">
                                                            {/* <a href="/my_profile" className="nav-link">Profile</a> */}
                                                            <Link className="nav-link" to={`user/${user?._id}`}>
                                                                Profile
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <button className="out" onClick={onLogout}>Logout</button>
                                                        </li>
                                                    </ul>
                                                }

                                            </aside>
                                        </span>


                                    )}

                                    {/* {isMenuOpen && (
                                        <div className="menu">
                                            <Link className="nav-link" to={`user/${user?._id}`}>
                                                <button>Visit Profile</button>
                                            </Link>
                                            <button onClick={onLogout}>Logout</button>
                                        </div>
                                    )} */}
                                </div>
                            </li>


                        </ul>



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






                        {/* <button className="btn btn-join"> */}



                        {/* <NavLink className="nav btn " title="orders" to="/gig/:gigId/order">
                Orders
            </NavLink> */}


                    </div>




                </div>
            </div>
            <div className={`filter-container main-container full ${scrollingNav ? 'scrolling' : ""}`}>

                {showTagFilter && <TagFilter onSetFilter={onSetFilterTag} />}

            </div>
            <div className="gig-order">
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            {/* <h2 className="title-orders">All Orders</h2> */}
                            {/* <button onClick={toggleModal} className="modal-button">Close</button> */}
                            {orders.length === 0 ? (
                                <p className="no-orders-message">No orders yet</p>
                            ) : (
                                <div className="orders-list">
                                    <ul>
                                        {orders?.map((order) => (
                                            <li className="order-item" key={order._id}>
                                                <div className="order-img-container">
                                                    <img className="order-imgs" src={order.imgUrl[0]} alt="" />
                                                </div>
                                                <div className="order-details">
                                                    <div className="order-info">
                                                        <span>Description : {order.title}</span>
                                                        <span>Price : {order.price}</span>
                                                        <div className="order-info-section">
                                                            <br />
                                                            <div className="seller" >
                                                                <span >Seller : {' ' + order.seller.username}</span>
                                                            </div>
                                                            <br />
                                                            <div className="status">
                                                                <span >Status : <span style={{ color: orderService.getStatusColor(order.status) }}>{order.status}</span></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            )}

                        </div>
                    </div>
                )}
            </div>

            <UserMsg />
        </header>
    )
}
