import React from 'react';
'use client';
import { useForm } from "react-hook-form"
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';

const TeachOnSkillMinds = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        console.log(res.data);
        if (res.data.success) {
            const itemInfo = {
                name: user?.displayName,
                recipe: data.recipe,
                image: user?.photoURL,
                category: data.category,
                price: data.price
            }
            axiosSecure.post('/api/v1/item', itemInfo)
                .then(res => {
                    console.log(res.data.insertedId);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You have logged in successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        reset()
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 justify-center mx-auto w-full">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Recipe name*" />
                    </div>
                    <TextInput defaultValue={user?.displayName} {...register("name", { required: true })} id="small" type="text" sizing="sm" readOnly />
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
                <Button
                    type='submit'
                    gradientDuoTone="cyanToBlue">
                    Submit For Review
                </Button>
            </form>
        </div>
    );
};

export default TeachOnSkillMinds;