import { PropsWithChildren } from "react"
import { LoadingSpinner } from "../../hooks/UseLoadingSpinner"
import ModalPrototype from "../ModalPrototype/ModalPrototype"
import "./styles/ConfirmationMessage.scss";

type props = PropsWithChildren & {
    message: string
    confirmCallback: (confirmation: boolean) => any
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    isLoading?: boolean
    LoadingSpinner?: LoadingSpinner
    show: boolean
}
export default function ConfirmationMessage({   
        message, 
        setShow, 
        show,
        confirmCallback,
        isLoading, 
        LoadingSpinner 
    }: props) {
        async function onSubmit(){
            await confirmCallback(true)
            setShow(false);
        }
    return (
        <ModalPrototype
            modalState={show}
            toggleModal={() => setShow(!show)}
        >
            <div className="confirmation-modal-content">
                <h1>{message}</h1>
                <div>
                <button className="yes-button"
                    onClick={() => onSubmit()}>
                    {
                        (!LoadingSpinner || !isLoading)
                            ?
                            "Да"
                            :
                            isLoading ? <LoadingSpinner color="white"/> : "Да"
                    }
                </button>
                <button className="no-button" 
                    onClick={() => {
                        confirmCallback(false)
                        setShow(false);
                }}>Не</button>
                </div>
            </div>
        </ModalPrototype>
    )
}