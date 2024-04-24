import { PropsWithChildren } from "react";
import "./ModalPrototype.scss";

export default function ModalPrototype({children}: PropsWithChildren){
    return(
        <div className="modal">
            <div className="overlay"></div>
            {children}
        </div>
    )
}