import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../Checkout/Checkout";
const pk = `${import.meta.env.VITE_GATEWAY_PK}`
const stripePromise = loadStripe(pk)

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <Checkout></Checkout>
            </Elements>
        </div>
    );
};

export default Payment;