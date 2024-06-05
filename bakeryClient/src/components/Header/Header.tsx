import "./Header.scss";
import bon from "../../assets/bon1.jpg"
import { Link } from "react-router-dom";
export default function Header(){
    return (
        <header>
            <div className="wrap">
                <div>
                    <h1>Добре дошли в <br></br>Пекарната на Боби</h1>
                    <p>Сладкарница, която предлага ръчно изработени шоколадови бонбони, бисквити и торти по поръчка. Всеки продукт е направен с внимание към детайла и използване на висококачествени съставки. Ние създаваме уникални вкусове и дизайни за специални поводи, които ще задоволят и най-изисканите вкусове.
</p>
                    <Link to="/about">Повече за нас</Link>
                </div>
                <img src={bon} className="img-temp" />
            </div>
        </header>
    )
}