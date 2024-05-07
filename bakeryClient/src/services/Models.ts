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
