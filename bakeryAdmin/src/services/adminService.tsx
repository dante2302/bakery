import { loginFormState } from "../components/LoginForm/LoginForm";

const BASE_URL = "http://localhost:5279/fillings";
interface LoginResponse extends Response{
  Jwt?: string
}

export async function Login({username, password}: loginFormState){
  try{
    const raw = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          username, password
        })
    })
    const response: LoginResponse = await raw.json(); 
    console.log(response);
    return response.Jwt;
  }
  catch(e){
    console.log(e);
    return new Response();
  }
}
