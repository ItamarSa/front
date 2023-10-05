import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/action/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { useEffect, useState } from 'react'
import { GigFilter } from './GigFilter'
import { setGigFilter } from '../store/action/gig.actions'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [showBusinessModal, setShowBusinessModal] = useState(false)
    const [showExploreModal, setShowExploreModal] = useState(false)
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)



    const closeModals = () => {
        setShowBusinessModal(false)
        setShowExploreModal(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', closeModals)
        return () => {
            document.body.removeEventListener('click', closeModals)
        }
    }, [])

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setGigFilter(filterBy)
    }

    return (
        <header className="app-header full">
            <button><NavLink title='home' to="/">Tenner</NavLink></button>
            <nav>
                <div className='main-nav'>

                    <button onClick={(e) => { e.stopPropagation(); setShowBusinessModal(!showBusinessModal) }}>Business solutions</button>
                    <button onClick={(e) => { e.stopPropagation(); setShowExploreModal(!showExploreModal) }}>Explore</button>
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
                    <button><NavLink title='Login' to="/login">Sign in  </NavLink></button>
                    <button> <NavLink title='Login' to="/login">Join</NavLink></button>
                    <button>  <NavLink title='gig' to="/gig">gigs</NavLink></button>
                    <GigFilter onSetFilter={onSetFilter} />


                    {user &&
                        <span className="user-info">
                            <Link to={`user/${user._id}`}>
                                {user.imgUrl && <img src={user.imgUrl} />}
                                {user.email}
                            </Link>
                            {/* <span className="score">{user.score?.toLocaleString()}</span> */}

                        </span>
                    }
                    {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}



                </div>
            </nav>




        </header>
    )
}
