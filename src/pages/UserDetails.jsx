import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { loadUser } from '../store/action/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { utilService } from '../services/util.service'

export function UserDetails() {

  const params = useParams()
  const user = useSelector((storeState) => storeState.userModule.user)
  { console.log('user:', user) }

  useEffect(() => {
    loadUser(params.id)

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [params.id])

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className='user-details'>
      {console.log('user:', user)}
      <h1 className='user-details-title'>User Details</h1>
      <p className='user-info-item'>
          <span className='user-info-label'>Name:</span> {user.userName}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>Email:</span> {user.email}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>Member Since:</span> {utilService.timeAgo(new Date(user.joined))}
        </p>
      <button className='user-details-button'>
      <Link className='user-details-button' to='/edit' >Add Gig Customize</Link>
      </button>
      <div className='user-details-profile'>
        <h3 className='user-details-subtitle'>{user.fullname}</h3>
        <div
          className='user-img'
          style={{
            backgroundImage: `url('/img/u${0}.png')`,
          }}
        />
        <pre className='user-details-json'>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </section>
  )
}