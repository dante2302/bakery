import { Link } from "react-router-dom";
import candy from "../../assets/candy.jpg";
import cake from "../../assets/cake-bg.jpg";
import cookie from "../../assets/cookie.jpg";
import "./styles/OrderAll.scss";

export default function OrderAll(){
    return (
    <div className="order-all-container">
        <Link to="./cookie" className="card">
            <h2>Бисквити</h2>
            <img src={cookie} alt="" />
        </Link>
        <Link to="./cake" className="card">
            <h2>Торти</h2>
            <img src={cake} />
        </Link>
        <Link to="./candy" className="card">
            <h2>Бонбони</h2>
            <img src={candy} />
        </Link>
    </div>
    )
}