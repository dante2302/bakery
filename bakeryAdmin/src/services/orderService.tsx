const BASE_URL = "http://localhost:5279/orders";

const defaultOrder = {
    id: 1,
    name: "asd",
    foodType: "My Ass",
    email: "asd@edgind",
    phoneNumber: "asd",
    date: new Date(Date.now())
}

interface Order{
    id: number,
    name: string,
    foodType: string,
    email?: string
    phoneNumber?: string
    date: Date
}

export async function ReadAll(): Promise<Order[]>{
    try{
        const raw = await fetch(`${BASE_URL}/all`,{
            method: "GET",
        });
        const response = await raw.json();
        return response;
    }
    catch(e){
        console.log(e);
        return [defaultOrder];
    }
}