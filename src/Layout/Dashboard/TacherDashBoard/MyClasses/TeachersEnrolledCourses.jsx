import { Link, useLoaderData } from "react-router-dom";
'use client';
import { Button, Checkbox, Label, Modal, TextInput, Textarea } from 'flowbite-react';
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
// import TeachersEnrolledCoursesCard from "./TeachersEnrolledCoursesCard";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { MdAssignmentInd, MdOutlineJoinFull } from "react-icons/md";
import { VscFileSubmodule } from "react-icons/vsc";

const TeachersEnrolledCourses = () => {
    const courseDetails = useLoaderData()
    console.log(courseDetails);
    const { result } = courseDetails
    const [enrolment, setEnrolment] = useState('')
    const [assignment, setAssignment] = useState('')
    const [count, setCount] = useState()
    const [openModal, setOpenModal] = useState(false);
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    function onCloseModal() {
        setOpenModal(false);
    }

    useEffect(() => {
        axiosSecure.get('/api/v1/assignmentCount')
            .then(res => {
                const data = res.data.assignment
                setAssignment(data)
            })

    }, [])

    useEffect(() => {
        axiosSecure.get('/api/v1/enrolmentCount')
            .then(res => {
                const data = res.data.enroledCount
                setEnrolment(data)
            })
    }, [])

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)

        const assignmentInfo = {
            title: data.title,
            deadline: data.deadline,
            description: data.description
        }
        axiosPublic.post('/api/v1/addAssignment', assignmentInfo)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "You assignment added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }
    return (
        <div>
            <div className=" flex flex-col gap-5  md:flex-row w-full lg:w-[250px] lg:h-[250px] md:h-[150px]  rounded-md">
                <div className="flex bg-gradient-to-r from-blue-600 to-blue-400 gap-5 items-center px-12 py-4 rounded-md">
                    <div>
                        <MdOutlineJoinFull className=" text-4xl" />
                    </div>
                    <div>
                        <p className=" text-3xl">{enrolment}</p>
                        <p className=" text-lg">Total Enrolment</p>
                    </div>
                </div>
                <div className="flex bg-gradient-to-r from-blue-500 to-blue-400 gap-5 items-center px-12 py-4 rounded-md">
                    <div>
                        <MdAssignmentInd className=" text-4xl" />
                    </div>
                    <div>
                        <p className=" text-3xl">{assignment}</p>
                        <p className=" text-lg">Total Assignment</p>
                    </div>
                </div>
                <div className="flex bg-gradient-to-r from-blue-400 to-blue-300 gap-5 items-center px-12 py-4 rounded-md">
                    <div>
                        <VscFileSubmodule className=" text-4xl" />
                    </div>
                    <div>
                        <p className=" text-3xl">{''}</p>
                        <p className=" text-lg">Per Day Assignment Submitted</p>
                    </div>
                </div>
            </div>
            <Button className=" mt-5 rounded-2xl" onClick={() => setOpenModal(true)}><FaPlus className=" mr-2" />Create</Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <h3 className=' text-center font-semibold text-3xl'>ADD AN ASSIGNMENT</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4 justify-center mx-auto w-full">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="Title" />
                            </div>
                            <TextInput defaultValue={result?.title} {...register("title", { required: true })} id="small" type="text" sizing="sm" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="small" value="Deadline" />
                            </div>
                            <input {...register("deadline", { required: true })} id="small" sizing="sm" type="date" />
                        </div>
                        <div >
                            <div className="mb-2 block">
                                <Label htmlFor="large" value="Description*" />
                            </div>
                            <Textarea {...register("description", { required: true })} className='h-[200px]' id="large" type="text" sizing="lg" />
                        </div>
                        <Button type='submit'>Create</Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default TeachersEnrolledCourses;