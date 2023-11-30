import React from 'react';
'use client';
import { useForm } from "react-hook-form"
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddCourse = () => {
    const navigate = useNavigate()
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
            const courseInfo = {
                title: data.title,
                name: data.name,
                email: data.email,
                image: res.data.data.display_url,
                price: data.price,
                description: data.description
            }
            axiosSecure.post('/api/v1/addCourse', courseInfo)
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
        navigate('/dashboard/myClasses')
        // reset()
    }
    return (
        <div>
            <h3 className=' text-center font-semibold text-3xl'>ADD A COURSE</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 justify-center mx-auto w-full">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Title" />
                    </div>
                    <TextInput {...register("title", { required: true })} id="small" type="text" sizing="sm" />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Name" />
                    </div>
                    <TextInput defaultValue={user.displayName} {...register("name", { required: true })} id="small" type="text" sizing="sm" readOnly />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="small" value="Email" />
                    </div>
                    <TextInput defaultValue={user.email} {...register("email", { required: true })} id="small" type="email" sizing="sm" readOnly />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="base" value="Price*" />
                    </div>
                    <TextInput {...register("price", { required: true })} id="base" type="number" sizing="md" />
                </div>
                <div >
                    <div className="mb-2 block">
                        <Label htmlFor="large" value="Description*" />
                    </div>
                    <Textarea {...register("description", { required: true })} className='h-[200px]' id="large" type="text" sizing="lg" />
                </div>
                <div className=' flex flex-col md:flex-row lg:flex-row w-full md:items-center md:justify-between gap-5'>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        name="image"
                        id="image"
                    />
                </div>
                <Button type='submit'>Add Course</Button>
            </form>
        </div>
    );
};

export default AddCourse;