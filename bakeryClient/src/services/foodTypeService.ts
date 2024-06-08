const BASE_URL = "http://localhost:5279/foodtypes"
// const alternative = "http://localhost:5279/foodtypes/2/detailed" ;
// const updateUrl = "http://localhost:5279/foodtypes/dto";
//
export const nameMap = 
{
    cake: "Торта",
    candy: "Бонбон",
    cookie: "Бисквита",
}

export async function ReadOneByName(name: string | undefined)
{
    try{
        if(!name || !Object.keys(nameMap).includes(name))
        {
            return;
        }

        const response = await fetch(`${BASE_URL}/withName/${nameMap[name]}`);
        return await response.json();
    }

    catch(err){
        console.log(err);
        return;
    }
}


