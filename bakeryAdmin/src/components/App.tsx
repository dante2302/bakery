import LoginForm from "./LoginForm/LoginForm";
import bgimg from "../assets/bg-big.jpg";
import { AuthProvider } from "../contexts/authContext";

export default function App() {
  return (
    //add routes
    //add user context
    // Main content - requests;
    // Sorting ^
    // Filtering ^
    // adding data - fillings, toppings, foodtypes
    // respond back option
    <AuthProvider>
      <div>
        <img src={bgimg} className="bg-img"/>
        <div className="bg-overlay"></div>
        <div className="center-container">
          <LoginForm />
        </div>
      </div>
    </AuthProvider>
  )
}

