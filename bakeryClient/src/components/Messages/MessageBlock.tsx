import SvgGreenCheckmark from "../SVGs/GreenCheckmark";
import SvgRedCrossBox from "../SVGs/RedCrossBox";
import "./styles/MessageBlock.scss";

interface messageProps {
    heading: string
    message: string,
    isSuccess: boolean | undefined,
    // additional styles passed down with classes
    additionalStyles?: string
}

export default function MessageBlock({heading,message, isSuccess, additionalStyles}: messageProps)
{
    return(
        <div className={`message-block ${additionalStyles}`}>
            <div>
                <h3>{heading}</h3>
                <p>{message}</p>
            </div>
                {isSuccess ? <SvgGreenCheckmark /> : <SvgRedCrossBox />}
        </div>
    )
}