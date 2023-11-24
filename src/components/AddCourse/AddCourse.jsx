import React from 'react';
'use client';
import { useForm } from "react-hook-form"
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddCourse = () => {

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
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
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
                    <TextInput {...register("name", { required: true })} id="small" type="text" sizing="sm" />
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
                            <option value="dessert">Dessert</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="salads">Salads</option>
                            <option value="drinks">Drinks</option>
                        </Select>
                    </div>
                    <div className=' md:w-[50%]'>
                        <div className="mb-2 block">
                            <Label htmlFor="base" value="Price*" />
                        </div>
                        <TextInput {...register("price", { required: true })} id="base" type="number" sizing="md" />
                    </div>
                </div>
                <div >
                    <div className="mb-2 block">
                        <Label htmlFor="large" value="Recipe Details*" />
                    </div>
                    <Textarea {...register("recipe", { required: true })} className='h-[200px]' id="large" type="text" sizing="lg" />
                </div>
                <div className=' flex flex-col md:flex-row lg:flex-row w-full md:items-center md:justify-between gap-5'>
                    <input
                        {...register('image', { required: true })}
                        type="file"
                        name="image"
                        id="image"
                    />
                </div>
                <Button type='submit'>Add Item</Button>
            </form>
        </div>
    );
};

export default AddCourse;