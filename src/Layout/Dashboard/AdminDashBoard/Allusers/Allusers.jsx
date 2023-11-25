// import { useQuery } from "@tanstack/react-query";
'use client';

import { Table } from 'flowbite-react';
import Swal from "sweetalert2";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import useUsers from '../../../../Hooks/useUsers';





const Allusers = () => {
    const [users] = useUsers()
    console.log(users);
    const [disable, setDisable] = useState(true)
    // const axiosSecure = useAxiosSecure()
    // const { data, refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const data = await axiosSecure.get('/api/v1/getUsers')
    //         console.log(data);
    //         return data
    //     }
    // })

    // const handleDeleteUser = (id) => {
    //     axiosSecure.delete(`/api/v1/deleteUser/${id}`)
    //         .then(res => {
    //             Swal.fire({
    //                 title: "Are you sure?",
    //                 text: "You won't be able to revert this!",
    //                 icon: "warning",
    //                 showCancelButton: true,
    //                 confirmButtonColor: "#3085d6",
    //                 cancelButtonColor: "#d33",
    //                 confirmButtonText: "Yes, delete it!"
    //             }).then((result) => {
    //                 if (result.isConfirmed) {
    //                     console.log(res.data)
    //                     if (res.data.deletedCount > 0) {
    //                         Swal.fire({
    //                             position: "top-end",
    //                             icon: "success",
    //                             title: "User has been deleted",
    //                             showConfirmButton: false,
    //                             timer: 1500
    //                         })
    //                         refetch()

    //                     }
    //                 }
    //             })
    //         })
    // }

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

    const handleMakeTeacher = (id) => {
        axiosSecure.patch(`/api/v1/makeAdmin/${id}`)
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
        <Table>
            <Table.Head>
                <Table.HeadCell>Serial</Table.HeadCell>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>
                    Update
                </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {users?.map((user, index) =>
                    < Table.Row key={user._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index + 1}
                        </Table.Cell>
                        <Table.Cell>
                            <img src={user?.image} alt="" />
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
    );
};

export default Allusers;