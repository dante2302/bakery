import LoginForm from "./LoginForm/LoginForm";
import bgimg from "../assets/bg-big.jpg";

export default function App() {
  return (
    <div>
      <img src={bgimg} className="bg-img"/>
      <div className="bg-overlay"></div>
      <div className="center-container">
        <LoginForm />
      </div>
    </div>
  )
}

