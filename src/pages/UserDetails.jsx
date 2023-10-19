import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { store } from '../store/store'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { utilService } from '../services/util.service'
import { GigList } from './GigList'
import { loadGigsUser } from '../store/action/gig.actions'
import { ImgUploader } from '../cmps/ImgUploader'
import { userService } from '../services/user.service'

export function UserDetails() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const [newImgUrl, setNewImgUrl] = useState(null)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await userService.getById(params.id)
        setUser(userData)
      } catch (error) {
      }
    }

    getUserData()
  }, [params.id])

  useEffect(() => {
    try {
      loadGigsUser({ userId: params.id })
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot load gigs')
    }
  }, [params.id])

  async function handleImageUpload(uploadedImgUrl) {
    setNewImgUrl(uploadedImgUrl)

    setUser({ ...user, imgUrl: uploadedImgUrl })

    await userService.update({ _id: user._id, imgUrl: uploadedImgUrl })

    showSuccessMsg('User image updated successfully')
  }

  if (user === null) {
    return <div>Loading user data...</div>
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
        <p className='user-info-item'>
          <span className='user-info-label'>Level:</span> {user.level}
        </p>
        <ImgUploader onUploaded={handleImageUpload} />
        
      </div>
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
