import { ContactFormState } from "../components/Contact/Contact";
const BASE_URL = "http://localhost:5279/contactmessages";

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