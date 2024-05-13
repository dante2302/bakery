import { useState } from "react"
import "./Contact.scss";
import * as formService from "../../services/formService";

export default function Contact(){
    interface ContactFormState extends formService.BaseFormState
    {
        name: string,
        email: string,
        message: string
    }
    const defaultFormState: ContactFormState  = 
    {
        name: "",
        email: "",
        message: ""
    };

    const [formState, setFormState] = useState(defaultFormState);

    function contactSubmitHandler(e: React.FormEvent<HTMLButtonElement>)
    {
        e.preventDefault();
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