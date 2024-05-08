import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

export default function NavLinkList({children}: PropsWithChildren){
    return(
        <div>
            {children}
            <Link to="/">Начало</Link>
            <Link to="/about">За нас</Link>
            <Link to="/contact">Контакти</Link>
        </div>
    )
}