
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useTeacherRequest from "../../../../Hooks/useTeacherRequest";
import { useNavigate } from "react-router-dom";
import useUsers from "../../../../Hooks/useUsers";
'use client';


const TeacherRequest = () => {
    const [disable, setDisable] = useState(true)
    const [requests, refetch] = useTeacherRequest()
    const axiosSecure = useAxiosSecure()
    const [users] = useUsers()
    const handleAccepted = async (id) => {
        const res = await axiosSecure.patch(`/api/v1/requestAccepted/${id}`)
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
    const handleRejected = async (id) => {
        const res = await axiosSecure.patch(`/api/v1/requestRejected/${id}`)
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
    return (
        <Table>
            <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Experience</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Rejection</Table.HeadCell>
                <Table.HeadCell>Approval</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {requests?.map((request, index) =>
                    < Table.Row key={request._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell>
                            <img src={request?.image} alt="" />
                        </Table.Cell>
                        <Table.Cell>{request?.title}</Table.Cell>
                        <Table.Cell>{request?.name}</Table.Cell>
                        <Table.Cell>{request?.category}</Table.Cell>
                        <Table.Cell>{request?.experience}</Table.Cell>
                        <Table.Cell>
                            {request?.role === 'accepted' ? (
                                'accepted'
                            ) : request?.role === 'rejected' ? (
                                'rejected'
                            ) : (
                                <button className="font-medium text-cyan-600 dark:text-cyan-500">Pending</button>
                            )}
                        </Table.Cell>
                        {
                            request?.role === 'accepted' || request?.role === 'rejected' ?
                                <>
                                    <Table.Cell>
                                        <button disabled={disable} onClick={() => handleRejected(request._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                            Reject
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button disabled={disable} onClick={() => handleAccepted(request._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                            Approved
                                        </button>
                                    </Table.Cell>
                                </>
                                :
                                <>
                                    <Table.Cell>
                                        <button onClick={() => handleRejected(request._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                            Reject
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button onClick={() => handleAccepted(request._id)} className="font-medium text-cyan-600  dark:text-cyan-500">
                                            Approved
                                        </button>
                                    </Table.Cell>
                                </>
                        }
                    </Table.Row>
                )
                }
            </Table.Body>
        </Table >
    )
};


export default TeacherRequest;