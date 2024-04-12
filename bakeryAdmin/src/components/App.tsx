import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext, useEffect } from "react";
import Home from "./Home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginForm/LoginPage";
import OrdersPage from "./Order/AllOrdersPage";
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
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="orders/:id" element={<OrdersPage />}></Route>
        </Routes>
    </AuthProvider>
  )
}

