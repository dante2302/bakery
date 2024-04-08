const BASE_URL = "http://localhost:5279/orders";

export async function ReadAll(){
    try{
        const raw = await fetch(`${BASE_URL}/all`,{
            method: "GET",
        });
        const response = await raw.json();
        return response;
    }
    catch(e){
        console.log(e);
        return null;
    }
}