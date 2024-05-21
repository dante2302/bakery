import { ContactFormState } from "../components/Contact/Contact";
const BASE_URL = "localhost:5279/all";

export async function sendMessage(formState: ContactFormState)
{
    try{
        await fetch(BASE_URL, { 
            method: "POST",
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