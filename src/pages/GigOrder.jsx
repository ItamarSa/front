import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from '../services/util.service'
import { orderService } from '../services/order.service'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addOrder } from "../store/action/gig.actions"
import { gigService } from "../services/gig.service.local"

export function GigOrder() {
    const { gigId } = useParams()
    const [reorder, setOrder] = useState(utilService.getEmptyOrder())
    const [orders, setOrders] = useState([])
    const [gig, setGig] = useState(null);

    useEffect(() => {
        loadOrders();
        // loadGigData(); // Call this to load the gig data
    }, [orders]); // Make sure to trigger the effect when gigId changes


    async function loadOrders() {
        try {
            const orders = await orderService.query({ gigId }); // Pass the gigId
            setOrders(orders);
        } catch (err) {
            console.log('Had issues loading orders', err);
            showErrorMsg('Cannot load orders');
        }
    }
    
    // const gig=loadGigData()

    // async function onCreateOrder() {
    //     const savedOrder = await orderService.add({
    //         buyer: buyer,
    //         gigId: gigId,
    //         sellerName: gig.owner,
    //         price: gig.price,
    //         title: gig.title
    //     })
    //     console.log('savedOrder:', savedOrder)
    //     // Update the orders state with the new order
    //     setOrders((prevOrders) => [...prevOrders, savedOrder]);
    //     // setOrder(utilService.getEmptyOrder());
    //     showSuccessMsg('Order saved!');
    //     console.log('savedOrder:', savedOrder)
    // }
    
    async function onRemoveOrder(orderId) {
        try {
            const removedOrderId = await orderService.remove(orderId);

            // Update the orders state by filtering out the removed order
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== removedOrderId));
            const orders = await orderService.query();
            console.log('orders:', orders)
            setOrders(orders);
            showSuccessMsg('Order removed!');
        } catch (err) {
            console.error('Error removing order:', err);
            showErrorMsg('Failed to remove order');
        }
    }
    if (orders.length === 0)
        <h1>Loading</h1>
    return (
        <div className="gig-order">
            {/* {console.log('gig:', gig)} */}
           
            <h5 className="order-description">Orders</h5>
            <ul>
                {orders.map((order) => (
                    <li key={order._id}>
                        GigId : {gig._id}
                        <br />
                        Buyer {order.buyer?.userName}
                        {/* {order.sellerName.userName} */}
                        <br />
                        Description : {gig.title}
                        <br />
                        Price :{gig.price}
                        <br />
                        Status :{order.status}
                        <br />
                        Seller :{gig.owner.userName}
                        <br />
                        Ordered :<p>{utilService.timeAgo(new Date(order.createdAt))}</p>
                        <img className="order-img" src={order.imgs[0]} alt="" />

                        <button type="button" onClick={() => onRemoveOrder(order._id)}>
                            ❌
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}