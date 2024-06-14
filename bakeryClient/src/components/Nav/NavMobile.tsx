import { useState } from "react"
import ModalPrototype from "../ModalPrototype/ModalPrototype";
import { CloseButton, Hamburger } from "../SVGs";
import "./styles/NavMobile.scss";
import NavLinkList from "./NavLinkList";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function NavMobile() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="nav">
            <img src={logo} className="logo"/>
            <Hamburger
                className="hamburger-btn"
                onClick={() => setIsOpen(true)}
            />
            {isOpen &&
                <ModalPrototype
                    toggleModal={() => { setIsOpen(false) }}
                    modalState={isOpen}
                >
                    <div className="modal-content">
                        <NavLinkList>
                            <CloseButton
                                onClick={(e) => {
                                    setIsOpen(false);
                                    e.stopPropagation()
                                }}
                            />
                    <Link to="./order" className="order-btn">Поръчай</Link>
                        </NavLinkList>
                    </div>
                </ModalPrototype>
            }
        </nav>
    )
}