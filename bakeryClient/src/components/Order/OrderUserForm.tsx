import { useEffect, useState } from "react"
import { OrderSubmission, OrderSubmissionClientView, User } from "../../services/orderService";
import * as formService from "../../services/formService";
import useValidate from "../../hooks/UseValidate";
import GetDefaultErrorState from "../../services/validationService";
import { OrderMode } from "./OrderPage";
import useLocalStorage from "../../hooks/UseLocalStorage";
import "./styles/OrderUserForm.scss";

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

        phoneNumber: {
            regex: /(.*?)/,
            message: ""
        }
    }
    const [userFormState, setUserFormState] = useLocalStorage("userData", defaultFormState);

    const propertyNames = Object.keys(defaultFormState);
    const defaultValidationErrors = GetDefaultErrorState(propertyNames);

    const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
    const [hasGotError, setHasGotError] = useState(true);
    const validate = useValidate(setValidationErrors, regexValidator);

    function FinishOrderClickHandler()
    {
        setOrderSubmissionState(os => ({ ...os, user: userFormState }));
        setOrderView(o => ({ ...o, user: userFormState }));
        changeMode("final");
    }

    useEffect(() => {
        if (Object.values(userFormState).some(v => v.length == 0)) {
            setHasGotError(true);
            return;
        }
        setHasGotError(Object.values(validationErrors).some(v => v.error));
    }, [validationErrors])

    return (
        <div className="outer-user-wrap">
        <form className="order-user-form">
            <h1 className="z">Данни за потребител</h1>
            <div className="input-container a">
                <label htmlFor="firstName">Име</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userFormState.firstName}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                    onBlur={(e) => validate(e)}
                />
            </div>

            <div className="input-container b">
                <label htmlFor="lastName">Фамилия</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userFormState.lastName}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                    onBlur={(e) => validate(e)}
                />
            </div>
            <div className="specialErrors">
                {validationErrors.firstName.error &&
                    <span>{validationErrors.firstName.message}</span>}
                {validationErrors.lastName.error &&
                    <span>{validationErrors.lastName.message}</span>}
            </div>

            <div className="input-container c">
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

            <div className="input-container d">
                <label htmlFor="phoneNumber">Телефон</label>
                <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={userFormState.phoneNumber}
                    onChange={(e) => formService.changeHandler(setUserFormState, e)}
                    onBlur={(e) => validate(e)}
                />
                {validationErrors.phoneNumber.error && 
                    <span>{validationErrors.phoneNumber.message}</span>}
            </div>
            <button className="e" onClick={() => changeMode("order")}>Назад</button>
            <button className="f" onClick={FinishOrderClickHandler} disabled={hasGotError}>Завърши Поръчка</button>
        </form></div>
    )
}