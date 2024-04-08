import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import * as orderService from "../../services/orderService";

interface Order{
    name: string,
    foodType: string,
    email?: string
    phoneNumber?: string
    Date: Date
}
export default function OrderTable({children}: PropsWithChildren){
    const [currentOrders, setCurrentOrders] = useState<[]>();

    useEffect(() => {
        async function asyncEffect(){
            let requestList = await orderService.ReadAll();
            setCurrentOrders(requestList);
        }
        asyncEffect();
    }, [])

    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Food Type</th>
            </tr>
            {children}
        </table>
    )
}