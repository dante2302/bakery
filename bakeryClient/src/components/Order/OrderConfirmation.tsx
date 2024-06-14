import { OrderSubmission, OrderSubmissionClientView } from "../../services/orderService"
import SvgShoppingBag from "../SVGs/ShoppingBag";
import "./styles/OrderConfirmation.scss";

interface props{
    orderState: OrderSubmission
    orderView: OrderSubmissionClientView
}
export default function OrderConfirmation({orderView, orderState}: props)
{

    return (
        <div className="order-confirmation-outer">
            <div>
                <div className="before"></div>
                <div className="order-detail-heading-div">
                    <h2>Данни За Поръчка</h2>
                    <SvgShoppingBag />
                </div>
                <div className="after"></div>
                
                <div>
                    {
                        orderView.order.bases.length > 0 &&
                        <div>
                            <h4>Основа</h4>
                        <ul>
                            {orderView.order.bases.map((b,i) => 
                                <li key={i}>{b}</li>
                            )}
                        </ul>
                        </div>
                    }
                    {orderView.order.fillings.length > 0 &&
                        <div>
                            <h4>Пълнеж</h4>
                            <ul>
                                {orderView.order.fillings.map((f, i) =>
                                    <li key={i}>{f}</li>
                                )}
                            </ul>
                        </div>
                    }
                    {
                        orderView.order.toppings.length > 0 &&
                        <div>
                        <h4>Топинг</h4>
                        <ul>
                            {orderView.order.toppings.map((t,i) => 
                                <li key={i}>{t}</li>
                            )}
                        </ul>
                        </div>
                    }
                    {
                        orderView.order.containsLettering && 
                        <div> 
                            <label htmlFor="containsLetteringView">Изписване на букви</label>
                            <input 
                                type="checkbox" 
                                checked={true} 
                                disabled={true}
                                className="no-after"
                            />
                        </div>    
                    }
                    {
                        orderView.order.additionalMessage.length > 0 &&
                        <div className="additionalMessage-container">
                            <label htmlFor="additionaMessageView">Допълнения</label>
                        <textarea 
                            id="additionaMessageView"
                            maxLength={orderView.order.additionalMessage.length}
                            disabled={true}
                            defaultValue={orderView.order.additionalMessage}
                        />
                        </div>
                    }
                </div> 
            <div>
                <div className="before"></div>
                <h2>Данни за потребител</h2>
                <div className="after"></div>
                <div>
                    <h6>
                        Имена:
                        <span> {orderView.user.firstName} {orderView.user.lastName}</span>
                    </h6>
                    <h6>
                        Имейл:
                        <span> {orderView.user.email}</span>
                    </h6>
                    <h6>
                        Телефон:
                        <span> {orderView.user.phoneNumber}</span>
                    </h6>
                </div>
            </div>
            </div>
        </div>
    )
}