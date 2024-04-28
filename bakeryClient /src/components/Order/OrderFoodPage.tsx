import { useState } from "react";

export default function OrderFoodPage(){
    const [foodTypeData, setFoodTypeData] = useState();
    return(
        <div className="order-food-container">
            <img />
            <div className="filter-container">
                <h2>Fillings</h2>
                    <input type="checkbox" />
                <h2>Toppings</h2>
            </div>
        </div>
    )
}