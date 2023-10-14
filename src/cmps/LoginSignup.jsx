import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { login, logout, signup } from '../store/action/user.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { ImgUploader } from './ImgUploader'
// import { ImgUploader } from './ImgUploader'

export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', email: '',createdAt: new Date(),imgUrl:''})
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

    return (
        <div className='login-page'>
            <p>
                <button className='btn-link' onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            {!isSignup && <form className='login-form' onSubmit={onLogin}>
                <select
                    name='username'
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value=''>Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.email}</option>)}
                </select>
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
                <button onClick={onLogout}>Logout</button>
                <button>Login!</button>
            </form>}
            <div className='signup-section'>
                {isSignup && <form className='signup-form' onSubmit={onSignup}>
                    <input
                        type='text'
                        name='email'
                        value={credentials.email}
                        placeholder='email'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='text'
                        name='username'
                        value={credentials.username}
                        placeholder='Username'
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        value={credentials.password}
                        placeholder='Password'
                        onChange={handleChange}
                        required
                    />
                    <ImgUploader onUploaded={onUploaded} />
                    <button >Signup!</button>
                </form>}
            </div>
        </div>
    )
}