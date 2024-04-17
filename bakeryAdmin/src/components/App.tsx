import { AuthProvider } from "../contexts/AuthContext";
import { Route, Routes } from "react-router-dom";

import Home from "./Home/Home";
import LoginPage from "./LoginForm/LoginPage";
import OrderPage from "./Order/OrderPage";

export default function App() {

  return (
    // Sorting ^
    // Filtering ^
    // adding data - fillings, toppings, foodtypes
    // respond back option
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route path="orders/:id" element={<OrderPage />}></Route>
        </Routes>
    </AuthProvider>
  )
}

