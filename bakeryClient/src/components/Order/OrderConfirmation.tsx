import { useState } from "react";
import { OrderSubmission, OrderSubmissionClientView, SubmitOrder } from "../../services/orderService"
import { BackArrow, EmailColored, Phone, UserIdCard } from "../SVGs";
import ShoppingBag from "../SVGs/ShoppingBag";
import UserCircle from "../SVGs/UserCircle";
import "./styles/OrderConfirmation.scss";
import ConfirmationMessage from "../Messages/ConfirmationMessage";
import MessageBlock from "../Messages/MessageBlock";
import { OrderMode } from "./OrderPage";
import useLoadingSpinner from "../../hooks/UseLoadingSpinner";

interface props {
    orderState: OrderSubmission
    orderView: OrderSubmissionClientView
    changeMode: React.Dispatch<React.SetStateAction<OrderMode>>
}
export default function OrderConfirmation({ orderView, orderState, changeMode }: props) {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [requestSuccess, setRequestSuccess] = useState<boolean>();
    const [LoadingSpinner, confirmHandlerWithLoading, isLoading] = useLoadingSpinner(confirmHandler);

    function submitClickHandler() {
        setShowConfirmation(true);
    }

    async function confirmHandler(confirmation: boolean) {
        if (!confirmation) return;
        const success = await SubmitOrder(orderState);
        setRequestSuccess(success);
        setShowMessage(true);
    }

    return (
        <>
            {showConfirmation &&
            <ConfirmationMessage 
                message={"Сигурни ли сте, че искате да завършите поръчката?"}
                setShow={setShowConfirmation}
                show={showConfirmation}
                confirmCallback={confirmHandlerWithLoading}
                isLoading={isLoading}
                LoadingSpinner={LoadingSpinner}
            />
            }
            <div className="order-confirmation-outer">
                <div>
                    <div className="order-detail-heading-div">
                        <ShoppingBag />
                        <h2>Данни за Поръчка</h2>
                    </div>

                    <div>
                        <h3 className="food-name">{orderView.order.name}</h3>
                        {
                            orderView.order.bases.length > 0 &&
                            <div>
                                <h4>Основа</h4>
                                <ul>
                                    {orderView.order.bases.map((b, i) =>
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
                                    {orderView.order.toppings.map((t, i) =>
                                        <li key={i}>{t}</li>
                                    )}
                                </ul>
                            </div>
                        }
                        {
                            orderView.order.containsLettering &&
                            <div className="containsLettering-container">
                                <label htmlFor="containsLetteringView">Изписване на букви</label>
                                <input
                                    type="checkbox"
                                    defaultChecked={true}
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
                        <div className="user-detail-heading-div">
                            <h2>Данни за Потребител</h2>
                            <UserCircle />
                        </div>
                        <div>
                            <div className="user-data-container">
                                <UserIdCard className="user-id-card" />
                                <h6>{orderView.user.firstName} {orderView.user.lastName}</h6>
                            </div>
                            <div className="user-data-container">
                                <EmailColored />
                                <h6>{orderView.user.email}</h6>
                            </div>
                            <div className="user-data-container">
                                <Phone />
                                <h6>{orderView.user.phoneNumber}</h6>
                            </div>
                        </div>
                    </div>
                    <div className={`submit-div ${requestSuccess ? "none" : ""}`}>
                        <button className="svg-button" onClick={() => changeMode("user")}><BackArrow /></button>
                        <button className="submit-button" onClick={submitClickHandler}>
                            "Завършване на поръчка"
                        </button>
                    </div>
                    {
                        showMessage &&
                        <MessageBlock
                            heading={requestSuccess ? "Поръчката ви беше изпратена успешно" : ""}
                            message={requestSuccess ? "Благодарим, че бяхте наши клиенти!" : "Съобщението ви не беше изпратено"}
                            isSuccess={requestSuccess}
                            additionalStyles="order-message-block"
                        />
                    }
                </div>
            </div>
        </>
    )
}