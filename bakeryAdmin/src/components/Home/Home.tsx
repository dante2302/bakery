import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";
import OrderTable from "../Order/OrderTable";
import OrdersPage from "../Order/OrdersPage";


type currentTab = "Orders" | "Foods";

export default function Home(){
    const { authData } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<currentTab>("Orders");

    useEffect(() => {!authData && navigate("/login")}
    , [authData])

    return (
        <div>
            <div>
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