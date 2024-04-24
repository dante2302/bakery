import { Cake, Candy, Cookie } from "../../SVGs"
import "./MainServices.scss";

export default function MainServices() {
    return (
        <div className="main-service-wrap">
            <div className="container">
                <h1>Main Services We Provide</h1>
                <div className="inner">
                    <div className="food-type-container">
                        <Candy />
                        <h2>Candies</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, alias.</p>
                    </div>
                    <div className="food-type-container">
                        <Cake />
                        <h2>Cakes</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, alias.</p>
                    </div>
                    <div className="food-type-container">
                        <Cookie />
                        <h2>Cookies</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, alias.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}