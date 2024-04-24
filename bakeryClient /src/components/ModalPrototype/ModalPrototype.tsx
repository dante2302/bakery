import { PropsWithChildren } from "react";
import "./ModalPrototype.scss";

interface ModalProps extends PropsWithChildren{
 toggleModal: () => void;
}

export default function ModalPrototype({children, toggleModal}: ModalProps){
    return(
        <div className="modal">
            <div className="overlay" onClick={toggleModal}></div>
            {children}
        </div>
    )
}