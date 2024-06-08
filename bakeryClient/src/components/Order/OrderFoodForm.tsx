import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as foodTypeService from "../../services/foodTypeService";
import { FoodType } from "../../services/Models";
import "./styles/OrderFoodPage.scss";
import cake from "../../assets/cake-bg.jpg";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";
import { FormToOrder, OrderSubmission, OrderSubmissionClientView } from "../../services/orderService";
import { OrderMode } from "./OrderPage";
import ErrorPage from "../ErrorBoundaries/ErrorPage";

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

interface FoodFormProps{
    changeMode: React.Dispatch<React.SetStateAction<OrderMode>>
    setOrderSubmissionState: React.Dispatch<React.SetStateAction<OrderSubmission>>
    setOrderView: React.Dispatch<React.SetStateAction<OrderSubmissionClientView>>
}

export default function OrderFoodForm({changeMode, setOrderSubmissionState}: FoodFormProps){
    const { name } = useParams();
    const navigate = useNavigate();
    const [foodForm, setFoodForm] = useState(defaultOrderState);
    const [foodTypeData, setFoodTypeData] = useState<FoodType>();
    const [LoadingSpinner, InitialFetchWithLoading, isLoading] = useLoadingSpinner(InitialFetch);

    async function InitialFetch(){
        if(!name || Object.keys(foodTypeService.nameMap).indexOf(name) == -1)
        {
            navigate("/404");
            return;
        }
        const foodData: FoodType = await foodTypeService.ReadOneByName(name);
        const [fillings, toppings, bases] = foodTypeService.MapFilterFromData(foodData);
        setFoodForm({ fillings, toppings, bases, containsLettering: false });
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
                                        checked={foodForm.fillings[f.id]}
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
                                        checked={foodForm.toppings[f.id]}
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
                            setOrderSubmissionState(o => ({...o, order: order}));
                            changeMode("user")
                        }}>Напред</button>
                </div>
        </form>
        :
            isLoading &&
                <div className="order-spinner-box">
                    <LoadingSpinner size={200} />
                </div> 
    )
}