import React, { useEffect, useState } from 'react';
'use client';
import { useForm } from "react-hook-form"
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';


const TeachOnSkillMinds = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myRequest, isPending: isRequestPending } = useQuery({
        queryKey: ['request', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/teacherRequest/${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })

    // if (isRequestPending) {
    //     return <progress></progress>
    // }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        reset()
        console.log(data)
        const teacherInfo = {
            name: user?.displayName,
            email: data.email,
            name: data.name,
            image: user?.photoURL,
            category: data.category,
            experience: data.experience,
            title: data.title
        }

        axiosSecure.post('/api/v1/teacherRequestPost', teacherInfo)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You have requested successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    return (
        <div className=' max-h-screen'>
            {
                myRequest?.myRequest?.status === 'accepted' ?
                    <div>
                        <h3 className=' text-center mt-10 text-base md:text-3xl font-semibold'>Congrates!!! You are now a member of our team.Best of luck.</h3>
                    </div>
                    :
                    <div className=' bg-blue-100 py-5 max-w-5xl mx-auto mt-5 h-[700px]'>
                        <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 justify-center max-w-xl mx-auto ">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="small" value="Title" />
                                </div>
                                <TextInput  {...register("title", { required: true })} id="small" type="text" sizing="sm" />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="small" value="Name" />
                                </div>
                                <TextInput defaultValue={user?.displayName} {...register("name", { required: true })} id="small" type="text" sizing="sm" readOnly />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="small" value="Email" />
                                </div>
                                <TextInput defaultValue={user?.email} {...register("email", { required: true })} id="small" type="text" sizing="sm" readOnly />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="Image" value="Your image" />
                                </div>
                                <TextInput defaultValue={user?.photoURL} {...register("image", { required: true })} id="image" type="text" placeholder="Your image" shadow readOnly />
                                {errors.image_url && <span className=" text-red-500" >Image is required</span>
                                }

                            </div>
                            <div className=' flex flex-col md:flex-row lg:flex-row w-full md:items-center md:justify-between gap-5'>
                                <div className=' md:w-[50%]'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Category*" />
                                    </div>
                                    <Select {...register("category", { required: true })} id="base" type="text" sizing="md" >
                                        <option disabled value='' selected >
                                            Select Category
                                        </option>
                                        <option value="web developmen">Web development</option>
                                        <option value="digital marketing">Digital marketing</option>
                                        <option value="mobile app development">Mobile app development</option>
                                        <option value="ui/ux designing">UI/UX designing</option>
                                        <option value="Graphics Designing">Graphics Designing</option>
                                    </Select>
                                </div>
                                <div className=' md:w-[50%]'>
                                    <div className="mb-2 block">
                                        <Label htmlFor="base" value="Experience*" />
                                    </div>
                                    <Select {...register("experience", { required: true })} id="base" type="text" sizing="md" >
                                        <option disabled value='' selected >
                                            Select Exprience
                                        </option>
                                        <option value="beginner">Beginner</option>
                                        <option value="pizza">Experienced</option>
                                        <option value="some idea">Some idea</option>
                                    </Select>
                                </div>
                            </div>
                            {myRequest?.myRequest?.status === 'rejected' ?
                                <Button
                                    className=' mt-5'
                                    type='submit'
                                    gradientDuoTone="cyanToBlue">
                                    Request to Another
                                </Button>
                                :
                                < Button
                                    className=' mt-5'
                                    type='submit'
                                    gradientDuoTone="cyanToBlue">
                                    Submit For Review
                                </Button>
                            }
                        </form>
                    </div>
            }
        </div >
    );
};

export default TeachOnSkillMinds;