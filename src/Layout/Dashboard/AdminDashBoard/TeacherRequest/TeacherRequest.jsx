
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useTeacherRequest from "../../../../Hooks/useTeacherRequest";
import { useNavigate } from "react-router-dom";
import useUsers from "../../../../Hooks/useUsers";
import useAuth from "../../../../Hooks/useAuth";
'use client';


const TeacherRequest = () => {

    const [disable, setDisable] = useState(true)
    const [requests, refetch] = useTeacherRequest()
    console.log(requests);
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()


    const handleAccepted = async (email) => {
        const res = await axiosSecure.patch(`/api/v1/requestAccepted/${email}`)
        // await axiosSecure.patch(`/api/v1/requestAccepted2/${user.displayName}`)
        console.log(res.data)
        // if (res.data.modifiedCount > 0) {
        //     Swal.fire({
        //         position: "top-end",
        //         icon: "success",
        //         title: "Your have updated the status",
        //         showConfirmButton: false,
        //         timer: 1500
        //     })

        // }
        refetch()
    }
    const handleRejected = async (id) => {
        const res = await axiosSecure.patch(`/api/v1/requestRejected/${id}`)
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your have updated the status",
                showConfirmButton: false,
                timer: 1500
            })
            refetch()
        }
    }
    return (
        <Table className=" w-[200px]">
            <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Name</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
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
                        <Table.Cell>{request?.email}</Table.Cell>
                        <Table.Cell>{request?.category}</Table.Cell>
                        <Table.Cell>{request?.experience}</Table.Cell>
                        <Table.Cell>
                            {request?.status === 'accepted' ? (
                                'accepted'
                            ) : request?.status === 'rejected' ? (
                                'rejected'
                            ) : (
                                <button className="font-medium text-cyan-600 dark:text-cyan-500">Pending</button>
                            )}
                        </Table.Cell>
                        {
                            request?.status === 'accepted' || request?.status === 'rejected' ?
                                <>
                                    <Table.Cell>
                                        <button disabled={disable} onClick={handleRejected} className="font-medium text-cyan-600  dark:text-cyan-500">
                                            Reject
                                        </button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <button disabled={disable} onClick={handleAccepted} className="font-medium text-cyan-600  dark:text-cyan-500">
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
                                        <button onClick={() => handleAccepted(request.email)} className="font-medium text-cyan-600  dark:text-cyan-500">
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