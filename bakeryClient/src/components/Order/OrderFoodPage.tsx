import { useState } from "react";
import OrderFoodForm from "./OrderFoodForm";
import OrderUserForm from "./OrderUserForm";

export default function OrderFoodPage() {

    const [isUserForm, setIsUserForm] = useState(false);
    return(
        isUserForm 
            ?
            <OrderUserForm />
            :
            <OrderFoodForm changeState={setIsUserForm} />
    )
}
