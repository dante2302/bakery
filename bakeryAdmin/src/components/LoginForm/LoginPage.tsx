import LoginForm from "./LoginForm";
import bgimg from '../../assets/bg-big.jpg';
import { useEffect } from "react";
import "./LoginPage.css"

export default function LoginPage() {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll"
        };
    }, []);

    return (
        <div>
            <img src={bgimg} className="bg-img" />
            <div className="bg-overlay"></div>
            <div className="center-container">
                <LoginForm />
            </div>
        </div>
    )
}