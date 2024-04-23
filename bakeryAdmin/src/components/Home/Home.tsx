import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import "./Home.css";
import AllOrderPage from "../Order/AllOrdersPage";
import orderSvg from "../../assets/order.svg";

type currentTab = "Orders" | "Foods" | "";

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
            <div className="home-buttons-outer">
                <div className="home-buttons-inner">
                    <img src={orderSvg}/>
                    <button
                        onClick={() => setCurrentTab("Orders")}
                        className={`${currentTab == "Orders" ? "curr-tab" : ""}`}
                    >Orders</button>
                </div>
                <div className="home-buttons-inner">
                <button 
                    onClick={() => setCurrentTab("Foods")}
                    className={`${currentTab == "Foods" ? "curr-tab" : ""}`}
                >Foods</button>
                </div>
                <div className="home-buttons-inner">
                <button 
                    onClick={() => setCurrentTab("Foods")}
                    className={`${currentTab == "Foods" ? "curr-tab" : ""}`}
                >Foods</button>
                </div>
            </div>
            {
                currentTab == "Orders" &&
                <AllOrderPage />
            }
            {
                currentTab == "Foods" &&
                <div>

                </div>
            }
        </div>
    );
}