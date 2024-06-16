import "./Header.scss";
import bon from "../../assets/bon1.jpg"
import { Link } from "react-router-dom";
import useWindowDimensions from "../../hooks/UseWindowDimensions";
export default function Header(){
    const {width} = useWindowDimensions();
    const widthBoundary = 768;
    return (
        <header>
            <div className="wrap">
                <div>
                    <h1>Добре дошли в <br></br>Сладкарницата на Боби</h1>
                    <p>Сладкарница, която предлага ръчно изработени шоколадови бонбони, бисквити и торти по поръчка. Всеки продукт е направен с внимание към детайла и използване на висококачествени съставки. Ние създаваме уникални вкусове и дизайни за специални поводи, които ще задоволят и най-изисканите вкусове.
</p>
                <div className="link-div">
                    {width < widthBoundary && <Link to="/order">Поръчай</Link>}
                    <Link to="/about">Повече за нас</Link>
                </div>
                </div>
                <img src={bon} className="img-temp" />
            </div>
        </header>
    )
}