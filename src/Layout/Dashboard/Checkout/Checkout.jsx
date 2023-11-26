import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import useCart from "../../../Hooks/useCart";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    console.log(transactionId);
    const axiosSecure = useAxiosSecure()
    // const [carts, refetch] = useCart()
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const totalPrice = carts.reduce((acc, item) => (acc + item.price), 0)
    const navigate = useNavigate()

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data);
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Annonymous',
                    name: user?.displayName || 'Annonymous',
                },
            },
        })

        if (confirmError) {
            console.log('confirm error');
        }
        else {
            console.log('paymentIntent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('tan id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }
        }
        const payments = {
            email: user.email,
            transactionId: paymentIntent.id,
            price: totalPrice,
            date: new Date(),
            cartIds: carts.map(cart => cart._id),
            foodIds: carts.map(cart => cart.foodId)
        }

        axiosSecure.post('/api/v1/payment', payments)
            .then(res => {
                // console.log(res.data);
                if (res.data.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You have logged in successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch()
                    navigate('/dashBoard/paymentHistory')
                }
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className=" bg-blue-400 hover:bg-blue-600 px-3 py-1 hover:text-white rounded-md mt-3" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                {
                    transactionId &&
                    <p className=" text-blue-500">Your transaction Id: {transactionId}</p>

                }
            </form>
        </div>
    );
};

export default Checkout;