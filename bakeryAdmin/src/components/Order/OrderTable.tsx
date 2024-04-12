import { useEffect, useState } from "react";
import * as orderService from "../../services/orderService";
import "./styles/OrderTable.css";
import { dateToString } from "../../utils/dateUtils";

interface Order{
    name: string,
    foodType: string,
    email?: string
    phoneNumber?: string
    date: Date
}

export default function OrderTable(){
    const [currentOrders, setCurrentOrders] = useState<Order[]>([]);

    useEffect(() => {
        const a: Order = {
            name: "asd",
            foodType: "myAss",
            date: new Date(Date.now())
        }

        async function asyncEffect(){
            let requestList = await orderService.ReadAll();
            requestList && setCurrentOrders([...requestList, a]);
        }
        asyncEffect();
    }, [])

    return (
        <table className="order-table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>PhoneNumber</th>
                    <th>Food Type</th>
                    <th>Bonus</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {currentOrders.map((order) => 
                    <tr>
                        <td>{order.name}</td>
                        <td>{order.phoneNumber}</td>
                        <td>{order.email}</td>
                        <td>{order.foodType}</td>
                        <td>{order.foodType}</td>
                        <td>{dateToString(order.date)}</td>
                    </tr> 
                )}
                <tr>
                    <td>First Name</td>
                    <td>PhoneNumber</td>
                    <td>Food Type</td>
                    <td>Bonus</td>
                    <td>Date</td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>PhoneNumber</td>
                    <td>Food Type</td>
                    <td>Bonus</td>
                    <td>Date</td>
                </tr>
                <tr>
                    <td>First Name</td>
                    <td>PhoneNumber</td>
                    <td>Food Type</td>
                    <td>Bonus</td>
                    <td>Date</td>
                </tr>
            </tbody>
        </table>
    )
}