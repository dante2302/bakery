import "./ProductShowcase.scss"
export default function ProductShowcase(){
    return(
        <div className="product-showcase-wrap">
            <div className="container">
                <h1>Featured</h1>
                <h6>Lorem ipsum dolor sit amet.</h6>
                <ul className="product-grid">
                    <li>
                        <div className="temp-image green"></div>
                        <span>Strawberry Cake</span>
                        <button>View More</button>
                    </li>
                    <li>
                        <div className="temp-image red"></div>
                        <span>Strawberry Cake</span>
                        <button>View More</button>
                    </li>
                    <li>
                        <div className="temp-image pink"></div>
                        <span>Strawberry Cake</span>
                        <button>View More</button>
                    </li>
                    <li>
                        <div className="temp-image blue"></div>
                        <span>Strawberry Cake</span>
                        <button>View More</button>
                    </li>
               </ul>
            </div>
        </div>
    )
}