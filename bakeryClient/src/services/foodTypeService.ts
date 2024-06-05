const BASE_URL = "http://localhost:5279/foodtypes/4/detailed"

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
