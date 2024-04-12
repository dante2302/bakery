import OrderTable from "./OrderTable";

export default function OrdersPage(){
    return (
        <div className="Home-c">
            <form className="order-form">
                <input type="search" />
                <label htmlFor="sel">asd</label>
                <select id="sel">

                </select>
            </form>
            <OrderTable></OrderTable>
        </div>
    )
}