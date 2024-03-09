import { useState, ChangeEvent } from "react";
import "./LoginForm.css";

interface loginFormState{
    email: string,
    password: string
}

interface formInput extends HTMLInputElement{
    name: string,
    value: any
}

export default function LoginForm(){

    const defaultFormState: loginFormState = {
        "email" : "",
        "password": ""
    }    

    const [formState, setFormState]  = useState<loginFormState>(defaultFormState);

    function formInputHandler(e: ChangeEvent<formInput>){
        setFormState((state: loginFormState) => (
            {...state, [e.target.name]: e.target.value}
        ));
    }

    async function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
    }

    return (
        <form className="login-form">
            <div className="input-container">
                <label htmlFor="adminEmail">Имейл</label>
                <input 
                type="email"
                id="adminEmail"
                name="email"
                value={formState.email}
                onChange={(e) => formInputHandler(e)}
                />
            </div>
            <div className="input-container">
                <label htmlFor="adminPassword">Парола</label>
                <input
                    type="password"
                    id="adminPassword"
                    name="password"
                    value={formState.password}
                    onChange={(e) => formInputHandler(e)}
                />
            </div>
            <button onClick={(e) => submitHandler(e)}></button>
        </form>
    )
}