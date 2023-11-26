;
// import CourseCard from "./CourseCard";

'use client';

import { Table } from 'flowbite-react';
import Swal from "sweetalert2";
import { useState } from "react";
import useCourses from '../../../../Hooks/useCourses';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';




const AllCourseAdmin = () => {
    const [courses, refetch] = useCourses()
    const axiosSecure = useAxiosSecure()

    const handleCourseRejected = async (id) => {
        const res = await axiosSecure.patch(`/api/v1/courseRejected/${id}`)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have updated the role",
                showConfirmButton: false,
                timer: 1500
            })
            refetch()
        }
    }

    const handleCourseAccepted = (id) => {
        axiosSecure.patch(`/api/v1/courseAccepted/${id}`)
            .then(res => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, update it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(res.data)
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your have updated the role",
                                showConfirmButton: false,
                                timer: 1500
                            })
                            refetch()
                        }
                    }
                })
            })
    }

    return (
        // <div className=" grid md:grid-cols-2 items-center gap-5 justify-between">
        //     {
        //         courses.map(course => <CourseCard
        //             key={course._id}
        //             course={course}
        //         ></CourseCard>)
        //     }
        // </div>
        <Table>
            <Table.Head>
                <Table.HeadCell>Serial</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                    Rejection
                </Table.HeadCell>
                <Table.HeadCell>
                    Approval
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {courses?.map((course, index) =>
                    < Table.Row key={course._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            <img src={course?.image} alt="" />
                        </Table.Cell>
                        <Table.Cell>{course?.title}</Table.Cell>
                        <Table.Cell>{course?.email}</Table.Cell>
                        <Table.Cell>{course?.description}</Table.Cell>
                        <Table.Cell>{course?.status ? course?.status : "pending"}</Table.Cell>
                        <Table.Cell>
                            <button onClick={() => handleCourseRejected(course._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                Reject
                            </button>
                        </Table.Cell>
                        <Table.Cell>
                            <button onClick={() => handleCourseAccepted(course._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                Accept
                            </button>
                        </Table.Cell>
                        <Table.Cell>
                            {course.status === 'accepted' ?
                                <button className="font-medium text-cyan-600  dark:text-cyan-500">
                                    <Link to={`/dashboard/courseDetails/${course._id}`}>See progress</Link>
                                </button>
                                :
                                <button disabled className="font-medium text-cyan-600  dark:text-cyan-500">
                                    See progress
                                </button>
                            }
                        </Table.Cell>
                        {/* <Table.Cell>
                            <button onClick={() => handleDeletecourse(course._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                <FaTrash />
                            </button>
                        </Table.Cell> */}
                    </Table.Row>
                )

                }
            </Table.Body>
        </Table >
    );
};

export default AllCourseAdmin;