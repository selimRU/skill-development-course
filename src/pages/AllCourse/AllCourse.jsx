
import { useEffect, useState } from "react";
// import useCourses from "../../Hooks/useCourses";
import AllCourseCard from "./AllCourseCard";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router-dom";


const AllCourse = () => {
    // const [courses] = useCourses()
    const axiosSecure = useAxiosSecure()
    const [courses, setCourses] = useState([])
    const [query, setQueary] = useState('')
    const [totalItemPerPage, setTotalItemPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)
    const totalCount = useLoaderData()
    console.log(totalCount);

    const pages = Math.ceil(totalCount?.allCourses
        / totalItemPerPage)

    useEffect(() => {
        axiosSecure.get(`/api/v1/allCourses?page=${pageNumber}&size=${totalItemPerPage}`)
            .then(res => {
                console.log(res.data);
                const filtered = res.data?.filter(course => course.status === "accepted")
                console.log(filtered);
                setCourses(filtered)
                if (query) {
                    const searchedCourses = filtered.filter(course => course.title.toLowerCase().includes(query.toLowerCase()))
                    setCourses(searchedCourses)
                }
                else {
                    setCourses(filtered)
                }
            })
    }, [pageNumber, totalItemPerPage, query])


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
            <div className=" flex justify-center">
                <input onChange={(e) => setQueary(e.target.value)} type="search" name="search" id="search" placeholder="Search your course" />
                {/* <button >search</button> */}
            </div>
            <div className=" grid md:grid-cols-2 items-center gap-5 justify-between">
                {
                    courses.map(course => <AllCourseCard
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