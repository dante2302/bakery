import { OrderSubmission, OrderSubmissionClientView } from "../../services/orderService"

interface props{
    orderState: OrderSubmission
    orderView: OrderSubmissionClientView
}
export default function OrderConfirmation({orderView, orderState}: props)
{

    return (
        <div>
            <h1>Поръчка</h1>
            <div>
                <h2>Данни за поръчка</h2>
                
            </div>
            <div>
                <h2>Данни на потребител</h2>
            </div>
        </div>
    )
}