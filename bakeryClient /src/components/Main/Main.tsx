import { Cake, Candy, Cookie } from "../SVGs"
import "./Main.scss";

export default function Main(){
    return(
        <main>
            <div className="wrap">
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
        </main>
    )
}