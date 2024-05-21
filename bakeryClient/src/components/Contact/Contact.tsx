import { useState } from "react"
import "./Contact.scss";
import * as formService from "../../services/formService";
import * as contactService from "../../services/contactService";
import MessageBlock from "../Messages/MessageBlock";

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

    const [formState, setFormState] = useState(defaultFormState);
    const [requestSuccess, setRequestSuccess] = useState<boolean>();
    const [showMessage, setShowMessage] = useState<boolean>();

    async function contactSubmitHandler(e: React.FormEvent<HTMLButtonElement>) {
        e.preventDefault();
        const success = await contactService.sendMessage(formState);
        setRequestSuccess(success);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 2000)
    }

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
                    />

                    <label htmlFor="email">Имейл</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) => formService.changeHandler(setFormState, e)}
                    />

                    <label htmlFor="message">Съобщение</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formState.message}
                        onChange={(e) => formService.changeHandler(setFormState, e)}
                    />

                    <button onClick={(e) => contactSubmitHandler(e)}>Изпрати</button>
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