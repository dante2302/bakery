import { useState, ChangeEvent, useContext } from "react";
import "./LoginForm.css";
import * as adminService from "../../services/adminService";
import { AuthContext } from "../../contexts/authContext";

export interface loginFormState{
  username: string,
  password: string
}

interface formInput extends HTMLInputElement{
  name: string,
  value: any
}

export default function LoginForm(){

  const defaultFormState: loginFormState = {
    "username" : "",
    "password": ""
  }    

  const { setAuthData } = useContext(AuthContext);
  const [formState, setFormState]  = useState<loginFormState>(defaultFormState);

  function formInputHandler(e: ChangeEvent<formInput>){
    setFormState((state: loginFormState) => (
      {...state, [e.target.name]: e.target.value}
    ));
  }

  async function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    //validateForm()
    await adminService.Login();
    //context.setLoggedIn;
  }

  return (
    <form className="login-form">
      <div className="input-container">
        <label htmlFor="adminUsername">Потребителско име</label>
        <input 
          type="text"
          id="adminUsername"
          name="username"
          value={formState.username}
          onChange={(e) => formInputHandler(e)}
          //onBlur={() => validate()}
        />
      </div>
      <div className="input-container">
        <label htmlFor="adminUsername">Парола</label>
        <input
          type="password"
          id="adminPassword"
          name="password"
          value={formState.password}
          onChange={(e) => formInputHandler(e)}
          //onBlur={() => validate()}
        />
      </div>
      <button onClick={(e) => submitHandler(e)}>Вход</button>
    </form>
  )
}
