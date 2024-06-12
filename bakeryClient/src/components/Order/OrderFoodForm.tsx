import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as foodTypeService from "../../services/foodTypeService";
import { FoodType } from "../../services/Models";
import "./styles/OrderFoodPage.scss";
import cake from "../../assets/cake-bg.jpg";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";
import { FormToOrder, MapFoodFormToClientView, OrderSubmission, OrderSubmissionClientView } from "../../services/orderService";
import { OrderMode } from "./OrderPage";
import useLocalStorage from "../../hooks/UseLocalStorage";

export type FilterCategory =
    {
        [filterId: string]: boolean,
    }

type FilterCategoryName = "toppings" | "fillings" | "bases";

export type FoodFormState =
    {
        [fcn in FilterCategoryName]: FilterCategory
    }
    &
    {
        containsLettering: boolean
    }

const defaultOrderState: FoodFormState =
{
    fillings: {},
    toppings: {},
    bases: {},
    containsLettering: false
}

const defaultFoodData: FoodType = 
{
    id: -1,
    name: "",
    fillings: [],
    toppings: [],
    bases: [],
    canContainLettering:false, 
}

interface FoodFormProps{
    changeMode: React.Dispatch<React.SetStateAction<OrderMode>>
    setOrderSubmissionState: React.Dispatch<React.SetStateAction<OrderSubmission>>
    setOrderView: React.Dispatch<React.SetStateAction<OrderSubmissionClientView>>
}

export default function OrderFoodForm({changeMode, setOrderSubmissionState, setOrderView}: FoodFormProps){
    const { name } = useParams();
    const navigate = useNavigate();
    const [foodForm, setFoodForm] = useLocalStorage<FoodFormState>("foodForm", defaultOrderState);
    const [lastFood, setLastFood] = useLocalStorage("lastFood", name);
    const [foodTypeData, setFoodTypeData] = useLocalStorage<FoodType>("foodData", defaultFoodData);
    const [LoadingSpinner, InitialFetchWithLoading, isLoading] = useLoadingSpinner(InitialFetch);

    async function InitialFetch(){

        //if there's already a valid data in localStorage and its the same food, dont do anything
        if(foodTypeData.id > 0 && lastFood == name)return;

        if(!name || Object.keys(foodTypeService.nameMap).indexOf(name) == -1)
        {
            navigate("/404");
            return;
        }
        const foodData: FoodType = await foodTypeService.ReadOneByName(name);
        const [fillings, toppings, bases] = foodTypeService.MapFilterFromData(foodData);
        if (lastFood != name) {
            setFoodForm({ fillings, toppings, bases, containsLettering: false });
            setLastFood(name);
        }
        setFoodTypeData(foodData);
    };

    useEffect(() => {InitialFetchWithLoading()}, []);

    // useEffect(() => console.log(foodTypeData), [foodTypeData]);

    function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>, category: FilterCategoryName) {
        setFoodForm(o => (
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
            isLoading ?
                <div className="order-spinner-box">
                    <LoadingSpinner size={200} />
                </div> :
        foodTypeData
            &&
            <form className="order-food-container">
                <div>
                    <h1>{foodTypeData.name}</h1>
                    <img src={cake} />
                </div>
                <div className="all-filters">
                    {
                        foodTypeData.fillings?.length > 0 &&

                        <div className="filter-container">
                            <h2>Fillings</h2>
                            {foodTypeData.fillings?.map((f) =>
                                <div key={f.id}>
                                    <label htmlFor={f.id.toString()}>{f.name}</label>
                                    <input
                                        type="checkbox"
                                        name={f.id.toString()}
                                        checked={foodForm.fillings[f.id]}
                                        onChange={(e) => handleCheckbox(e, "fillings")}
                                    />
                                </div>)
                            }
                        </div>
                    }

                    {
                        foodTypeData.toppings.length > 0 &&

                        <div className="filter-container">
                            <h2>Toppings</h2>
                            {foodTypeData.toppings?.map((f) =>
                                <div key={f.id}>
                                    <label htmlFor={`${f.id}`}>{f.name}</label>
                                    <input
                                        type="checkbox"
                                        name={f.id.toString()}
                                        checked={foodForm.toppings[f.id]}
                                        onChange={(e) => handleCheckbox(e, "toppings")}
                                    />
                                </div>)
                            }
                        </div>

                    }

                    {
                        foodTypeData.bases?.length > 0 &&

                        <div className="filter-container">
                            <h2>Bases</h2>
                            {foodTypeData.bases?.map((f) =>
                                <div key={f.id}>
                                    <label htmlFor={`${f.id}`}>{f.name}</label>
                                    <input                                  
                                        type="checkbox"
                                        name={f.id.toString()}
                                        checked={foodForm.bases[f.id]}
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
                                checked={foodForm.containsLettering}
                                onChange={() => setFoodForm((o) => ({...o, containsLettering: !o.containsLettering}))}
                                />
                        </div>
                    </div>
                    <button onClick={
                        (e) => {
                            e.preventDefault();
                            const order = FormToOrder(foodForm, foodTypeData)
                            const orderView = MapFoodFormToClientView(foodForm, foodTypeData, name);
                            setOrderSubmissionState(o => ({...o, order}));
                            setOrderView(o => ({...o, order: orderView}))
                            changeMode("user")
                        }}>Напред</button>
                </div>
        </form>
    )
}