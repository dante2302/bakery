import { PropsWithChildren } from "react"

type props = PropsWithChildren & {
    message: string
    confirmCallback: (confirmation: boolean) => any
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ConfirmationMessage({ message, setShow, confirmCallback }: props) {
    return (
            <div>
                {message}
                <button onClick={() => 
                    {
                        confirmCallback(true)
                        setShow(false);
                    }}>Да</button>
                <button onClick={() => 
                    {
                        confirmCallback(false)
                        setShow(false);
                    }}>Ne</button>
            </div>
    )
}