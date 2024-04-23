import emailSvg from "../../assets/email.svg";
import instagramLogo from "../../assets/instagram-logo.svg";
import facebookLogo from "../../assets/facebook-logo.svg";
import cardboard from "../../assets/open-cardboard-box-svgrepo-com.svg";

import "./styles/nav.scss";

export default function Nav() {
    return (
        <nav>
            <div className="upper-nav-wrap">
                <div className="upper-nav">
                    <div>
                        <div>
                            <img src={cardboard} alt="Dostavki" />
                            <span>Доставки: 10:00 - 17:00</span>
                        </div>
                        <div>
                            <img src={emailSvg} alt="Email: " />
                            <span>bakery123@bkr.com</span>
                        </div>
                    </div>
                    <div>
                        <a href="#"><img src={facebookLogo} alt="Instagram" /></a>
                        <a href="#"><img src={instagramLogo} alt="Facebook" /></a>
                    </div>
                </div>
            </div>
            <div className="lower-nav-wrap">

                <div className="lower-nav">
                    <div>
                        <div className="logo"></div>
                        <div>
                            <a href="#">Начало</a>
                            <a href="#">За нас</a>
                            <a href="#">Контакти</a>
                        </div>
                    </div>
                    <a href="#">Поръчай</a>
                </div>
            </div>
        </nav>
    )
}