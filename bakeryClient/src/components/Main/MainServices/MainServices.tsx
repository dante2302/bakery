import { Cake, Candy, Cookie } from "../../SVGs"
import "./MainServices.scss";

export default function MainServices() {
    return (
        <div className="main-service-wrap">
            <div className="container">
                <h1>Какво Предлагаме</h1>
                <div className="inner">
                    <div className="food-type-container">
                        <Cookie />
                        <h2>Бисквити</h2>
                        <p>Хрупкави бисквити, направени с висококачествени съставки</p>
                    </div>
                    <div className="food-type-container">
                        <Cake />
                        <h2>Торти</h2>
                        <p>Ръчно изработени торти с уникален вкус и дизайн</p>
                    </div>
                    <div className="food-type-container">
                        <Candy />
                        <h2>Бонбони</h2>
                        <p>Изискани сладки изкушения, които разтварят в устата с вкусове</p>
                    </div>
                </div>
            </div>
        </div>
    )
}