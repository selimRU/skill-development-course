import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const Checkout = ({ courseItem }) => {

    const { title, price, image, email } = courseItem
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    console.log(transactionId);
    const axiosSecure = useAxiosSecure()
    // const [carts, refetch] = useCart()
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    // const totalPrice = carts.reduce((acc, item) => (acc + item.price), 0)
    const navigate = useNavigate()

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    console.log(res.data);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [price])
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

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
            email: user?.email,
            transactionId: transactionId,
            price: price,
            date: new Date(),
            image: image,
            title: title,
            author_email: email
        }

        axiosSecure.post('/api/v1/payment', payments)
            .then(res => {
                if (res.data.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You have logged in successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/dashboard/myEnroledCourses')
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
                    Pay For Course
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