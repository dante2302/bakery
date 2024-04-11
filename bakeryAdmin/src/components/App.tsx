import LoginForm from "./LoginForm/LoginForm";
import bgimg from "../assets/bg-big.jpg";
import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext } from "react";
import Home from "./Home/Home";
import { Route, Routes } from "react-router-dom";

export default function App() {
  const { authData } = useContext(AuthContext);
  return (
    // Main content - requests;
    // Sorting ^
    // Filtering ^
    // adding data - fillings, toppings, foodtypes
    // respond back option
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="login" element={
            <div>
              <img src={bgimg} className="bg-img" />
              <div className="bg-overlay"></div>
              <div className="center-container">
                <LoginForm />
              </div>
            </div>
          }>
          </Route>
        </Routes>
    </AuthProvider>
  )
}

