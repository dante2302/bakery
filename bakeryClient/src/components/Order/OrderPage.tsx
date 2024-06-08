import { useEffect, useState } from "react";
import OrderFoodForm from "./OrderFoodForm";
import OrderUserForm from "./OrderUserForm";
import { Order, OrderSubmission, User } from "../../services/orderService";
import OrderConfirmation from "./OrderConfirmation";

export type OrderMode = "order" | "user" | "final";

export default function OrderPage() {
    const [mode, setMode] = useState<OrderMode>("order");
    const [orderState, setOrderState] = useState<OrderSubmission>({
        order: {} as Order, 
        user: {} as User
    });

    useEffect((() => (console.log(orderState))), [orderState]);

    switch(mode){
        case "order":
            return <OrderFoodForm changeMode={setMode} setOrderSubmissionState={setOrderState}/>;
        case "user": 
            return <OrderUserForm />;
        case "final":
            return <OrderConfirmation />;
        default: throw new Error("asdasdasd");
    }
}
