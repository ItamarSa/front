import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login, logout, signup } from '../store/action/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ImgUploader } from './ImgUploader'
import { utilService } from '../services/util.service'
import { socketService , SOCKET_EMIT_SET_TOPIC} from '../services/socket.service'
// import { ImgUploader } from './ImgUploader'

export function LoginSignup({closeModal}) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
        createdAt: '',
        imgUrl: '',
        store: '',
        from: [],
        level: '',
        response: '',
        delivery: '',
        queue: '',
        reviews: ''
    })
    
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '', email: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function log(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.email}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        closeModal()
        if (!credentials.username) return
        log(credentials)
        clearState()
    }
    async function sign(credentials) {
        try {
            
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.email}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        closeModal()
        if (!credentials.username || !credentials.password || !credentials.email) return
        sign(credentials)
        clearState()
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    const { username, password, email } = credentials
    return (
        <div className='flex flex-col qeqNPA2'>
            <section className='_5WljZku m-b-24'>
                <section className="_5rRovJw">
                    <h4 className="vzvFWqe">{isSignup ? 'Create a new account' : 'Sign in to your account'}</h4>
                    <p className="_0vcWjbi p-t-8 _2VpvlgD"><span>{isSignup ? 'Already' : 'Don’t'} have an account? <span onClick={toggleSignup} role="button" className="UxOgbC1">{!isSignup ? 'Join here' : 'Sign in'}</span></span></p>
                </section>
                <div className='field'>
                    <section className='field-label'>
                        {/* <label for="login">Select Your username</label> */}
                    </section>
                    <div className='WvIqLXU H6Jxm4z field-input-wrapper'>
                        {!isSignup &&
                            <form className='' onSubmit={onLogin}>

                                <div>
                                    {/* <select className='GD3asS+ field-input custom-select' */}
                                    <input className='GD3asS+ field-input'

                                        type="text"
                                        name="username"
                                        value={username}
                                        placeholder="Username"
                                        onChange={handleChange}
                                        required
                                        autoFocus
                                    />
                                    <br /><br />
                                    <input
                                        className='GD3asS+ field-input'
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />


                                    <br /><br />
                                </div>

                                <button className='FW1syM7 Af0hvld co-white Kk1804g OCrkteb WMEjUS4 bg-co-black'>Sign In</button>
                            </form>}
                        {/* <p>
                            <button className='btn-link' ></button>
                        </p> */}

                    </div>
                    <div className='WvIqLXU H6Jxm4z field-input-wrapper'>
                        {isSignup &&
                            <form className='signup-form' onSubmit={onSignup}>
                                <input className='GD3asS+ field-input'
                                    type='text'
                                    name='email'
                                    value={credentials.email}
                                    placeholder='email'
                                    onChange={handleChange}
                                    required
                                />
                                <br /><br />
                                <input className='GD3asS+ field-input'
                                    type='text'
                                    name='username'
                                    value={credentials.username}
                                    placeholder='Username'
                                    onChange={handleChange}
                                    required
                                />
                                <br /><br />
                                <input className='GD3asS+ field-input'
                                    type='password'
                                    name='password'
                                    value={credentials.password}
                                    placeholder='Password'
                                    onChange={handleChange}
                                    required
                                />
                                {/* <ImgUploader onUploaded={onUploaded} /> */}
                                <button className='FW1syM7 Af0hvld co-white Kk1804g OCrkteb WMEjUS4 bg-co-black' >Continue</button>
                            </form>}
                        <p className="tbody-7 co-text-medium YGfvk+q">By joining, you agree to the Fiverr
                            <a className="oz+h+rw" href="/terms_of_service?store=false" target="_blank"
                                rel="noreferrer noopener">Terms of Service</a> and to occasionally receive emails from us. Please read our <a
                                    className="oz+h+rw" href="/privacy-policy?store=false"
                                    target="_blank" rel="noreferrer noopener">Privacy Policy
                            </a> to learn how we use your personal data.
                        </p>
                    </div>
                </div>
            </section>

            {/* <input
                        type='text'
                        name='username'
                        value={username}
                        placeholder='Username'
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type='password'
                        name='password'
                        value={password}
                        placeholder='Password'
                        onChange={handleChange}
                        required
                    /> */}
            {/* <button onClick={onLogout}>Logout</button> */}
        </div>

    )
}