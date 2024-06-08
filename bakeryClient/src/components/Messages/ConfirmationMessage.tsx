import { PropsWithChildren } from "react"

type props = PropsWithChildren & {
    message: string
    setConfirmation: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ConfirmationMessage({ message, setConfirmation }: props) {
    return (
            <div>
                {message}
                <button onClick={() => setConfirmation(true)}>Да</button>
                <button onClick={() => setConfirmation(false)}>Не</button>
            </div>
    )
}