import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as foodTypeService from "../../services/foodTypeService";
import { FoodType } from "../../services/Models";
import "./styles/OrderFoodPage.scss";
import cake from "../../assets/cake-bg.jpg";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";
import { Order, OrderSubmission } from "../../services/orderService";
import { OrderMode } from "./OrderPage";
import ErrorPage from "../ErrorBoundaries/ErrorPage";

type FilterCategory =
    {
        [filterId: string]: boolean
    }

type FilterCategoryName = "toppings" | "fillings" | "bases";

type OrderFormState =
    {
        [fcn in FilterCategoryName]: FilterCategory
    }
    &
    {
        containsLettering: boolean
    }

const defaultOrderState: OrderFormState =
{
    fillings: {},
    toppings: {},
    bases: {},
    containsLettering: false
}

interface FoodFormProps{
    changeMode: React.Dispatch<React.SetStateAction<OrderMode>>
    setOrderSubmissionState: React.Dispatch<React.SetStateAction<OrderSubmission>>
}

export default function OrderFoodForm({changeMode, setOrderSubmissionState}: FoodFormProps){
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

        setOrderForm({ fillings, toppings, bases, containsLettering: false });
        setFoodTypeData(foodData);
    };

    useEffect(() => {InitialFetchWithLoading()}, []);

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

    function toOrder(orderFormState: OrderFormState){
        const order: Order = 
        {
            foodId: foodTypeData.id,
            fillings: [],
            toppings: [],
            bases: [],
            containsLettering: false
        } 

        order.fillings = Object.entries(orderFormState.fillings)
            .filter(entry => entry[1])
            .map(prop => +prop[0]);
        order.toppings = Object.entries(orderFormState.toppings)
            .filter(entry => entry[1])
            .map(prop => +prop[0]);
        order.bases = Object.entries(orderFormState.bases)
            .filter(entry => entry[1])
            .map(prop => +prop[0]);

        return order;
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
                                        type="checkbox"
                                        name={f.id.toString()}
                                        checked={orderForm.fillings[f.id]}
                                        onChange={(e) => handleCheckbox(e, "fillings")}
                                    />
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
                                    <input                                  
                                        type="checkbox"
                                        name={f.id.toString()}
                                        checked={orderForm.bases[f.id]}
                                        onChange={(e) => handleCheckbox(e, "bases")}
                                    />
                                </div>)
                            }
                        </div>
                    }
                    <div className="filter-container">
                        <div>
                            <label htmlFor="canContainLettering">Изписване на букви</label>
                            <input 
                                type="checkbox"
                                name={"containsLettering"}
                                checked={orderForm.containsLettering}
                                onChange={() => setOrderForm((o) => ({...o, containsLettering: !o.containsLettering}))}
                                />
                        </div>
                    </div>
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            toOrder(orderForm)
                            setOrderSubmissionState(o => ({...o, order: toOrder(orderForm)}));
                            changeMode("order")
                        }}>Напред</button>
                </div>
        </form>
        :
            isLoading ?
                <div className="order-spinner-box">
                    <LoadingSpinner size={200} />
                </div> 
                :
                <ErrorPage />
    )
}