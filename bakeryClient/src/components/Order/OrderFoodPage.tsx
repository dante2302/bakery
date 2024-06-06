import { useEffect, useState } from "react";
import OrderFoodForm from "./OrderFoodForm";
import OrderUserForm from "./OrderUserForm";
import { Order, OrderSubmission, User } from "../../services/orderService";

export default function OrderFoodPage() {

    const [isUserForm, setIsUserForm] = useState(false);
    const [orderState, setOrderState] = useState<OrderSubmission>({
        order: {} as Order, 
        user: {} as User
    });

    useEffect((() => (console.log(orderState))), [orderState]);

    return(
        isUserForm 
            ?
            <OrderUserForm />
            :
            <OrderFoodForm changeMode={setIsUserForm} setOrderSubmissionState={setOrderState}/>
    )
}
