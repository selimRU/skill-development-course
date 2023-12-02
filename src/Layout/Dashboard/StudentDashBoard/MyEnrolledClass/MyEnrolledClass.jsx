import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const MyEnrolledClass = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: enroledCourse = [], isPending: isAEnrolPending } = useQuery({
        queryKey: ['enroled', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/paymentAndCourseInfo/${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })

    if (isAEnrolPending)
        return <progress></progress>

    return (
        <div className=" px-5 md:px-5 lg:px-0">
            <h3 className=" text-2xl text-center font-semibold mb-5 border-b-2 border-blue-400 py-3 text-blue-400">My Enroled Courses</h3>
            {
                enroledCourse.length < 0 ? <h3 className=" text-base md:text-3xl text-center font-semibold lg:my-10">You haven,t enroled for any course.Thanks</h3>
                    :
                    <div className=" grid md:grid-cols-2 items-center gap-5 justify-between">
                        {enroledCourse.map(course => < Card
                            key={course._id}
                            className="max-w-sm"
                            imgAlt="Meaningful alt text for an image that is not purely decorative"
                            imgSrc={course?.image}
                        >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {course?.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                Name: {user?.displayName}
                            </p>
                            <Button gradientDuoTone="greenToBlue">
                                <Link to={`/dashboard/assignment/${course?.title}`}>Continue button</Link>
                            </Button>
                        </Card>)

                        }
                    </div>
            }
        </div >
    );
};

export default MyEnrolledClass;