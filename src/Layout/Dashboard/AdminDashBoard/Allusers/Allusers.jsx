// import { useQuery } from "@tanstack/react-query";
'use client';

import { Table } from 'flowbite-react';
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';






const Allusers = () => {
    const [disable, setDisable] = useState(true)
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')
    const [totalItemPerPage, setTotalItemPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const totalCount = useLoaderData()
    console.log(totalCount);

    const pages = Math.ceil(totalCount?.usersCount
        / totalItemPerPage)

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', pageNumber, totalItemPerPage, search],
        queryFn: async () => {
            const data = await axiosSecure.get(`/api/v1/getUsers?page=${pageNumber}&size=${totalItemPerPage}&search=${search}`)
            console.log(data);
            return data.data
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

    const handleMakeAdmin = async (id) => {
        const res = await axiosSecure.patch(`/api/v1/makeAdmin/${id}`)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your have updated the role",
                showConfirmButton: false,
                timer: 1500
            })
            refetch()
        }
    }
    // const handleMakeTeacher = (id) => {
    //     axiosSecure.patch(`/api/v1/makeAdmin/${id}`)
    //         .then(res => {
    //             Swal.fire({
    //                 title: "Are you sure?",
    //                 text: "You won't be able to revert this!",
    //                 icon: "warning",
    //                 showCancelButton: true,
    //                 confirmButtonColor: "#3085d6",
    //                 cancelButtonColor: "#d33",
    //                 confirmButtonText: "Yes, update it!"
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     console.log(res.data)
    //                     if (res.data.modifiedCount > 0) {
    //                         Swal.fire({
    //                             position: "top-end",
    //                             icon: "success",
    //                             title: "Your have updated the role",
    //                             showConfirmButton: false,
    //                             timer: 1500
    //                         })
    //                         refetch()
    //                     }
    //                 }
    //             })
    //         })
    // }
    return (
        <div>
            <div className=" flex justify-center my-3">
                <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" placeholder="Search your course" />
                {/* <button >search</button> */}
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Serial</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {users?.map((user, index) =>
                        < Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>
                                <img className=' object-cover w-[100px] h-[100px]' src={user?.image} alt="" />
                            </Table.Cell>
                            <Table.Cell>{user?.name}</Table.Cell>
                            <Table.Cell>{user?.email}</Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell>
                                {user?.role === 'admin' ?
                                    <button disabled={disable} onClick={() => handleMakeAdmin(user._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                        Make Admin
                                    </button>
                                    :
                                    <button onClick={() => handleMakeAdmin(user._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                        Make Admin
                                    </button>
                                }
                            </Table.Cell>
                            {/* <Table.Cell>
                            <button onClick={() => handleDeleteUser(user._id)} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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

export default Allusers;