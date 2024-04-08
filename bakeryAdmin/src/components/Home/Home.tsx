import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Home(){
    const { authData } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!authData){
           navigate("/login");
        }
        console.log(authData);
    }, [authData])

    return (
        <p>
            asdashdaskj
        </p>
    );
}