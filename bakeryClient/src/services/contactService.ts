import { ContactFormState } from "../components/Contact/Contact";
const BASE_URL = "localhost:";

export async function sendMessage(formState: ContactFormState)
{
    try{
        await fetch(BASE_URL, {body: JSON.stringify(formState)});
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}