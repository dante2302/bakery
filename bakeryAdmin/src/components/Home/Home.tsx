import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Home(){
    const { authData } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {!authData && navigate("/login")}
    , [authData])

    return (
        <div>
            <button>Requests</button>
            <button>Foods</button>
        </div>
    );
}