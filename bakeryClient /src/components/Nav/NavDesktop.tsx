
import { Cardboard, Email, FacebookLogo, InstagramLogo } from "../SVGs";
import NavLinkList from "./NavLinkList";
import "./styles/NavDesktop.scss";

export default function NavDesktop() {
    return (
        <nav>
            <div className="upper-nav-wrap">
                <div className="upper-nav">
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
                        <div className="logo"></div>
                        <NavLinkList />
                    </div>
                    <a href="#">Поръчай</a>
                </div>
            </div>
        </nav>
    )
}