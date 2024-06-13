import { useState } from "react"
import { OrderSubmission, OrderSubmissionClientView, User } from "../../services/orderService";
import * as formService from "../../services/formService";
import useValidate from "../../hooks/useValidate";
import GetDefaultErrorState from "../../services/validationService";
import { OrderMode } from "./OrderPage";
import useLocalStorage from "../../hooks/UseLocalStorage";

type props = 
{
    changeMode: React.Dispatch<React.SetStateAction<OrderMode>>,
    setOrderSubmissionState: React.Dispatch<React.SetStateAction<OrderSubmission>>,
    setOrderView: React.Dispatch<React.SetStateAction<OrderSubmissionClientView>>
}
export default function OrderUserForm({changeMode, setOrderSubmissionState, setOrderView} : props){
    const defaultFormState: User = 
    {
        phoneNumber: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    const regexValidator = {
        firstName: {
            //regex not allowing special characters
            regex: /^[a-zA-Z0-9.]+(?:[-'\s][a-zA-Z0-9.]+)*$/,
            message: "Името не може да съдържа следните символи: \n! @ # $ % ^ & * () _ + = {} [] | \ : ;"
        },

        lastName: {
            //regex not allowing special characters
            regex: /^[a-zA-Z0-9.]+(?:[-'\s][a-zA-Z0-9.]+)*$/,

            message: "Името не може да съдържа следните символи: \n! @ # $ % ^ & * () _ + = {} [] | \ : ;"
        },

        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Невалиден имейл."
        },
    }

    const [userFormState, setUserFormState] = useLocalStorage("userData", defaultFormState);

    const propertyNames = Object.keys(defaultFormState);
    const defaultValidationErrors = GetDefaultErrorState(propertyNames);

    const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
    const validate = useValidate(setValidationErrors, regexValidator);

    return (
        <div>
            <div className="input-container">
                <label htmlFor="firstName">Име</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userFormState.firstName}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                    onBlur={(e) => validate(e)}
                />
                {validationErrors.firstName.error &&
                    <span>{validationErrors.firstName.message}</span>}
            </div>

            <div className="input-container">
                <label htmlFor="lastName">Фамилия</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userFormState.lastName}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                    onBlur={(e) => validate(e)}
                />
                {validationErrors.lastName.error &&
                    <span>{validationErrors.lastName.message}</span>}
            </div>

            <div className="input-container">
                <label htmlFor="phoneNumber">Телефон</label>
                <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={userFormState.phoneNumber}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                />
            </div>

            <div className="input-container">
                <label htmlFor="email">Имейл</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={userFormState.email}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                    onBlur={(e) => validate(e)}
                />
                {validationErrors.email.error &&
                    <span>{validationErrors.email.message}</span>}
            </div>
            <button onClick={() => changeMode("order")}>Nazad</button>
            <button onClick={() => 
            {
                console.log(setOrderView);
                setOrderSubmissionState(os => ({...os, user: userFormState}));
                setOrderView(o => ({...o, user: userFormState}));
                changeMode("final")
            }}>Завърши Поръчка</button>
        </div>
    )
}