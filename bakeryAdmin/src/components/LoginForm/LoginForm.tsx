import { useState, ChangeEvent, useContext, ReactNode } from "react";
import "./LoginForm.css";
import * as adminService from "../../services/adminService";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

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

  let a = useNavigate();
  const { setAuthData } = useContext(AuthContext);
  const [formState, setFormState]  = useState<loginFormState>(defaultFormState);
  const [loginFail, setLoginFail] = useState<Boolean>(false);
  const [internalError, setInternalError] = useState<Boolean>(false);

  function formInputHandler(e: ChangeEvent<formInput>){
    setFormState((state: loginFormState) => (
      {...state, [e.target.name]: e.target.value}
    ));
  }

  async function submitHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault();
    handleResponse(undefined);
    const response = await adminService.Login(formState);
  }

  function handleResponse(response: adminService.LoginResponse | undefined){
    // if(!response)
    // {
    //   setInternalError(true);
    // }
    // else if(response.status == 401)
    // {
    //   setLoginFail(true);
    // }
    // else if(response.status == 201)
    // else
    // {
      setAuthData("asdasdsadsa");
      a("/");
    // }
  }


  return (
    <form className="login-form">
        {
          loginFail && 
          <p>greshni vhodni danni</p>
        }
        {
          internalError &&
          <p>Vutreshna greshka</p>
        }
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
