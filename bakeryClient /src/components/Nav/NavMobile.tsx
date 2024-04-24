import { useState } from "react"
import ModalPrototype from "../ModalPrototype/ModalPrototype";
import { Hamburger } from "../SVGs";
import "./styles/NavMobile.scss";
import NavLinkList from "./NavLinkList";

export default function NavMobile(){
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <nav className="nav">
            <div className="logo"></div>
            <Hamburger 
                className="hamburger-btn"
                onClick={(e) =>{ setIsOpened(true); }} 
            />
            {
                isOpened &&
                <ModalPrototype toggleModal={() => {setIsOpened(false)}}>
                    <div className="modal-content">
                        <NavLinkList>
                            <div onClick={(e) => {setIsOpened(false); e.stopPropagation()}}>X</div>
                        </NavLinkList>
                    </div>
                </ModalPrototype>
            }
        </nav>
    )
}