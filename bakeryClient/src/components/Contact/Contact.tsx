import { useEffect, useState } from "react"
import "./Contact.scss";
import * as formService from "../../services/formService";
import * as contactService from "../../services/contactService";
import MessageBlock from "../Messages/MessageBlock";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";
import useValidate from "../../hooks/UseValidate";
import useLocalStorage from "../../hooks/UseLocalStorage";

export interface ContactFormState extends formService.BaseFormState {
    name: string,
    email: string,
    message: string
}

export default function Contact() {
    const defaultFormState: ContactFormState =
    {
        name: "",
        email: "",
        message: ""
    };

    const defaultValidationErrors = {
        name: {
            error: false,
            message: ""
        },
        email: {
            error: false,
            message: ""
        },
        message: {
            error: false,
            message: ""
        }
    }

    const regexValidator = {
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Невалиден имейл."
        },
        name: {
            regex: /^[a-zA-Z0-9.]+(?:[-'\s][a-zA-Z0-9.]+)*$/,
            message: "Името не може да съдържа следните символи: \n! @ # $ % ^ & * () _ + = {} [] | \ : ;"
        },
        message: {
            regex: /^[a-zA-Z0-9\s.,!?'"()&%-]*$/,
            message: "Съобщението ви съдържа недопустими символи: \n! @ # $ % ^ & * () _ + = {} [] | \ : ;"
        }
    }


    const [formState, setFormState] = useLocalStorage("contactInfo", defaultFormState);
    const [requestSuccess, setRequestSuccess] = useState<boolean>();
    const [showMessage, setShowMessage] = useState<boolean>();
    const [LoadingSpinner, contactSubmitHandlerWithLoading, isLoading] = useLoadingSpinner(contactSubmitHandler);
    const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
    const validate = useValidate(setValidationErrors, regexValidator);
    const [hasError, setHasError] = useState(true);

    async function contactSubmitHandler(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const success = await contactService.sendMessage(formState);
        setRequestSuccess(success);
        setShowMessage(true);
    }

    useEffect(() => {
        console.log(validationErrors);
        const a = Object.values(validationErrors).some((v) => v.error);
        const b  = Object.values(formState).some((v) => v.length == 0)
        console.log(a);
        console.log(b);
        if(a || b)
        {
            setHasError(true);
        }
        else {setHasError(false)};
    }, [formState, validationErrors])

    return (
        <div className="outer-contact-wrap">
            <h1>Свържи се с нас</h1>
            <div className="inner-contact">
                <form>
                    <div className="input-container">
                    <label htmlFor="name">Име</label>
                    <input
                        type="text"
                        name="name"
                            id="name"
                            value={formState.name}
                            onChange={(e) => formService.changeHandler(setFormState, e)}
                            onBlur={(e) => validate(e)}
                        />
                        {validationErrors.name.error &&
                            <span>{validationErrors.name.message}</span>}
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

                    <div className="input-container">
                        <label htmlFor="message">Съобщение</label>
                        <textarea
                            name="message"
                            id="message"
                            value={formState.message}
                            onChange={(e) => formService.changeHandler(setFormState, e)}
                            onBlur={(e) => validate(e)}
                        />
                        {validationErrors.message.error &&
                            <span>{validationErrors.message.message}</span>}
                    </div>
                    <button onClick={(e) => contactSubmitHandlerWithLoading(e)} disabled={hasError}>
                        {isLoading ? <LoadingSpinner color={"#ffffff"} size={25}/>: "Изпрати"}</button>
                    {
                        showMessage && 
                        <MessageBlock 
                            heading={requestSuccess ? "Съобщението ви беше изпратено успешно" : "Нещо се обърка..."} 
                            message={requestSuccess ? "" : "Съобщението ви не беше изпратено"}
                            isSuccess={requestSuccess}
                            additionalStyles="contact-message-block"
                        />
                    }
                </form>
                <div>
                    <h6>Контакти</h6>
                    <span>bakery123@gmail.com</span>
                    <span>+35900128481</span>
                </div>
            </div>
        </div>
    )
}