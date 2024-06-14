
import { Link, useNavigate } from "react-router-dom";
import { Cardboard, Email, FacebookLogo, InstagramLogo } from "../SVGs";
import NavLinkList from "./NavLinkList";
import "./styles/NavDesktop.scss";
import UseScroll from "../../hooks/UseScroll";
import logo from "../../assets/logo.png";

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
                            <span>bakery123@gmail.com</span>
                        </div>
                    </div>
                    <div>
                        <a href=""><InstagramLogo className="svg-hover"/></a>
                        <a href=""><FacebookLogo className="svg-hover"/></a>
                    </div>
                </div>
            </div>
            <div className="lower-nav-wrap">
                <div className="lower-nav">
                    <div>
                        <img src={logo} onClick={() => navigate("/")} className="logo"/>
                        <NavLinkList />
                    </div>
                    <Link to="./order" className="order-btn">Поръчай</Link>
                </div>
            </div>
        </nav>
    )
}