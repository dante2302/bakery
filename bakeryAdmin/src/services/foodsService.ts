const BASE_URL = 'localhost:5279/foods'
interface FoodType {


}

export async function ReadAll(){
    try{
        const raw = await fetch(`${BASE_URL}/all`,{
            method: "GET",
        });
        let orderList: FoodType[] = await raw.json();
        return orderList;
    }
    catch(e){
        console.log(e);
    }
}