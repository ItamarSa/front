import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { loadUser } from '../store/action/user.actions'
import { store } from '../store/store'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { utilService } from '../services/util.service'
import { GigList } from './GigList'
import { loadGigs, loadGigsUser } from '../store/action/gig.actions'
import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user.service'

export function UserDetails() {
  const [newImgUrl, setNewImgUrl] = useState('');

  const params = useParams()
  // const user = useSelector((storeState) => storeState.userModule.user)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
  const [user, setUser] = useState(userService.getLoggedinUser());


  async function handleImageUpload(uploadedImgUrl) {
    setNewImgUrl(uploadedImgUrl);
    console.log('New image URL:', uploadedImgUrl);

    // Update the user's imgUrl in the local user state
    setUser({ ...user, imgUrl: uploadedImgUrl });

    // Update the user's imgUrl in the database
    await userService.update({ _id: user._id, imgUrl: uploadedImgUrl });

    // Show a success message or perform any other necessary actions
    showSuccessMsg('User image updated successfully');
  }

  
  
  
  


  const userId = params.id
  useEffect(() => {
    loadUser(params.id)

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [params.id])
  useEffect(() => {
    try {
      loadGigsUser({ userId: params.id }); // Pass the filter object with userId
    } catch (err) {
      console.log('err:', err);
      showErrorMsg('Cannot load gigs');
    }
  }, [params.id]);


  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className='user-details'>
       
      <div className='info'>
        <img className="user-img" src={user.imgUrl} alt={user.username} />
        <h1 className='user-details-title'>User Details</h1>
        <p className='user-info-item'>
          <span className='user-info-label'>Name:</span> {user.username}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>Email:</span> {user.email}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>Member Since:</span>{utilService.timeAgo(new Date(user.createdAt))}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>From:</span> {user.from}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>Avg. response time:</span> {user.response+' hour'}
        </p>
        <p className='user-info-item'>
          <span className='user-info-label'>Last delivery:</span> {user.delivery+' days'}
        </p>
        <ImgUploader onUploaded={handleImageUpload} />
        
      </div>
      {/* <div className='user-details-profile'>
        <h3 className='user-details-subtitle'>{user.fullname}</h3>
        <div
          className='user-img'
          style={{
            backgroundImage: `url('/img/u${0}.png')`,
          }}
        />
        <pre className='user-details-json'>{JSON.stringify(user, null, 2)}</pre>
      </div> */}
      <div className='gigs'>
      <button className='user-details-button'>
          <Link className='user-details-button' to='/edit' >Add Gig Customize</Link>
        </button>
        <br />
        <GigList
          gigs={gigs}
        />
        

      </div>
    </section>
  )
}