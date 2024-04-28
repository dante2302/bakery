import { Link } from "react-router-dom";
import candy from "../../assets/candy.jpg";
import cake from "../../assets/cake-bg.jpg";
import cookie from "../../assets/cookie.jpg";
import "./styles/OrderAll.scss";

export default function OrderAll(){
    return (
    <div className="order-all-container">
        <Link to="./cookie" className="card">
            <h2>Cookies</h2>
            <img src={cookie} alt="" />
            <p>Explore option one and its benefits.Explore option one,</p>
        </Link>
        <Link to="./cake" className="card">
            <h2>Cakes</h2>
            <img src={cake} />
            <p>Discover what choice two offers and why it's interesting.</p>
        </Link>
        <Link to="./candy" className="card">
            <h2>Candies</h2>
            <img src={candy} />
            <p>Learn more about the third choice and its unique features.</p>
        </Link>
    </div>
    )
}