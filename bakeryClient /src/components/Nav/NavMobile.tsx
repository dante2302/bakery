import { useState } from "react"
import ModalPrototype from "../ModalPrototype/ModalPrototype";
import { Hamburger } from "../SVGs";
import "./styles/NavMobile.scss";

export default function NavMobile(){
    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <nav className="nav">
            <div className="logo"></div>
            <Hamburger className="hamburger-btn"/>
            {
                isOpened ??
                <ModalPrototype>
                    <div></div>
                </ModalPrototype>
            }
        </nav>
    )
}