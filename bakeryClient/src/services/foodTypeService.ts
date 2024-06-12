import { FilterCategory } from "../components/Order/OrderFoodForm";

// INTERFACES
export interface FoodType{
    id: number,
    name: string,
    fillings: Filling[],
    toppings: Topping[],
    bases: Base[],
    canContainLettering: boolean
}

export interface Filling{
    id: number,
    name: string,
}

export interface Topping{
    id: number,
    name: string,
}

export interface Base{
    id: number,
    name: string,
}

// FUNCTIONS
const BASE_URL = "http://localhost:5279/foodtypes"
// const alternative = "http://localhost:5279/foodtypes/2/detailed" ;
// const updateUrl = "http://localhost:5279/foodtypes/dto";

export type NameMapName = "cake" | "candy" | "cookie";

export const nameMap = 
{
    cake: "Торта",
    candy: "Бонбон",
    cookie: "Бисквита",
}

export async function ReadOneByName(name: string | undefined)
{
    const response = await fetch(`${BASE_URL}/withName/${nameMap[name]}`);
    const a = await response.json();
    return a;
}

export function MapFilterFromData(foodData: FoodType)
{
    const fillings: FilterCategory = {};
    foodData.fillings.forEach(value => fillings[value.id] = false);

    const toppings: FilterCategory = {};
    foodData.toppings.forEach(value => toppings[value.id] = false);

    const bases: FilterCategory = {};
    foodData.bases.forEach(value => bases[value.id] = false);

    return [fillings, toppings, bases];
}