import { useEffect, useState } from "react";
import * as orderService from "../../services/orderService";
import "./styles/OrderTable.css";
import { dateToString } from "../../utils/dateUtils";
import { useNavigate } from "react-router";

interface Order{
    id: number,
    name: string,
    foodType: string,
    email?: string
    phoneNumber?: string
    date: Date
}

export default function OrderTable(){
    const navigate = useNavigate();
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function asyncEffect(){
            let requestList = await orderService.ReadAll();
            requestList && setCurrentOrders([...requestList]);
        }
        asyncEffect();
    }, [])

    return (
        <table className="order-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>PhoneNumber</th>
                    <th>Email</th>
                    <th>Food Type</th>
                    <th>Bonus</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {currentOrders.map((order) => 
                    <tr onClick={() => navigate(`orders/${order.id}`)}>
                        <td>{order.name}</td>
                        <td>{order.phoneNumber}</td>
                        <td>{order.email}</td>
                        <td>{order.foodType}</td>
                        <td>Bonus</td>
                        <td>{dateToString(order.date)}</td>
                    </tr> 
                )}
            </tbody>
        </table>
    )
}