import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "../Checkout/Checkout";
import { useLoaderData } from "react-router-dom";
const pk = `${import.meta.env.VITE_GATEWAY_PK}`
const stripePromise = loadStripe(pk)

const Payment = () => {
    const courseEnroled = useLoaderData()
    console.log(courseEnroled)
    return (
        <div className=" bg-blue-50 h-screen p-5 rounded-md">
            < Elements stripe={stripePromise}>
                {
                    courseEnroled?.map(courseItem => <Checkout
                        key={courseItem._id}
                        courseItem={courseItem}
                    ></Checkout>)}

            </Elements>
        </div >
    );
};

export default Payment;