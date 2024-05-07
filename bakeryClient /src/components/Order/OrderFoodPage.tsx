import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as foodTypeService from "../../services/foodTypeService";

export default function OrderFoodPage(){

    const { name } = useParams();
    const [foodTypeData, setFoodTypeData] = useState();
    useEffect(() => {
        foodTypeService.ReadOneByName(name);
    }, []);
    return(
        foodTypeData 
            ?
            <div className="order-food-container">
                <img />
                <div className="filter-container">
                    <h2>Fillings</h2>
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                </div>
                <div className="filter-container">
                    <h2>Toppings</h2>
                    <input type="checkbox" />
                    <input type="checkbox" />
                    <input type="checkbox" />
                </div>
            </div>
            :
            <div>err</div>
    )
}