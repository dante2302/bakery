import OrderTable from "./OrderTable";
import "./styles/AllOrdersPage.css"
export default function AllOrderPage(){
    return (
        <div className="Home-c">
            <form className="order-form">
                <input type="search" />
                    <select id="sel">
                        <option selected disabled>Filter</option>
                        <option>FoodType</option>
                        <option>Darin</option>
                    </select>
            </form>
            <OrderTable></OrderTable>
        </div>
    )
}