import "./ProductShowcase.scss";
import cupcake from "../../../assets/straw-cupcake.jpg";
import weddingCake from "../../../assets/wedding-cake.jpg";
import keks from "../../../assets/keks.jpg";
import loveCandy from "../../../assets/love-candy.jpg";
import { Link } from "react-router-dom";

export default function ProductShowcase(){
    return(
        <div className="product-showcase-wrap">
            <div className="container">
                <h1>Специални продукти</h1>
                <ul className="product-grid">
                    <li>
                        <img src={cupcake} />
                        <span>Ягодов Къпкейк</span>
                        {/* <Link to="/order/cake">Поръчай</Link> */}
                    </li>
                    <li>
                        <img src={weddingCake} />
                        <span>Сватбена Торта</span>
                        {/* <Link to="/order/cake">Поръчай</Link> */}
                    </li>
                    <li>
                        <img src={loveCandy} />
                        <span>Романтични Бонбони</span>
                        {/* <Link to="/order/candy">Поръчай</Link> */}
                    </li>
                    <li>
                        <img src={keks} />
                        <span>Какаов Кекс</span>
                        {/* <Link to="/order/cake">Поръчай</Link> */}
                    </li>
               </ul>
            </div>
        </div>
    )
}