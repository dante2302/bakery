import { Link } from "react-router-dom";
import err from "../../assets/error.jpg";
import "./styles/ErrorPage.scss";

export default function ErrorPage()
{
    return (
        <div className="full">
            <img src={err} />
            <Link to="/" reloadDocument={true}>Начало</Link>
        </div>
    )
}