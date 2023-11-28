
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Table } from "flowbite-react";
import { useState } from "react";
import Swal from "sweetalert2";
import useTeacherRequest from "../../../../Hooks/useTeacherRequest";
import { useLoaderData, useNavigate } from "react-router-dom";
import useUsers from "../../../../Hooks/useUsers";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
'use client';


const TeacherRequest = () => {
    const [disable, setDisable] = useState(true)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [query, setQueary] = useState('')
    const [totalItemPerPage, setTotalItemPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const totalCount = useLoaderData()
    console.log(totalCount);

    const pages = Math.ceil(totalCount?.allRequest
        / totalItemPerPage)

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['request', totalItemPerPage, pageNumber],
        queryFn: async () => {
            const data = await axiosSecure.get(`/api/v1/teacherRequest?page=${pageNumber}&size=${totalItemPerPage}`)
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
        <div>
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
    )
};


export default TeacherRequest;