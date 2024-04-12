import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import OrdersPage from "../Order/OrdersPage";
import "./Home.css";


type currentTab = "Orders" | "Foods";

export default function Home(){
    const { authData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authData) {
            navigate("/login")
            return
        }
    }, [])

    const [currentTab, setCurrentTab] = useState<currentTab>("Orders");

    return (
        <div className="home-outer-grid">
            <div className="home-upper">
                <h6>Admin</h6>
                <button>Logout</button>
            </div>
            <div className="buttons">
                <button onClick={() => setCurrentTab("Orders")}>Orders</button>
                <button onClick={() => setCurrentTab("Foods")}>Foods</button>
            </div>
            {
                currentTab == "Orders" &&
                <OrdersPage />
            }
            {
                currentTab == "Foods" &&
                <div>

                </div>
            }
        </div>
    );
}