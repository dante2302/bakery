import { useEffect, useState } from "react"
import "./Contact.scss";
import * as formService from "../../services/formService";
import * as contactService from "../../services/contactService";
import MessageBlock from "../Messages/MessageBlock";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";
import useValidate from "../../hooks/useValidate";

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
            message: "Невалидно име."
        },
        message: {
            regex: /^[a-zA-Z0-9\s.,!?'"()&%-]*$/,
            message: "Съобщението ви съдържа недопустими символи."
        }
    }


    const [formState, setFormState] = useState(defaultFormState);
    const [requestSuccess, setRequestSuccess] = useState<boolean>();
    const [showMessage, setShowMessage] = useState<boolean>();
    const [LoadingSpinner, contactSubmitHandlerWithLoading, isLoading] = useLoadingSpinner(contactSubmitHandler);
    const [validationErrors, setValidationErrors] = useState(defaultValidationErrors);
    const validate = useValidate(setValidationErrors, regexValidator);
    // const navigate  = useNavigate();

    async function contactSubmitHandler(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const success = await contactService.sendMessage(formState);
        setRequestSuccess(success);
        setShowMessage(true);
        // setTimeout(() => {
        //     setShowMessage(false);
        //     success && navigate("/");
        // }, 2000)
    }

    useEffect(() => (console.table(validationErrors)), [validationErrors])

    return (
        <div className="outer-contact-wrap">
            <h1>Свържи се с нас</h1>
            <div className="inner-contact">
                <form>
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

                    <button onClick={(e) => contactSubmitHandlerWithLoading(e)}>
                        {isLoading ? <LoadingSpinner color={"#ffffff"} size={25}/>: "Изпрати"}</button>
                    {
                        showMessage && 
                        <MessageBlock 
                            heading={requestSuccess ? "Success! " : "Something Went Wrong..."} 
                            message={requestSuccess ? "Your Message was sent." : "An Error Happened"}
                            isSuccess={requestSuccess}
                            additionalStyles="contact-message-block"
                        />
                    }
                </form>
                <div>
                    <h6>Контакти</h6>
                    <span>asddasd@email.com</span>
                    <span>+35900128481</span>
                </div>
            </div>
        </div>
    )
}