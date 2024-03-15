const BASE_URL = "https://localhost:7620";
import { loginFormState } from "../components/LoginForm/LoginForm";

export async function Login(data: loginFormState){
  const response = await fetch(BASE_URL,{
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify(data)
  }) 

}
