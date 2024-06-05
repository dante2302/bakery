const BASE_URL = "localhost:5279/orders";

interface OrderSubmission{
    order: Order,
    user: User
}

interface Order{
    foodId: number,
    fillings: number[],
    toppings: number[],
    bases: number[],
    ContainsLettering: boolean,
    userId: number
}

interface User{
    phoneNumber: string,
    firstName: string,
    lastName: string,
    email?: string
}

export async function SubmitOrder(os: OrderSubmission){
    const response = await fetch(`${BASE_URL}`,
    {
        method: "POST",
        body: JSON.stringify(os)
    })
    console.log(await response.json());
}