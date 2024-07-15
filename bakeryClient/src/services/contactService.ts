import { ContactFormState } from "../components/Contact/Contact";
const BASE_URL = "https://bakery-backend-d.azurewebsites.net/contactmessages";

export async function sendMessage(formState: ContactFormState)
{
    try{
        await fetch(BASE_URL, { 
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formState),
            mode: "cors"
        });
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}