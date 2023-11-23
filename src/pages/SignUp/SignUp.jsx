import { useForm } from "react-hook-form";
'use client';
import imgSignup from '../../assets/signup.gif'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";


const SignUp = () => {
    // const axiosPublic = useAxiosPublic()
    const { createUser, profileUpdate, loginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(res => {
                // console.log(res.user);
                // const userInfo = {
                //     name: res.user.displayName,
                //     email: res.user.email
                // }
                // axiosPublic.post('/api/v1/users', userInfo)
                //     .then(res => {
                //         console.log(res.data);
                //         const loggedUser = res.data.insertedId
                //         if (loggedUser) {
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "User created successfully",
                //                 showConfirmButton: false,
                //                 timer: 1500
                //             })
                //             navigate('/')
                //         }
                //     })
            })
    }
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                profileUpdate(data.name, data.image_url)
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axiosSecure.post('http://localhost:5000/api/v1/users', userInfo)
                    .then(res => {
                        const loggedUser = res.data.insertedId
                        if (loggedUser) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "User created successfully",
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate('/')
                        }
                    })
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error.message}`,
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            })
    }
    return (
        <div className="max-w-6xl mx-auto my-10">
            <h3 className=" text-3xl text-center font-semibold my-5">Please Sign up Your Account</h3>
            <div className=" flex flex-col md:flex-row items-center gap-8">
                <div className=" w-full lg:w-1/2">
                    <img src={imgSignup} alt="" />
                </div>
                <div className=" w-full lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Your name" />
                            </div>
                            <TextInput {...register("name", { required: true })} id="name" type="text" placeholder="Your name" shadow />
                            {errors.name && <span className=" text-red-500" >Name is required</span>
                            }
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="Image url" value="Your image url" />
                            </div>
                            <TextInput {...register("image_url", { required: true })} id="image" type="text" placeholder="Your image url" shadow />
                            {errors.image_url && <span className=" text-red-500" >Image url is required</span>
                            }

                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email2" value="Your email" />
                            </div>
                            <TextInput {...register("email", { required: true, pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} id="email2" type="email" placeholder="Your email" shadow />
                            {errors.email?.type === "required" && <span className=" text-red-500" >Email is required</span>
                            }
                            {errors.email?.type === "pattern" && (
                                <span className=" text-red-500" >Valid email is required</span>
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password2" value="Your password" />
                            </div>
                            <TextInput {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /[A-Z](?=.*?[#?!@$%^&*-])[a-z]/ })} id="password2" type="password" placeholder="Your password" shadow />
                            {errors.password?.type === "required" && (
                                <span className=" text-red-500" >Password is required</span>
                            )}
                            {errors.password?.type === "minLength" && (
                                <span className=" text-red-500" >Password length is at least 6 characters required</span>
                            )}
                            {errors.password?.type === "pattern" && (
                                <span className=" text-red-500" >Password should have at least one uppercase ,one lowercase and one special characters</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox name="check" {...register("check", { required: true })} id="agree" />
                            <Label htmlFor="agree" className="flex">
                                I agree with the&nbsp;
                                <Link href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                                    terms and conditions
                                </Link>
                            </Label>
                        </div>
                        {errors.check && <span className=" text-red-500" >Check is required</span>}
                        <Button outline gradientDuoTone="pinkToOrange" type="submit">Sign Up</Button>
                        <Button onClick={handleGoogleLogin} className=" uppercase" outline gradientDuoTone="pinkToOrange">
                            <FaGoogle className=" mr-2" /> JoinwithGoole
                        </Button>
                    </form>

                    <button></button>
                    <h4 className=" text-center my-5 ">Already have an account? <Link to='/logIn'><span className=" text-blue-600 underline">Please LogIn</span></Link></h4>
                </div>
            </div>
        </div>
    );
};

export default SignUp;