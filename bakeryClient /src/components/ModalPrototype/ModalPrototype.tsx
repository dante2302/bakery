import { PropsWithChildren, useEffect, useState } from "react";
import "./ModalPrototype.scss";

interface ModalProps extends PropsWithChildren{
 toggleModal: () => void;
 modalState: boolean
}

export default function ModalPrototype({children, toggleModal, modalState}: ModalProps){
    const [isOn, setIsOn] = useState<boolean>();

    useEffect(() => {
        setIsOn(modalState);
    }, [modalState])

    return(
        <div className={`${isOn ? "modalOn" : ""} modal`}>
            <div className="overlay" onClick={toggleModal}></div>
            {children}
        </div>
    )
}