import LoginForm from "./LoginForm/LoginForm";
import bgimg from "../assets/bg-big.jpg";

export default function App() {
  return (
    //add routes
    //add user context
    // Main content - requests;
    // Sorting ^
    // Filtering ^
    // adding data - fillings, toppings, foodtypes
    // respond back option
    <div>
      <img src={bgimg} className="bg-img"/>
      <div className="bg-overlay"></div>
      <div className="center-container">
        <LoginForm />
      </div>
    </div>
  )
}

