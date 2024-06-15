import { FoodFormState } from "../components/Order/OrderFoodForm";
import { FoodType, nameMap, NameMapName } from "./foodTypeService";

// INTERFACES 
export interface OrderSubmission{
    order: Order,
    user: User
}

export interface OrderSubmissionClientView
{
    order: OrderClientView,
    user: User,
}

export interface OrderClientView
{
    name: string
    fillings: string[],
    toppings: string[],
    bases: string[],
    containsLettering: boolean
    additionalMessage: string
}

export interface Order{
    foodId: number,
    fillings: number[],
    toppings: number[],
    bases: number[],
    containsLettering: boolean,
    additionalMessage: string
}

export interface User{
    firstName: string,
    lastName: string,
    email?: string
    phoneNumber: string,
}

// FUNCTIONS
const BASE_URL = "http://localhost:5279/orders/submit";

export async function SubmitOrder(os: OrderSubmission){
    const response = await fetch(`${BASE_URL}`,
    {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(os)
    })
    console.log(await response.json());
}

export function FormToOrder(orderFormState: FoodFormState, foodTypeData: FoodType)
{
    const order: Order =
    {
        foodId: foodTypeData.id,
        fillings: [],
        toppings: [],
        bases: [],
        containsLettering: false,
        additionalMessage: "",
        date: new Date()
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

export function MapFoodFormToClientView(form: FoodFormState, f: FoodType, name: NameMapName) {
    const orderClientView: OrderClientView =
    {
        name: nameMap[name],
        fillings: [],
        toppings: [],
        bases: [],
        containsLettering: form.containsLettering,
        additionalMessage: form.additionalMessage
    };

    // METHOD: 
    // filter elements by that if the entry is true(eg. e[1] == true)
    // map the elements to their names using the foodType function argument
    // NOTE: f.fillings always contains all the ids from form.fillings

    const fillings = Object.entries(form.fillings)
        .filter(e => e[1])
        .map((e) => f.fillings.find(o => o.id == Number(e[0]))?.name);

    const toppings = Object.entries(form.toppings)
        .filter(e => e[1])
        .map((e) => f.toppings.find(o => o.id == Number(e[0]))?.name);

    const bases = Object.entries(form.bases)
        .filter(e => e[1])
        .map((e) => f.bases.find(o => o.id == Number(e[0]))?.name);

    orderClientView.fillings = fillings;
    orderClientView.toppings = toppings;
    orderClientView.bases = bases;

    return orderClientView;
}
