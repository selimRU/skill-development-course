import { useEffect, useState } from "react";
import AllCourseCard from "./AllCourseCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const AllCourse = () => {
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
            console.log(data.data);
            const filtered = data.data?.filter(course => course.status === "accepted")
            console.log(filtered);
            return filtered;
            return res;
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
        <div className="max-w-6xl mx-auto my-10 space-y-10">
            <Helmet>
                <title>Skill Minds - All Courses</title>
            </Helmet>
            <div className=" flex justify-center">
                <input onChange={(e) => setSearch(e.target.value)} type="search" name="search" id="search" placeholder="Search your course" />
                {/* <button >search</button> */}
            </div>
            <div className=" grid md:grid-cols-2 items-center gap-5 justify-between">
                {
                    courses?.map(course => <AllCourseCard
                        key={course._id}
                        course={course}
                    ></AllCourseCard>)
                }
            </div>
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

export default AllCourse;