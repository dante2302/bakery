import "./Header.scss";
import temp from "../../assets/temp.jpg"
export default function Header(){
    return (
        <header>
            <div className="wrap">
                <div>
                    <h1>Welcome to our Bakery</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled.
</p>
                    <button>Know more about us</button>
                </div>
                <img src={temp} className="img-temp" />
            </div>
        </header>
    )
}