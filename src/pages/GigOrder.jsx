import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { utilService } from '../services/util.service';
import { orderService } from '../services/order.service';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { userService } from "../services/user.service";
import { useSelector } from "react-redux";

export function GigOrder() {
    const { gigId } = useParams();
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((storeState) => storeState.userModule.user)

    
    useEffect(() => {
        loadOrders();
    }, []);
    
    async function loadOrders() {
        try {
            const buyerId = user._id;
            const orders = await orderService.query({ buyerId });
            setOrders(orders);
            console.log('orders:', orders)
        } catch (err) {
            console.log('Had issues loading orders', err);
            showErrorMsg('Cannot load orders');
        }
    }

    // const toggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // };

    // const closeOnOutsideClick = (e) => {
    //     if (isModalOpen && !document.querySelector(".modal").contains(e.target) && e.target.className !== "modal-button") {
    //         setIsModalOpen(false);
    //     }
    // };

    // useEffect(() => {
    //     document.addEventListener("mousedown", closeOnOutsideClick);
    //     return () => {
    //         document.removeEventListener("mousedown", closeOnOutsideClick);
    //     };
    // }, [isModalOpen]);

    return (
        <div className="orders">
            {/* <button onClick={toggleModal} className="modal-button">
                {isModalOpen ? "Close" : "Orders"}
            </button> */}

            {/* {isModalOpen && ( */}
            {/* { ( */}
                {/* // <div className="modal">
                //     <div className="modal-content"> */}
                        <h2>All Orders</h2>
                        {orders.length === 0 ? (
                             <p className="no-orders-message">No orders yet</p>
                        ) : (
                            <div className="order-profile-container">
                                <ul className='order-profile-container clean-list'>
                                    {orders.map((order) => (
                                      <li className="order-profile-item clean-list" key={order._id}>
                                      <div className='order-wrapper flex fs20'>
                                        <div className='img-main flex '>
                                          <img className="order-profile-imgs" src={order.imgUrl[0]} alt="" />
                                        </div>
                                        <div className='order-details flex space-between'>
                                          <div className="left-col flex column space-between">
                                            <b className='title desc'>Description</b>
                                            <b className='title'>Ordered</b>
                                            <b className='title'>Buyer</b>
                                            <b className='title'>Price</b>
                                          </div>
                                          <div className="right-col flex column space-between">
                                            <span className="truncate-text desc">{order.title}</span>
                                            <span >{utilService.timeAgo(new Date(order.createdAt))}</span>
                                            <span >{' ' + order?.buyer.username}</span>
                                            <span >{' ' + order?.price}$</span>
                                          </div>
                                        </div>
                    
                                      </div>
                    
                                      <div className="order-info flex align-center">
                    
                    
    
                    
                                        <div className="txt-review stat">
                                          {/* <div>
                                            <span> <b>Status</b></span>
                                          </div> */}
                                          <div className='order-status'>
                                            <span style={{ color: orderService.getStatusColor(order.status) }}>{<b className='fs22'>{order.status}</b>}</span>
                                          </div>
                    
                    
                    
                                        </div>
                                      </div>
                    
                    
                    
                                    </li>
                                     
                                    ))}
                                </ul>
                            </div>
                            
                        )}
                        {/* <button onClick={toggleModal} className="modal-button">Close</button> */}
                    </div>
        //         </div>
        //     )}
        // </div>
    );
}