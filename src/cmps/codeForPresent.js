import React, { useState, useEffect } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { setGigFilter } from "../store/action/gig.actions"
import { TextFilter } from "./TextFilter"
import { TagFilter } from "./TagFilter"
import { orderService } from "../services/order.service"
import { showErrorMsg } from "../services/event-bus.service"
import { UserMsg } from "./UserMsg"
import { logout } from "../store/action/user.actions"
import { LoginModal } from './LoginModal'

export function AppHeader() {
    const user = userService.getLoggedinUser()
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
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const openModal = () => {
        setIsLoginModalOpen(true)
    }

    const closeModal = () => {
        setIsLoginModalOpen(false)
    }

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
            const buyerId = user._id
            const orders = await orderService.query({ buyerId })
            setOrders(orders)
        } catch (err) {
            console.log('Had issues loading orders', err)
            { user && showErrorMsg('Cannot load orders') }

        }
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const closeOnOutsideClick = (e) => {
        if (isModalOpen && !document.querySelector(".modal").contains(e.target) && e.target.className !== "modal-button nav btn") {
            setIsModalOpen(false)
        }
        if (isMenuOpen && !document.querySelector(".toggler-popover").contains(e.target)) {
            setIsMenuOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeOnOutsideClick)
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick)
        }
    }, [isModalOpen, isMenuOpen])

    const handleScroll = () => {
        if (window.innerWidth < 800) {
            setShowFilter(true)
        } else if (isHomePage) {
            if (isHomePage) {
                if (window.scrollY > 30) {
                    setTextColor("#62646a")
                    setScrolling(true)
                    setScrollingHeader(true)
                    if (!showFilter) {
                        setScrollingHeader(true)
                    }
                    if (window.scrollY > 100) {
                        setShowTagFilter(true)
                        setShowFilter(true)
                        setScrollingHeader(true)
                        setScrollingNav(true)
                    } else {
                        setShowTagFilter(false)
                        setScrollingNav(false)
                    }
                } else {
                    setShowFilter(false)
                    setScrolling(false)
                    setShowTagFilter(false)
                    setTextColor("white")
                    setScrollingHeader(false)
                    setScrollingNav(false)
                }
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
        setIsMenuOpen(!isMenuOpen)
    }

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header
            className={`main-container full app-header ${isHomePage ? "fixed-header" : ""
                } ${isHomePage && scrollingHeader && window.scrollY > 25 ? "white-background scrolling" : ""}`}
            style={{ color: textColor, borderBottom: showBorder ? "1px solid #e4e5e7" : "none" }}>
            <div className={`header main-container full ${scrollingNav ? 'scrolling' : ""}`}>
                <div className="main-nav">
                    <div>
                        <NavLink className="btn" title="home" to="/">
                            <h1 className={`logo  ${(isHomePage && scrollingHeader && window.scrollY > 25)
                                || (!isHomePage || window.innerWidth < 768) ? "scrolling" : ""}`}>Tenner</h1>
                        </NavLink>
                    </div>
                    <div className="search-text">
                        {showFilter && <TextFilter onSetFilter={onSetFilterText} />}
                    </div>
                    <div className="nav-bar">
                        <ul className="ul">
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
                            {isLoginModalOpen && <LoginModal closeModal={closeModal} />}
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
                                                {isMenuOpen &&
                                                    <ul className="nav-popover-items-content" style={{ width: "auto" }}>
                                                        <li className="profile">
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
                                </div>
                            </li>
                        </ul>
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
