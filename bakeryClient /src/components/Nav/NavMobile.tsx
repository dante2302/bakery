import { useState } from "react"
import ModalPrototype from "../ModalPrototype/ModalPrototype";
import { CloseButton, Hamburger } from "../SVGs";
import "./styles/NavMobile.scss";
import NavLinkList from "./NavLinkList";

export default function NavMobile(){
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="nav">
            <div className="logo"></div>
            <Hamburger 
                className="hamburger-btn"
                onClick={() => setIsOpen(true)} 
            />
            {
                isOpen &&
                <ModalPrototype toggleModal={() => {setIsOpen(false)}}>
                    <div className="modal-content">
                        <NavLinkList>
                            <CloseButton
                                onClick={(e) => 
                                    {
                                     setIsOpen(false); 
                                     e.stopPropagation() 
                                    }} 
                            />
                        </NavLinkList>
                    </div>
                </ModalPrototype>
            }
        </nav>
    )
}