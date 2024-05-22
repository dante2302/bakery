/*
 * A custom React hook for input validation based on regular expressions.
 * 
 * @template T - The type representing the validation error state.
 * 
 * @param setValidationErrors - A function to set the validation error state.
 * @param regexValidator - An object containing regular expression validators for each input.
 * 
 * @returns {Function} A validation function to be used in event handlers.
 * 
 * @example
 * // Usage in a functional component:
 * import React, { useState } from 'react';
 * import useValidate from './useValidate';
 * 
 * function MyForm() {
 *     const [validationErrors, setValidationErrors] = useState({});
 *     const regexValidator = {
 *         // Define regex validators for each input field
 *         username: {
 *             regex: /^[a-zA-Z0-9_]+$/,
 *             message: "Username can only contain letters, digits, and underscores."
 *         },
 *         email: {
 *             regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 *             message: "Invalid email address."
 *         },
 *         // Add more input fields and validators as needed
 *     };
 *     const validateInput = useValidate(setValidationErrors, regexValidator);
 * 
 *     const handleBlur = (e) => {
 *         validateInput(e);
 *     };
 * 
 *     return (
 *         <form>
 *             <input type="text" name="username" onBlur={handleBlur} />
 *             {validationErrors.username && <span>{validationErrors.username.message}</span>}
 *             
 *             <input type="email" name="email" onBlur={handleBlur} />
 *             {validationErrors.email && <span>{validationErrors.email.message}</span>}
 *         </form>
 *     );
 * }
 */
import * as formService from "../services/formService";

interface RegexValidator{
    [inputName: string]:{
        regex: RegExp
        message: string
    }
}

export default function useValidate<T>
    (setValidationErrors: React.Dispatch<React.SetStateAction<T>>,
        regexValidator: RegexValidator) {

    function validate<T extends formService.InputElement>
        (e: React.FocusEvent<T, Element>) {

        if (e.target.value.length < 1) {
            setValidationErrors(errors => ({
                ...errors,
                [e.target.name]: {
                    error: true,
                    message: "Полето е задължително."
                }
            }))
            return;
        }

        if (regexValidator[e.target.name]
            .regex
            .test(e.target.value)) {
            setValidationErrors(errors => ({
                ...errors,
                [e.target.name]: {
                    error: false,
                    message: ""
                }
            }))
        }
        else {
            setValidationErrors(errors => ({
                ...errors,
                [e.target.name]: {
                    error: true,
                    message: regexValidator[e.target.name].message
                }
            }))
        }
    }

    return validate;
}