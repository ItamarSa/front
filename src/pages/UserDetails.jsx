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
  const [showImgUploader, setShowImgUploader] = useState(false);




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
          <div className='user-img-container' onMouseEnter={() => setShowImgUploader(true)} onMouseLeave={() => setShowImgUploader(false)}>
            <div>
              <img className="user-profile-img" src={user.imgUrl} alt={user.username} />
              <div className='upload'>
                {showImgUploader && isCurrentUser && (
                  <ImgUploader onUploaded={handleImageUpload} />
                )}
              </div>
            </div>
          </div>
          <div className='user-name-info'>
            <div className='user-name'>
              <div className='name'>
                <span>
                  {user.username}
                </span>
                <div className="EMfXbxY">
                  <svg className='XQskgrQ' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.3628 2.30102L13.6796 0.618553C12.8553 -0.205791 11.521 -0.205916 10.6965 0.618522L0.778434 10.4718L0.0102775 15.1279C-0.0733163 15.6346 0.365528 16.0736 0.872371 15.99L5.52846 15.2218L15.3824 5.30374C16.2052 4.4809 16.2131 3.15127 15.3628 2.30102ZM6.26384 9.7364C6.39809 9.87065 6.57406 9.93774 6.75 9.93774C6.92593 9.93774 7.1019 9.87065 7.23615 9.7364L10.9558 6.01671L11.8486 6.90949L6.5625 12.2301V10.9377H5.0625V9.43774H3.77012L9.09072 4.15165L9.9835 5.04443L6.26381 8.76408C5.9954 9.03258 5.9954 9.4679 6.26384 9.7364ZM2.56662 14.3169L1.6834 13.4336L2.06278 11.1341L2.63778 10.5627H3.9375V12.0627H5.4375V13.3624L4.86618 13.9375L2.56662 14.3169ZM14.4099 4.33146L14.4083 4.33305L14.4067 4.33465L12.9058 5.8454L10.1548 3.09446L11.6656 1.59352L11.6672 1.59196L11.6687 1.5904C11.9546 1.30458 12.418 1.30105 12.7073 1.59037L14.3903 3.2733C14.699 3.58196 14.7009 4.04046 14.4099 4.33146Z"></path></svg>
                  <span className='new' style={{ borderRadius: '999px', borderColor: 'rgb(255, 98, 173)', backgroundColor: 'rgb(255, 98, 173)', color: 'rgb(255, 255, 255)' }}>new</span>
                </div>
              </div>

            </div>
            <div className='user-info-label'>
              {user.store}
            </div>
            <div class="oneliner-wrapper">
              <div class="liner-and-pen">
                <span class="oneliner">
                </span>
                <p class="XQskgrQ _6Ri6JoV icn-edit" style={{ width: '12px', height: '12px', fill: 'rgb(181, 182, 186)' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3628 2.30102L13.6796 0.618553C12.8553 -0.205791 11.521 
                      -0.205916 10.6965 0.618522L0.778434 10.4718L0.0102775 15.1279C-0.0733163 15.6346 
                      0.365528 16.0736 0.872371 15.99L5.52846 15.2218L15.3824 
                      5.30374C16.2052 4.4809 16.2131 3.15127 15.3628 2.30102ZM6.26384 
                      9.7364C6.39809 9.87065 6.57406 9.93774 6.75 9.93774C6.92593 
                      9.93774 7.1019 9.87065 7.23615 9.7364L10.9558 6.01671L11.8486 
                      6.90949L6.5625 12.2301V10.9377H5.0625V9.43774H3.77012L9.09072 
                      4.15165L9.9835 5.04443L6.26381 8.76408C5.9954 9.03258 5.9954 
                      9.4679 6.26384 9.7364ZM2.56662 14.3169L1.6834 13.4336L2.06278 
                      11.1341L2.63778 10.5627H3.9375V12.0627H5.4375V13.3624L4.86618 
                      13.9375L2.56662 14.3169ZM14.4099 4.33146L14.4083 4.33305L14.4067 
                      4.33465L12.9058 5.8454L10.1548 3.09446L11.6656 1.59352L11.6672 
                      1.59196L11.6687 1.5904C11.9546 1.30458 12.418 1.30105 12.7073 
                      1.59037L14.3903 3.2733C14.699 3.58196 14.7009 4.04046 14.4099 4.33146Z">
                    </path>
                  </svg>
                </p>
              </div>
            </div>
            <div class="buttons-wrapper">
              <div class="flex flex-col"
                style={{ flex: '1 1 0%' }}>
                <div className="FW1syM7 wapdb+q xaFER3a p9qU5Ka co-grey-1000 btn-view-as"
                  text="seller_card.view_as_buyer"
                  href="/yinonabc?public_mode=true">Preview Fiverr Profile</div>
              </div>
            </div>
          </div>
          <div className='user-stats-desc'>
            <ul class="user-stats with-border-top">
              <li class="location">
                <span className='from-user'>
                  <span class="XQskgrQ user-stats-icon" aria-hidden="true" style={{ width: '13px', height: '13px', fill: 'rgb(98, 100, 106)' }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                        <path d="M5.38338 15.6772C0.842813 9.09472 0 8.41916 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6C12 8.41916 11.1572 9.09472 6.61662 15.6772C6.31866 16.1076 5.68131 16.1076 5.38338 15.6772ZM6 8.5C7.38072 8.5 8.5 7.38072 8.5 6C8.5 4.61928 7.38072 3.5 6 3.5C4.61928 3.5 3.5 4.61928 3.5 6C3.5 7.38072 4.61928 8.5 6 8.5Z">
                        </path>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="12" height="16">
                          </rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </span>From</span>
                <b>{user.from}</b>
              </li>
              <li class="member-since">
                <span className='since'>
                  <span class="XQskgrQ user-stats-icon" aria-hidden="true" style={{ width: '13px', height: '13px', fill: 'rgb(98, 100, 106)' }}>
                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8C9.20938 8 11 6.20937 11 4C11 1.79063 9.20938 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8813 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8813 12.1187 9 9.8 9Z">
                      </path>
                    </svg>
                  </span>Member since</span>
                <b>{utilService.timeAgo(new Date(user.createdAt))}</b>
              </li>
            </ul>
          </div>



        </div>
        <div className='main-content'>
          <div className='gigs'>
            <div className='add-gig'>
              {isCurrentUser && <button className='user-details-button'>
                <Link className='user-details-button' to='/edit' >Add Gig</Link>
              </button>}
            </div>

            <GigList
              gigs={gigs} isCurrentUser={isCurrentUser}
            />

          </div>


        </div>
      </div>
      <div className='orders' >
        <ul className='order-profile-container'>
          {orders?.map((order) => (
            <li className="order-profile-item " key={order._id}>
              <div className="main-detils-profile ">
                <div>
                  <img className="order-profile-imgs" src={order.imgUrl[0]} alt="" />
                </div>
                {/* <div>
                      <img className="seller-imgs" src={order.seller.imgUrl} alt="" />
                    </div> */}
              </div>
              <div className="description">
                <div className="order-desc-info">
                  <div className='txt-review'>
                    <div className="txt-review ">
                      <span><b>Description{'    '}</b></span>
                      <span style={{ fontFamily: 'macan-regular', fontWeight: '400', color: '#404145', marginTop: '13px' }}>{order.title}</span>
                    </div>

                    <div className="txt-review ">
                      <b>Ordered</b>
                      <span style={{ fontFamily: 'macan-regular', fontWeight: '400', color: '#404145' }}>{'   ' + utilService.timeAgo(new Date(order.createdAt))}
                      </span><br />
                    </div>

                    <div className="txt-review ">
                      <span  ><b>Status</b><span style={{ color: orderService.getStatusColor(order.status) }}>{'  ' + order.status}</span></span>
                    </div>

                    <div className='txt-review ' ><span ><b>Buyer </b>
                      <span style={{ fontFamily: 'macan-regular', fontWeight: '400', color: '#404145' }}>{' ' + order.buyer.username}</span>
                    </span> </div>

                    <div className='txt-review  '>
                      <span >
                        <b>Price  </b>
                        <span style={{ fontFamily: 'macan-regular', fontWeight: '400', color: '#404145' }}>{' ' + order.price}$</span>
                      </span></div>
                  </div>
                </div>
              </div>

              <div className='main-detils-profile' >
                <div className='select-status'>
                  <select className='custom-select txt-review  '
                    value={order.status}
                    onChange={(e) => handleStatusChange(e, order._id)}
                  >
                    <option className='pending status' value="Pending">Pending</option>
                    <option className='approve status' value="Approve">Approve</option>
                    <option className='decline status' value="Decline">Decline</option>
                  </select>
                  {/* <div className='img-review  '>
                    <div>
                      <span><b>Byer Image</b></span> <img className='buyer-img' src={order.buyer.imgUrl} alt="" />
                    </div>
                  </div> */}
                </div>

              </div>





            </li>
          ))}
        </ul>
      </div>

    </section>
  )
}
