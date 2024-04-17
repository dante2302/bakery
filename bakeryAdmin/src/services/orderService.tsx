const BASE_URL = "http://localhost:5279/orders";

interface UserDTO{

}

interface FoodTypeDTO{

}

interface OrderDTO{
    id: number,
    userData: UserDTO,
    date: Date,
    foodData: FoodTypeDTO,
    fillings: string[],
    toppings: string[]
}

export async function ReadAll(): Promise<OrderDTO[] | undefined>{
    try{
        const raw = await fetch(`${BASE_URL}/all`,{
            method: "GET",
        });
        console.log(raw);
        if(raw.status == 204){
          return;
        }
        const response = await raw.json();
        console.log(response);
        return response;
    }
    catch(e){
        console.log(e);
        return;
    }
}

export async function ReadAllFiltered(filter: string){

}
