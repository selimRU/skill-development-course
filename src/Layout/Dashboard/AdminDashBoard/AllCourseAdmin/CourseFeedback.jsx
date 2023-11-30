'use client';
import { Table } from 'flowbite-react';
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const CourseFeedback = () => {
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')
    const [totalItemPerPage, setTotalItemPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const totalCount = useLoaderData()
    console.log(totalCount);

    const pages = Math.ceil(totalCount?.reviews
        / totalItemPerPage)

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', pageNumber, totalItemPerPage, search],
        queryFn: async () => {
            const data = await axiosSecure.get(`/api/v1/reviews?page=${pageNumber}&size=${totalItemPerPage}&search=${search}`)
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
    return (

        <div className=' max-h-screen'>
            <div className=" flex justify-center my-3">
                <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" placeholder="Search feedback" />
                {/* <button >search</button> */}
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>Serial</Table.HeadCell>
                    <Table.HeadCell>Image</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Title</Table.HeadCell>
                    <Table.HeadCell>Descripton</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {reviews?.map((reviews, index) =>
                        < Table.Row key={reviews?._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>
                                <img className=' w-[100px] h-[100px]' src={reviews?.image} alt="" />
                            </Table.Cell>
                            <Table.Cell>{reviews?.name}</Table.Cell>
                            <Table.Cell>{reviews?.title}</Table.Cell>
                            <Table.Cell> <p className=' w-[100px]'>{reviews?.description}</p></Table.Cell>
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

export default CourseFeedback;