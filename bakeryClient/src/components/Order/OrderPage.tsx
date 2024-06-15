import { useEffect, useState } from "react";
import OrderFoodForm from "./OrderFoodForm";
import OrderUserForm from "./OrderUserForm";
import { Order, OrderClientView, OrderSubmission,  OrderSubmissionClientView,  User } from "../../services/orderService";
import OrderConfirmation from "./OrderConfirmation";
import ErrorPage from "../ErrorBoundaries/ErrorPage";
import ScrollToTop from "../ScrollToTop";

export type OrderMode = "order" | "user" | "final";

export default function OrderPage() {
    const [mode, setMode] = useState<OrderMode>("order");

    const [orderState, setOrderState] = useState<OrderSubmission>({
        order: {} as Order, 
        user: {} as User
    });

    const [orderView, setOrderView] = useState<OrderSubmissionClientView>({
        order: {} as OrderClientView,
        user: {} as User
    });

    switch(mode){
        case "order":
            return <ScrollToTop>
                        <OrderFoodForm
                            changeMode={setMode}
                            setOrderSubmissionState={setOrderState}
                            setOrderView={setOrderView}
                        />
                    </ScrollToTop>
        case "user": 
            return <ScrollToTop>
                        <OrderUserForm 
                        changeMode={setMode} 
                        setOrderSubmissionState={setOrderState}
                        setOrderView={setOrderView}/>
                    </ScrollToTop>
        case "final":
            return  <ScrollToTop> 
                        <OrderConfirmation 
                        orderState={orderState}
                        orderView={orderView}/>
                    </ScrollToTop>
        default: return <ErrorPage />;
    }
}
