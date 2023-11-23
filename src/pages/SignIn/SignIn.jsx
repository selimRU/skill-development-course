import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
'use client';
import imgLogIn from '../../assets/signin.png'
import { Button, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
// import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';


const SignIn = () => {

    const navigate = useNavigate()
    const { logIn, loginWithGoogle } = useAuth()
    const [disable, setDisable] = useState(true)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // google login
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have logged in successfully",
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')
            })
    }

    // handle capcha
    const handleCapcha = (e) => {
        const user_captcha_value = e.target.value
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false)
        }

    }
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const onSubmit = (data) => {
        logIn(data.email, data.password)
            .then(res => {
                console.log(res.user);
                const loggedUser = res.user
                if (loggedUser) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You have logged in successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate('/')
                }
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })
    }; // your form submit function which will invoke after successful validation

    return (
        <div className="max-w-6xl mx-auto my-10">
            <h3 className=" text-3xl text-center font-semibold my-5">Please Log in to Your Account</h3>
            <div className=" flex flex-col md:flex-row items-center gap-8">
                <div className=" w-full lg:w-1/2">
                    <img src={imgLogIn} alt="" />
                </div>
                <div className=" w-full lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email2" value="Your email" />
                            </div>
                            <TextInput {...register("email", { required: true })} id="email2" type="email" placeholder="Your email" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password" />
                            </div>
                            <TextInput {...register("password", { required: true })} id="password" type="password" placeholder="Your password" required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="capcha" value="Your capcha" />
                            </div>
                            <TextInput {...register("capcha", { required: true })} onBlur={handleCapcha} id="capcha" type="text" placeholder="Write capcha here" required shadow />
                        </div>
                        < LoadCanvasTemplate />
                        <Button disabled={disable} type="submit">LogIn</Button>
                        <Button onClick={handleGoogleLogin} className=" uppercase" outline gradientDuoTone="pinkToOrange">
                            <FaGoogle className=" mr-2" /> JoinwithGoole
                        </Button>
                    </form>
                    <h4 className=" text-center my-5">New here ? <Link to='/signup'><span className=" text-blue-600 underline">Please SignUp</span></Link></h4>
                </div>
            </div>
        </div>
    );
};

export default SignIn;