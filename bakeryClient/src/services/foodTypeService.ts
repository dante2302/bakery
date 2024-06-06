import { FoodType } from "./Models";

const BASE_URL = "http://localhost:5279/foodtypes/dto"
const alternative = "http://localhost:5279/foodtypes/4/detailed" ;
const nameMap = 
{
    cake: "Торта",
    candy: "Бонбони",
    cookie: "Бисквити",
}

export async function ReadOneByName(name: "cake" | "candy" | "cookie" | undefined)
{
    try{
        if(name == undefined)
        {
            return;
        }
// `${BASE_URL}/withName/${nameMap[name]}`
        const response = await fetch(alternative);

        const b = await response.json();
        const a = { ...b, name: "Торта" };

        console.log(JSON.stringify(a));

        const rp = await fetch(BASE_URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(a)
        })
    }

    catch(err){
        console.log(err);
        return;
    }
}


