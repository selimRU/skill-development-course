'use client';

import { Table } from 'flowbite-react';
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { Link, useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';




const AllCourseAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')
    const [totalItemPerPage, setTotalItemPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const totalCount = useLoaderData()
    console.log(totalCount);

    const pages = Math.ceil(totalCount?.allCourses
        / totalItemPerPage)

    const { data: courses = [], refetch } = useQuery({
        queryKey: ['courses', pageNumber, totalItemPerPage, search],
        queryFn: async () => {
            const data = await axiosSecure.get(`/api/v1/allCourses?page=${pageNumber}&size=${totalItemPerPage}&search=${search}`)
            return data.data;
        }
    })
    const handlePerPage = (e) => {
        const val = parseInt(e.target.value)
        setTotalItemPerPage(val)
        setPageNumber(0)
    }
    const handlePrev = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }
    const handleNext = () => {
        console.log(pages);
        if (pageNumber < pages - 1) {
            setPageNumber(pageNumber + 1)
        }
    }

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
        <div>
            <div className=" flex justify-center">
                <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" placeholder="Search your course" />
                {/* <button >search</button> */}
            </div>
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
                                {course?.status === 'rejected' || course?.status === 'accepted' ?
                                    <button disabled onClick={() => handleCourseRejected(course._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                        Reject
                                    </button>
                                    :
                                    <button onClick={() => handleCourseRejected(course._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                        Reject
                                    </button>
                                }
                            </Table.Cell>
                            <Table.Cell>
                                {course?.status === 'accepted' || course.status === 'rejected' ?
                                    <button disabled onClick={() => handleCourseAccepted(course._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                        Accept
                                    </button>
                                    :
                                    <button onClick={() => handleCourseAccepted(course._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                        Accept
                                    </button>
                                }
                            </Table.Cell>
                            <Table.Cell>
                                {course.status === 'accepted' ?
                                    <button className="font-medium text-cyan-600  dark:text-cyan-500">
                                        <Link to='/dashboard/coursesFeedbackAdmin'>See progress</Link>
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
            <div className=" flex gap-10 my-8 justify-center items-center">
                <div className="flex gap-4">
                    <button onClick={handlePrev}>Prev</button>
                    <div>
                        {
                            [...Array(pages).keys()].map(page => <button
                                onClick={(e) => setPageNumber(page)}
                                className={`mr-5 px-3 rounded-md ${pageNumber === page ? 'bg-red-400' : ''}`}
                                key={page}>{page}</button>)
                        }
                    </div>
                    <button onClick={handleNext}>Next</button>
                </div>
                <div>
                    <select onClick={handlePerPage} name="select" id="select">
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default AllCourseAdmin;