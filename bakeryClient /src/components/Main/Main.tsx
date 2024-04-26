import "./Main.scss";
import MainServices from "./MainServices/MainServices";
import ProductShowcase from "./ProductShowcase/ProductShowcase";

export default function Main(){
    return(
        <main>
            <ProductShowcase />
            <MainServices />
        </main>
    )
}