import NavLinkList from "../Nav/NavLinkList";
import "./Footer.scss";
import footerImg from "../../assets/footer-img.png";

export default function Footer() {
    return (
        <footer>
            <div className="upper-footer">
                <img src={footerImg} />
                <div>
                    <h6>Юридически</h6>
                    <a>Политика за Поверителност</a>
                    <a>Условия За Ползване</a>
                </div>
 
                <div>
                    <h6>Контакти</h6>
                    <span>bakery123@gmail.com</span>
                    <span>+35900128481</span>
                </div>
            </div>
            <hr />
            <div className="lower-footer">
                <div>Copyright@2024</div>
                <NavLinkList />
            </div>
        </footer>
    )
}