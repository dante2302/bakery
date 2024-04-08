import { useEffect, useState } from "react";
import * as orderService from "../../services/orderService";
import "./styles/OrderTable.css";

interface Order{
    name: string,
    foodType: string,
    email?: string
    phoneNumber?: string
    Date?: Date
}

export default function OrderTable(){
    const [currentOrders, setCurrentOrders] = useState<Order[]>([{name: "asd", phoneNumber: "9021930", foodType: "asd"}]);

    useEffect(() => {
        async function asyncEffect(){
            let requestList = await orderService.ReadAll();
            requestList && setCurrentOrders(requestList);
        }
        asyncEffect();
    }, [])

    return (
        <div className="order-grid">
            <div className="order-row">
                <h1>First Name</h1>
                <h1>PhoneNumber</h1>
                <h1>Food Type</h1>
                <h1>Bonus</h1>
                <h1>Date</h1>
            </div>
        </div>
    )
}