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
import { logout, updateUserImageUrl } from '../store/action/user.actions'
import { orderService } from '../services/order.service'

export function UserDetails() {
  const params = useParams()
  const [user, setUser] = useState(null)
  const [newImgUrl, setNewImgUrl] = useState(null)
  const gigs = useSelector(storeState => storeState.gigModule.gigs)
  const [orders, setOrders] = useState([])
  const seller = userService.getLoggedinUser()



  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await userService.getById(params.id)
        setUser(userData)
      } catch (error) {
        console.log('error:', error)
      }
    }

    getUserData()
  }, [params.id])

  useEffect(() => {
    try {
      loadGigsUser({ userId: params.id })
      loadOrders()
    } catch (err) {
      console.log('err:', err)
      showErrorMsg('Cannot load gigs')
    }
  }, [params.id])

  async function handleImageUpload(uploadedImgUrl) {
    setNewImgUrl(uploadedImgUrl)

    setUser({ ...user, imgUrl: uploadedImgUrl })

    await userService.update({ _id: user._id, imgUrl: uploadedImgUrl })
    store.dispatch(updateUserImageUrl(uploadedImgUrl));


    showSuccessMsg('User image updated successfully')
  }
  async function loadOrders() {
    try {
      const sellerId = seller?._id
      console.log('seller:', seller)
      const orders = await orderService.query({ sellerId })
      setOrders(orders)
    } catch (err) {
      console.log('Had issues loading orders', err)
      showErrorMsg('Cannot load orders')
    }
  }
  async function handleStatusChange(e, orderId) {
    const newStatus = e.target.value;
    console.log('orderId:', orderId); // Check if orderId is correct
    console.log('newStatus:', newStatus); // Check if newStatus is correct

    // Update the order's status in the component state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    try {
      // Send the updated status to your service
      await orderService.updateStatus(orderId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
      // Handle any errors or error responses
    }
  }





  const loggedInUser = userService.getLoggedinUser();
  const isCurrentUser = loggedInUser && loggedInUser._id === user?._id;
  if (user === null) {
    return <div>Loading user data...</div>
  }

  console.log('orders:', orders)

  return (
    <section className='user-details'>
      <div className='user-container'>
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
            <span className='user-info-label'>Avg. response time:</span> {user.response + ' hour'}
          </p>
          <p className='user-info-item'>
            <span className='user-info-label'>Last delivery:</span> {user.delivery + ' days'}
          </p>
          <p className='user-info-item'>
            <span className='user-info-label'>Level:</span> {user.level}
          </p>
          {isCurrentUser && <ImgUploader onUploaded={handleImageUpload} />}



        </div>
        <div className='main-content'>
          <div className='gigs'>
            {isCurrentUser && <button className='user-details-button'>
              <Link className='user-details-button' to='/edit' >Add Gig Customize</Link>
            </button>}

            <br />
            <GigList
              gigs={gigs} isCurrentUser={isCurrentUser}
            />
          </div>

          <h5 className="order-description"> Costumers Orders</h5>
          <div className='order-container'>
            <ul>
              {orders?.map((order) => (
                <li className="order-item" key={order._id}>
                  <div className="order-img-container">
                    <img className="order-imgs" src={order.imgUrl[0]} alt="" />
                  </div>
                  <div className="order-details">
                    <div className="order-info">

                      <div className="seller" >
                        <span>Description : {order.title}</span><br />
                        <span>Price : {order.price}</span><br />
                        <span >Seller : {' ' + order.seller.username}</span>
                      </div>
                      Status:
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e, order._id)}
                      >
                        <option className='pending' value="Pending">Pending</option>
                        <option className='approve' value="Approve">Approve</option>
                        <option className='decline' value="Decline">Decline</option>
                      </select>
                      <div className="status">
                        <span >Status : <span style={{ color: orderService.getStatusColor(order.status) }}>{order.status}</span></span>
                      </div>
                      <div>
                        <span>Ordered: {utilService.timeAgo(new Date(order.createdAt))}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
           
          </div>
        </div>
      </div>

    </section>
  )
}
