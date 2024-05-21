
import { Link, useNavigate } from "react-router-dom";
import { Cardboard, Email, FacebookLogo, InstagramLogo } from "../SVGs";
import NavLinkList from "./NavLinkList";
import "./styles/NavDesktop.scss";
import UseScroll from "../../hooks/UseScroll";

export default function NavDesktop() {
    const [verticalOffset] = UseScroll();
    const navigate = useNavigate();

    return (
        <nav>
            <div className={`upper-nav-wrap ${verticalOffset > 0 ? "disabled" : ""}`}>
                <div className={"upper-nav"}>
                    <div>
                        <div>
                            <Cardboard/>
                            <span>Доставки: 10:00 - 17:00</span>
                        </div>
                        <div className="email-div">
                            <Email />
                            <span>bakery123@bkr.com</span>
                        </div>
                    </div>
                    <div>
                        <InstagramLogo className="svgHover"/>
                        <FacebookLogo className="svgHover"/>
                    </div>
                </div>
            </div>
            <div className="lower-nav-wrap">
                <div className="lower-nav">
                    <div>
                        <div className="logo" onClick={() => navigate("/")}></div>
                        <NavLinkList />
                    </div>
                    <Link to="./order" className="order-btn">Поръчай</Link>
                </div>
            </div>
        </nav>
    )
}