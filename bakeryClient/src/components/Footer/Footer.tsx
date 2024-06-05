import NavLinkList from "../Nav/NavLinkList";
import "./Footer.scss";

export default function Footer() {
    return (
        <footer>
            <div className="upper-footer">
                <div className="logo">
                </div>
                <div>
                    <h6>Lorem</h6>
                    <span>Lorem, ipsum dolor.</span>
                    <span>Lorem, ipsum dolor.</span>
                    <span>Lorem, ipsum dolor.</span>
                </div>
                <div>
                    <h6>Lorem</h6>
                    <a href="#">lorem</a>
                    <a href="#">lorem</a>
                    <a href="#">lorem</a>
                </div>
                <div>
                    <h6>Lorem</h6>
                    <span>Lorem, ipsum dolor.</span>
                    <span>Lorem, ipsum dolor.</span>
                    <span>Lorem, ipsum dolor.</span>
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