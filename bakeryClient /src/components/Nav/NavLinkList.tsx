import { PropsWithChildren } from "react";

export default function NavLinkList({children}: PropsWithChildren){
    return(
        <div>
            {children}
            <a href="#">Начало</a>
            <a href="#">За нас</a>
            <a href="#">Контакти</a>
        </div>
    )
}