import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/action/user.actions.js'
import { LoginSignup } from './LoginSignup.jsx'
import { useEffect, useState } from 'react'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [showExploreModal, setShowExploreModal] = useState(false);
    const filterBy = useSelector(storeState => storeState.gigModule.filterBy)


    const closeModals = () => {
        setShowBusinessModal(false);
        setShowExploreModal(false);
    };

    // Add event listener to the document body to close modals on click outside
    useEffect(() => {
        document.body.addEventListener('click', closeModals);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.body.removeEventListener('click', closeModals);
        };
    }, []);




    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.email}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.email}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }
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
    }

    return (
        <header className="app-header full">
<<<<<<< HEAD
            <button><NavLink title='home' to="/">LOGO</NavLink></button>
=======
            <button><NavLink title='home' to="/">Tenner</NavLink></button>
>>>>>>> 88e19a6988492d2a356446215ea205e3ccd8d47c
            <nav>
                <div className='main-nav'>

                    <button onClick={(e) => { e.stopPropagation(); setShowBusinessModal(!showBusinessModal); }}>Business solutions</button>
                    <button onClick={(e) => { e.stopPropagation(); setShowExploreModal(!showExploreModal); }}>Explore</button>
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
                    <button>🌐English</button>
                    <button><NavLink title='Login' to="/login">Sign in  </NavLink></button>
                    <button> <NavLink title='Login' to="/login">Join</NavLink></button>
                    <button>  <NavLink title='gig' to="/gig">gigs</NavLink></button>


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
