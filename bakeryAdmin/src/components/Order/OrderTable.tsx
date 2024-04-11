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
        <table>
            <tr>
                <th>First Name</th>
                <th>PhoneNumber</th>
                <th>Food Type</th>
                <th>Bonus</th>
                <th>Date</th>
            </tr>
        </table>
    )
}