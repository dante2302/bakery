import "./o.scss"
import candy from "../../assets/candy.jpg";
import cake from "../../assets/cake-bg.jpg";
import cookie from "../../assets/cookie.jpg";
import { Link } from "react-router-dom";

export default function OrderAll(){
    return (
    <div className="container">
        <Link to="./cake" className="card">
            <h2>Cookies</h2>
            <img src={cookie} alt="" />
            <p>Explore option one and its benefits.Explore option one,</p>
        </Link>
        <Link to="" className="card">
            <h2>Cakes</h2>
            <img src={cake} />
            <p>Discover what choice two offers and why it's interesting.</p>
        </Link>
        <Link to="" className="card">
            <h2>Candies</h2>
            <img src={candy} />
            <p>Learn more about the third choice and its unique features.</p>
        </Link>
    </div>
    )
}