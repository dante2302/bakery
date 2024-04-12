import LoginForm from "./LoginForm";
import bgimg from '../../assets/bg-big.jpg';
export default function LoginPage() {
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