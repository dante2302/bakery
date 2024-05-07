const BASE_URL = "http://localhost:5279/foodtypes?id=2"

export async function ReadOneByName(name: string | undefined)
{
    try{
        if(name == undefined)
        {
            return;
        }
        const response = await fetch(BASE_URL);
        return response.json();
    }

    catch(err){
        console.log(err);
        return;
    }
}
