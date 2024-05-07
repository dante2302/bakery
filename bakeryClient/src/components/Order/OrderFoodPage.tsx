import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as foodTypeService from "../../services/foodTypeService";
import { FoodType, Filling, Topping, Base } from "../../services/Models";

type OrderState = 
{
    [filterKey: string]: boolean
}

const defaultOrderState: OrderState = 
{

}

export default function OrderFoodPage(){

    const { name } = useParams();
    const [orderForm, setOrderForm] = useState<OrderState>(defaultOrderState);
    const [foodTypeData, setFoodTypeData] = useState<FoodType>();
    const [fillings, setFillings] = useState<Filling[]>();
    const [toppings, setToppings] = useState<Topping[]>();
    const [bases, setBases] = useState<Base[]>();

    useEffect(() => {
        (async () => {
            const foodData: FoodType = await foodTypeService.ReadOneByName(name);
            setFoodTypeData(foodData);
            setFillings(foodData.fillings);
            setToppings(foodData.topping);
            setBases(foodData.bases);
        })(); 
    }, []);

    function handleCheckbox(e: React.MouseEvent<HTMLInputElement>){
        e.preventDefault();
        setOrderForm((orderForm: any) => (
            {
                ...orderForm,
                [e.currentTarget.name]: !orderForm[e.currentTarget.name]
            }
        ))
    }

    return(
        // foodTypeData 
        //     ?
            <form className="order-food-container">
                <h1>{foodTypeData?.name}</h1>
                <img />
                {/* {
                    fillings?.length && 
                <div className="filter-container">
                    <h2>Fillings</h2>
                    {fillings?.map((f) => 
                        <div>
                            <label htmlFor={f.id.toString()}></label>
                            <input 
                            type="checkbox" key={f.id} />
                        </div>)
                    }
                </div>
                } */}
                {
                    toppings?.length && 
                <div className="filter-container">
                    <h2>Toppings</h2>
                    {toppings?.map((f) => 
                        <div>
                            <label htmlFor={`${f.id}`}></label>
                            <input 
                                type="checkbox" 
                                key={f.id} 
                                name={f.id.toString()}
                                checked={orderForm[f.id]}
                                onClick={handleCheckbox}
                                />
                        </div>)
                    }
                </div>

                }
                {/* {bases?.length &&

                    <div className="filter-container">
                        <h2>Bases</h2>
                        {bases?.map((f) =>
                            <div>
                                <label htmlFor={`${f.id}`}></label>
                                <input type="checkbox" key={f.id} />
                            </div>)
                        }
                    </div>
                } */}
                </form>
            // :
            // <div>err</div>
    )
}