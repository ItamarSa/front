import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { utilService } from '../services/util.service';
import { orderService } from '../services/order.service';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { userService } from "../services/user.service";

export function GigOrder() {
    const { gigId } = useParams();
    const [orders, setOrders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = userService.getLoggedinUser();

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const buyerId = user._id;
            const orders = await orderService.query({ buyerId });
            setOrders(orders);
        } catch (err) {
            console.log('Had issues loading orders', err);
            showErrorMsg('Cannot load orders');
        }
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeOnOutsideClick = (e) => {
        if (isModalOpen && !document.querySelector(".modal").contains(e.target) && e.target.className !== "modal-button") {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeOnOutsideClick);
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
        };
    }, [isModalOpen]);

    return (
        <div className="gig-order">
            <button onClick={toggleModal} className="modal-button">
                {isModalOpen ? "Close" : "Orders"}
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>All Orders</h2>
                        {orders.length === 0 ? (
                             <p className="no-orders-message">No orders yet</p>
                        ) : (
                            <div className="orders-list">
                                <ul>
                                    {orders.map((order) => (
                                        <li key={order._id}>
                                            <img className="order-img" src={order.imgs[0]} alt="" />
                                            GigId: {order.gigId}
                                            <br />
                                            Buyer: {order.buyer.userName}
                                            <br />
                                            Description: {order.title}
                                            <br />
                                            Price: {order.price}
                                            <br />
                                            Status: {order.status}
                                            <br />
                                            Seller: {order.seller}
                                            <br />
                                            Ordered: {utilService.timeAgo(new Date(order.createdAt))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                        )}
                        <button onClick={toggleModal} className="modal-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}