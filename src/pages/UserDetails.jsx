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
      // console.log('seller:', seller)
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
  console.log('loggedInUser:', loggedInUser)
  console.log('isCurrentUser:', isCurrentUser)
  if (user === null) {
    return <div>Loading user data...</div>
  }

  // console.log('orders:', orders)

  return (
    <section className='user-details full'>
      <div className='user-container '>
        <div className='info'>
          <div className='user-img-container' onMouseEnter={() => setShowImgUploader(true)} onMouseLeave={() => setShowImgUploader(false)}>
            <div>
              <img className="user-profile-img" src={user?.imgUrl} alt={user?.username} />
              <div className='upload'>
                {showImgUploader && isCurrentUser && (
                 <ImgUploader onUploaded={handleImageUpload} useCustomSVG={true} />
                )}
              </div>
            </div>
          </div>
          <div className='user-name-info'>
            <div className='user-name'>
              <div className='name'>
                <span>
                  {user?.username}
                </span>
                <div className="EMfXbxY">
                  <svg className='XQskgrQ' width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.3628 2.30102L13.6796 0.618553C12.8553 -0.205791 11.521 -0.205916 10.6965 0.618522L0.778434 10.4718L0.0102775 15.1279C-0.0733163 15.6346 0.365528 16.0736 0.872371 15.99L5.52846 15.2218L15.3824 5.30374C16.2052 4.4809 16.2131 3.15127 15.3628 2.30102ZM6.26384 9.7364C6.39809 9.87065 6.57406 9.93774 6.75 9.93774C6.92593 9.93774 7.1019 9.87065 7.23615 9.7364L10.9558 6.01671L11.8486 6.90949L6.5625 12.2301V10.9377H5.0625V9.43774H3.77012L9.09072 4.15165L9.9835 5.04443L6.26381 8.76408C5.9954 9.03258 5.9954 9.4679 6.26384 9.7364ZM2.56662 14.3169L1.6834 13.4336L2.06278 11.1341L2.63778 10.5627H3.9375V12.0627H5.4375V13.3624L4.86618 13.9375L2.56662 14.3169ZM14.4099 4.33146L14.4083 4.33305L14.4067 4.33465L12.9058 5.8454L10.1548 3.09446L11.6656 1.59352L11.6672 1.59196L11.6687 1.5904C11.9546 1.30458 12.418 1.30105 12.7073 1.59037L14.3903 3.2733C14.699 3.58196 14.7009 4.04046 14.4099 4.33146Z"></path></svg>
                  <span className='new' style={{ borderRadius: '999px', borderColor: 'rgb(255, 98, 173)', backgroundColor: 'rgb(255, 98, 173)', color: 'rgb(255, 255, 255)' }}>new</span>
                </div>
              </div>

            </div>
            <div className='user-info-label'>
              {user?.store}
            </div>
            <div className="oneliner-wrapper">
              <div className="liner-and-pen">
                <span className="oneliner">
                </span>
                <p className="XQskgrQ _6Ri6JoV icn-edit" style={{ width: '12px', height: '12px', fill: 'rgb(181, 182, 186)' }}>
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
            <div className="buttons-wrapper">
              <div className="flex flex-col"
                style={{ flex: '1 1 0%' }}>
                <div className="FW1syM7 wapdb+q xaFER3a p9qU5Ka co-grey-1000 btn-view-as"
                  text="seller_card.view_as_buyer"
                  href="/yinonabc?public_mode=true">Preview Fiverr Profile</div>
              </div>
            </div>
          </div>
           <div className='user-stats-desc'>
            <ul className="user-stats with-border-top">
              <li className="location">
                <span className='from-user'>
                  <span className="XQskgrQ user-stats-icon" aria-hidden="true" style={{ width: '13px', height: '13px', fill: 'rgb(98, 100, 106)' }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0)">
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
                <b>{user?.from}</b>
              </li>
              <li className="member-since">
                <span className='since'>
                  <span className="XQskgrQ user-stats-icon" aria-hidden="true" style={{ width: '13px', height: '13px', fill: 'rgb(98, 100, 106)' }}>
                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 8C9.20938 8 11 6.20937 11 4C11 1.79063 9.20938 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8813 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8813 12.1187 9 9.8 9Z">
                      </path>
                    </svg>
                  </span>Member since</span>
                <b>{utilService.timeAgo(new Date(user?.createdAt))}</b>
              </li>
            </ul>
          </div>
          {/*<div id="FiverrLearn-component">
            <div className="fiverr-learn fiverr_learn-package sv" data-reactroot="">
              <header>
                <div className="W46fKfn k-kBZXW">
                  <span className="_5-fo9i5">
                    <img src="https://fiverr-res.cloudinary.com/image/upload/q_auto,f_png/v1/attachments/generic_asset/asset/6bef0aaa4d62dcf41383658e5e3211ee-1571214998624/fiverrlearn_logo.svg" alt="Learn from Fiverr" title="Learn from Fiverr" className="k-kBZXW" delay="120" content="[object Object]" position="right-top" boxclassname="_8UHHk5Q" boxcontentclassname="Yn90o2E" />
                  </span>
                </div>
              </header>
              <footer>
                <h5>Earn badges and stand out</h5>
                <p>Boost your sales, by boosting your expertise.</p>
                <a className="FW1syM7 L1yjt43 co-white bg-co-green-700" href="/fiverrlearn/thinkific">Enroll Now</a>
              </footer>
            </div>
          </div>
          <div id="BuyerSharedActivitySettings-component"><div className="P+AR+yL custom-buyer-shared-activity-settings" data-reactroot=""><h3 className="Tanhbnn tbody-5">Shared activity information</h3><p className="tbody-6">In order to provide the best possible work and service, some information about your activity on Fiverr may be shared with sellers.<a className="ciJrsAq">Manage settings</a></p></div></div> */}





        </div>
        <div className='main-content'>
          <div className="react-seller-gigs">
            <div data-reactroot="">
              <section className="seller-gigs cf">
                <figure className="empty-state">
                  <svg width="252" height="104" viewBox="0 0 252 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M250.641 96.0005H0.874023V102.711H250.641V96.0005Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M195.334 0.822754H110.963L92.077 95.9933H176.448L195.334 0.822754Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M98.027 66.0029H182.398" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M77.8599 84.1191H15.3289V96.0006H77.8599V84.1191Z" fill="#222325" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M81.2271 74.4419H18.6961V84.1192H81.2271V74.4419Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M72.4349 59.8315H12.4169V74.4419H72.4349V59.8315Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M76.4811 50.5669H16.4631V59.8383H76.4811V50.5669Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M52.2679 59.8315V74.4419" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M59.1 59.8315V74.4419" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M59.0999 59.8315H52.2679V74.4419H59.0999V59.8315Z" fill="#222325" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M22.749 55.1992H69.831" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M196.202 69.8657H229.473V79.3541C229.473 83.7653 227.72 87.9959 224.6 91.1151C221.479 94.2343 217.247 95.9867 212.834 95.9867V95.9867C208.422 95.9848 204.192 94.2317 201.073 91.1126C197.954 87.9936 196.202 83.7641 196.202 79.3541V69.8657Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M229.473 79.354C229.473 83.764 227.721 87.9935 224.602 91.1126C221.483 94.2316 217.253 95.9848 212.841 95.9866V95.9866C208.428 95.9866 204.196 94.2343 201.075 91.115C197.955 87.9958 196.202 83.7652 196.202 79.354" fill="#222325">
                    </path>
                    <path d="M229.473 79.354C229.473 83.764 227.721 87.9935 224.602 91.1126C221.483 94.2316 217.253 95.9848 212.841 95.9866V95.9866C208.428 95.9866 204.196 94.2343 201.075 91.115C197.955 87.9958 196.202 83.7652 196.202 79.354" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M235.416 82.0409C238.532 82.0409 241.058 79.5159 241.058 76.4011C241.058 73.2863 238.532 70.7612 235.416 70.7612C232.3 70.7612 229.774 73.2863 229.774 76.4011C229.774 79.5159 232.3 82.0409 235.416 82.0409Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M206.751 64.2257C208.235 62.5883 207.787 60.0623 206.751 57.0954C206.403 55.9619 206.371 54.7548 206.658 53.6043C206.945 52.4539 207.542 51.4037 208.382 50.5669" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M214.192 64.1067C214.64 61.5806 216.866 59.0616 215.382 55.7939C213.898 52.5261 211.812 51.1896 212.708 46.2915" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M219.967 63.4768C219.673 61.6994 220.772 60.356 221.451 57.8789C221.653 57.0598 221.688 56.2085 221.555 55.3755C221.421 54.5425 221.122 53.7448 220.674 53.0298" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M114.445 85.8049C117.764 82.7671 118.388 78.0494 115.84 75.2677C113.292 72.486 108.536 72.6936 105.217 75.7314C101.898 78.7693 101.274 83.487 103.822 86.2687C106.37 89.0504 111.126 88.8428 114.445 85.8049Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M125.558 77.8633H150.289" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M124.606 83.2725H141.763" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M167.53 74.3018L168.93 78.3602C168.941 78.364 168.954 78.364 168.965 78.3602L173.347 79.095C173.396 79.095 173.403 79.1649 173.347 79.1999L169.553 82.4467C169.549 82.4651 169.549 82.4842 169.553 82.5026L169.455 87.0159C169.455 87.0649 169.392 87.1069 169.35 87.0789L165.633 85.0287H165.577L161.132 87.0789C161.124 87.0891 161.112 87.0956 161.098 87.0969C161.085 87.0982 161.072 87.0942 161.062 87.0859C161.052 87.0775 161.045 87.0655 161.044 87.0523C161.043 87.0392 161.047 87.0261 161.055 87.0159L162.546 82.5026C162.553 82.4846 162.553 82.4647 162.546 82.4467L159.9 79.2349C159.894 79.2251 159.891 79.214 159.89 79.2026C159.89 79.1912 159.892 79.1798 159.897 79.1694C159.901 79.1591 159.909 79.1501 159.918 79.1432C159.927 79.1363 159.938 79.1317 159.949 79.1299L164.59 78.3952C164.608 78.4007 164.628 78.4007 164.646 78.3952L167.446 74.3368C167.453 74.2528 167.516 74.2528 167.53 74.3018Z" fill="#1DBF73" stroke="#1DBF73" strokeMiterlimit="10">
                    </path>
                    <path d="M104.537 33.1716C109.381 28.1475 128.435 17.7775 140.685 30.7156C152.935 43.6536 161.3 44.2134 171.8 38.9794C182.3 33.7454 188.523 35.3058 188.523 35.3058" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M173.662 0.822754C173.662 0.822754 147.062 35.5364 185.562 49.8949" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                    <path d="M137.859 28.4066C141.674 24.9146 142.392 19.4915 139.462 16.2937C136.533 13.0958 131.066 13.3342 127.251 16.8262C123.436 20.3181 122.718 25.7413 125.647 28.9391C128.577 32.137 134.044 31.8986 137.859 28.4066Z" fill="#222325" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10"></path>
                    <path d="M120.217 46.8441C123.241 54.7301 133.398 58.1727 142.897 54.5411C152.396 50.9095 157.66 41.5681 154.636 33.6611L120.217 46.8441Z" stroke="#222325" strokeWidth="1.5" strokeMiterlimit="10">
                    </path>
                  </svg>
                  <figcaption><h3>Ready to earn on your own terms?</h3>
                  </figcaption>
                </figure>
                <div className="seller-gigs-container">
                </div>
                <div className="popup-base js-popup-advanced-settings">
                  <header>
                    <div className='add-gig'>
                      {isCurrentUser && <button className='user-details-button'>
                        <Link className='user-details-button' to='/edit' >Add New Gig</Link>
                      </button>}
                    </div>                  </header>
                  <div className="popup-content advanced-settings-wrapper">
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div className='grey'></div>
          <div className='orders' >
            
            <ul className='order-profile-container'>
              {orders?.map((order) => (
                <li className="order-profile-item " key={order._id}>
                  {/* <div className="main-detils-profile "> */}
                  {/* <div>
                      <img className="order-profile-imgs" src={order.imgUrl[0]} alt="" />
                    </div> */}
                  {/* <div>
                      <img className="seller-imgs" src={order.seller.imgUrl} alt="" />
                    </div> */}
                  {/* </div> */}

                  <div className='img-main' >
                  <img className="order-profile-imgs" src={order.imgUrl[0]} alt="" />
                  </div>
                  <div className="order-info">
                  

                    <div className="txt-review ">
                     
                     
                      
                      
                      <b className='desc'>Description</b>
                      <div className='place-start'>
                        <span className="truncate-text desc">{order.title}</span>
                      </div>
                    </div>

                    <div className="txt-review ">
                     
                        <b>Ordered</b>
                     
                      
                        <div className='place-start'>
                          <span >{utilService.timeAgo(new Date(order.createdAt))}</span>
                        </div>
                      

                    </div>
                   
                    <div className='txt-review ' >
                      <div>
                        <b>Buyer </b>
                      </div>
                      <div className='place-start'>
                        <span >{' ' + order.buyer.username}</span>
                      </div>
                    </div>
                    <div className='txt-review  '>
                      <div>
                        <b className='price'>Price  </b>
                      </div>
                      <div className='place-start'>
                        <span >{' ' + order.price}$</span>
                      </div>
                    </div>
                    <div className="txt-review stat">
                      <div>
                      <span style={{ color: orderService.getStatusColor(order.status) }}>{<b>{order.status}</b>}</span>
                      </div>
                      {order.status==="Pending" && 
                       <div className='place-start'>
                       <select className='custom-select txt-review  '
                         value={order.status}
                         onChange={(e) => handleStatusChange(e, order._id)}
                       >
                         <option className='pending status' value="Pending">Pending</option>
                         <option className='approve status' value="Approve">Approve</option>
                         <option className='decline status' value="Decline">Decline</option>
                       </select> 
                       
                       </div>
                      }
                     
                      
                    </div>
                  </div>


                  {/* <div className='main-detils-profile' >
                    <div className='select-status'>
                      
                  {/* <div className='img-review  '>
                    <div>
                      <span><b>Byer Image</b></span> <img className='buyer-img' src={order.buyer.imgUrl} alt="" />
                    </div>
                  </div> */}
                  {/* </div>

                  </div> */}





                </li>
              ))}
            </ul>
          </div>
          <div className='grey'></div>
          {isCurrentUser && <div className='gigs-profile'>
            <GigList
              gigs={gigs} isCurrentUser={isCurrentUser}
            />

          </div>}
          


        </div>
      </div>


    </section>
  )
}
