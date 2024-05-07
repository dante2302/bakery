const BASE_URL = "localhost:5792/foods"

export async function ReadOneByName(name: string | undefined)
{
    try{
        if(name == undefined)
        {
            return;
        }
        const response = await fetch(`${BASE_URL}?name=${name}`);
        return response.json();
    }

    catch(err){
        console.log(err);
        return;
    }
}