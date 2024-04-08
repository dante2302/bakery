import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";


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
                <button onClick={() => setCurrentTab("Orders")}>Requests</button>
                <button onClick={() => setCurrentTab("Foods")}>Foods</button>
            </div>
            {
                currentTab == "Orders" && 
                <table>
                    <th></th>
                </table>
            }
            {
                currentTab == "Foods" &&
                <div>

                </div>
            }
        </div>
    );
}