import { FoodFormState } from "../components/Order/OrderFoodForm";
import { FoodType } from "./foodTypeService";

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
    fillings: string[],
    toppings: string[],
    bases: string[],
    containsLettering: boolean
}

export interface Order{
    foodId: number,
    fillings: number[],
    toppings: number[],
    bases: number[],
    containsLettering: boolean,
}

export interface User{
    phoneNumber: string,
    firstName: string,
    lastName: string,
    email?: string
}

// FUNCTIONS
const BASE_URL = "localhost:5279/orders";

export async function SubmitOrder(os: OrderSubmission){
    const response = await fetch(`${BASE_URL}`,
    {
        method: "POST",
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

export function MapFoodFormToClientView(form: FoodFormState, f: FoodType) {
    const orderClientView: OrderClientView =
    {
        fillings: [],
        toppings: [],
        bases: [],
        containsLettering: form.containsLettering
    };

    // METHOD: 
    // filter elements by that if the entry is true(eg. e[1] == true);
    // map the elements to their names using the foodType function argument
    const fillings = Object.entries(form.fillings)
        .filter(e => e[1])
        .map((e) => f.fillings[Number(e[0])].name);

    const toppings = Object.entries(form.toppings)
        .filter(e => e[1])
        .map((e) => f.fillings[Number(e[0])].name);

    const bases = Object.entries(form.bases)
        .filter(e => e[1])
        .map((e) => f.fillings[Number(e[0])].name);

    orderClientView.fillings = fillings;
    orderClientView.toppings = toppings;
    orderClientView.bases = bases;

    return orderClientView;
}
