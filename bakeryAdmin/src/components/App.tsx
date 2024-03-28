import LoginForm from "./LoginForm/LoginForm";
import bgimg from "../assets/bg-big.jpg";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext } from "react";

export default function App() {
  const {authData} = useContext(AuthContext);
  return (
    //add routes
    //add user context
    // Main content - requests;
    // Sorting ^
    // Filtering ^
    // adding data - fillings, toppings, foodtypes
    // respond back option
    <AuthProvider>
      {
        !authData && 
        <div>
          <img src={bgimg} className="bg-img" />
          <div className="bg-overlay"></div>
          <div className="center-container">
            <LoginForm />
          </div>
        </div>
      }
    </AuthProvider>
  )
}

