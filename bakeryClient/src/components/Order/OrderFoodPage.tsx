import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as foodTypeService from "../../services/foodTypeService";
import { FoodType } from "../../services/Models";
import "./styles/OrderFoodPage.scss";
import cake from "../../assets/cake-bg.jpg";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";


type FilterCategory =
    {
        [filterName: string]: boolean
    }

type FilterCategoryName = "toppings" | "fillings" | "bases";

type OrderFormState =
    {
        fillings: FilterCategory,
        toppings: FilterCategory,
        bases: FilterCategory
    }

const defaultOrderState: OrderFormState =
{
    fillings: {},
    toppings: {},
    bases: {}
}

export default function OrderFoodPage() {

    const { name } = useParams();
    const [orderForm, setOrderForm] = useState(defaultOrderState);
    const [foodTypeData, setFoodTypeData] = useState<FoodType>();
    const [LoadingSpinner, InitialFetchWithLoading, isLoading] = useLoadingSpinner(InitialFetch);

    async function InitialFetch(){
        const foodData: FoodType = await foodTypeService.ReadOneByName(name);
        const fillings: FilterCategory = {};
        foodData.fillings.forEach(value => {
            fillings[value.id] = false;
        })

        const toppings: FilterCategory = {};
        foodData.toppings.forEach(value => {
            toppings[value.id] = false;
        })

        const bases: FilterCategory = {};
        foodData.bases.forEach(value => bases[value.id] = false);

        setOrderForm({ fillings, toppings, bases });
        setFoodTypeData(foodData);
    };

    useEffect(() => {
        InitialFetchWithLoading();
    }, []);

    function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>, category: FilterCategoryName) {
        setOrderForm(o => (
            {
                ...o, [category]:
                {
                    ...o[category],
                    [e.target.name]: !o[category][e.target.name]
                }
            }
        ))
    }

    return (
        foodTypeData
            ?
            <form className="order-food-container">
                <div>
                    <h1>{foodTypeData.name}</h1>
                    <img src={cake} />
                </div>
                <div className="all-filters">
                    {
                        foodTypeData.fillings?.length &&

                        <div className="filter-container">
                            <h2>Fillings</h2>
                            {foodTypeData.fillings?.map((f) =>
                                <div>
                                    <label htmlFor={f.id.toString()}>{f.name}</label>
                                    <input
                                        type="checkbox" key={f.id} />
                                </div>)
                            }
                        </div>
                    }

                    {
                        foodTypeData.toppings.length > 1 &&

                        <div className="filter-container">
                            <h2>Toppings</h2>
                            {foodTypeData.toppings?.map((f) =>
                                <div key={f.id}>
                                    <label htmlFor={`${f.id}`}>{f.name}</label>
                                    <input
                                        type="checkbox"
                                        name={f.id.toString()}
                                        checked={orderForm.toppings[f.id]}
                                        onChange={(e) => handleCheckbox(e, "toppings")}
                                    />
                                </div>)
                            }
                        </div>

                    }

                    {
                        foodTypeData.bases?.length > 1 &&

                        <div className="filter-container">
                            <h2>Bases</h2>
                            {foodTypeData.bases?.map((f) =>
                                <div>
                                    <label htmlFor={`${f.id}`}>{f.name}</label>
                                    <input type="checkbox" key={f.id} />
                                </div>)
                            }
                        </div>
                    }
                    <button>Napred</button>
                </div>
        </form>
        :
            isLoading ?
                <div className="order-spinner-box">
                    <LoadingSpinner size={200} />
                </div> :
                <div>Try again later.</div>
    )
}
