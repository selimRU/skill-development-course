'use client';
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyCoursesCard = ({ myCourse, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { _id, title, image, name, email, price, description } = myCourse

    const handleDeleteCourse = () => {
        axiosSecure.delete(`/api/v1/deleteCourse/${_id}`)
            .then(res => {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
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
            <Card className="max-w-sm" imgSrc={image} horizontal>
                <div className=" flex flex-col md:flex-row justify-between gap-5 items-center">
                    <div className=" space-y-5">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Teacher:{name}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Email: {email}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Price: {price}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Descriptions: {description}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Status: pending
                        </p>
                    </div>
                    <div className=" flex flex-row justify-between lg:flex-col gap-5 items-center lg:space-y-5">
                        <div>
                            <Button gradientDuoTone="greenToBlue"><Link to={`/courseDetails/${_id}`}>Update</Link></Button>
                        </div>
                        <div>
                            <Button onClick={handleDeleteCourse} gradientDuoTone="greenToBlue">Delete</Button>
                        </div>
                        <div>
                            <Button gradientDuoTone="greenToBlue"><Link to={`/courseDetails/${_id}`}>See Details</Link></Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MyCoursesCard;