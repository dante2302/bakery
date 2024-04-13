import OrderTable from "./OrderTable";
import "./styles/AllOrdersPage.css"
export default function AllOrderPage(){
    return (
        <div className="Home-c">
            <form className="order-form">
                <input type="search" />
                <select id="sel" defaultValue={"Filter"}>
                    <option>Filter</option>
                    <optgroup label="Food Types">
                        <option>FoodType</option>
                        <option>Darin</option>
                    </optgroup>
                </select>
            </form>
            <OrderTable></OrderTable>
        </div>
    )
}