import { useState } from "react"
import { User } from "../../services/orderService";
import * as formService from "../../services/formService";
import useValidate from "../../hooks/useValidate";
import GetDefaultErrorState from "../../services/validationService";

export default function OrderUserForm(){
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
            message: "Невалидно име."
        },

        lastName: {
            //regex not allowing special characters
            regex: /^[a-zA-Z0-9.]+(?:[-'\s][a-zA-Z0-9.]+)*$/,

            message: "Невалиднa фамилия."
        },

        phoneNumber: {
            regex: /^(?:\d{10}|\+\d{1,14}|(?:\d+[-]?){0,3}\d{7,16})$/,

    //\d{10} |                      // Case 1: Exactly 10 digits
    //\+\d{1,14} |                  // Case 2: Starts with '+', 1 to 14 digits after '+'
    //(?:\d+[-]?){0,3}\d{7,16}      // Case 3: Up to 3 groups of digits followed optionally by a dash, remaining digits up to 16

            message: "Невалиден телефонен номер."
        },

        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Невалиден имейл."
        },
    }

    const [formState, setFormState] = useState(defaultFormState);

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
                    value={formState.firstName}
                    onChange={(e) => formService.changeHandler(setFormState, e)}
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
                    value={formState.lastName}
                    onChange={(e) => formService.changeHandler(setFormState, e)}
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
                    value={formState.phoneNumber}
                    onChange={(e) => formService.changeHandler(setFormState, e)}
                    onBlur={(e) => validate(e)}
                />
                {validationErrors.phoneNumber.error &&
                    <span>{validationErrors.phoneNumber.message}</span>}
            </div>

            <div className="input-container">
                <label htmlFor="email">Имейл</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => formService.changeHandler(setFormState, e)}
                    onBlur={(e) => validate(e)}
                />
                {validationErrors.email.error &&
                    <span>{validationErrors.email.message}</span>}
            </div>

            <button>Завърши Поръчка</button>
        </div>
    )
}