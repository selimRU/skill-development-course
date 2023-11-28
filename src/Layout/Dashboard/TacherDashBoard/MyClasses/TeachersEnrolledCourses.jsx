import { Link, useLoaderData } from "react-router-dom";
'use client';
import { Button, Card } from 'flowbite-react';
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TeachersEnrolledCoursesCard from "./TeachersEnrolledCoursesCard";



const TeachersEnrolledCourses = () => {
    const { user } = useAuth()
    // const course = useLoaderData()
    // console.log(course);
    // // const { _id, title, image, name, email, price, description, status } = course
    const axiosSecure = useAxiosSecure()
    const { data: enroledCourses = [], isPending: isEnrolPending } = useQuery({
        queryKey: ['course'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/singleCourseEnrolmentCount/${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })
    return (
        <div>
            <h3 className=" text-2xl font-semibold">Total Enrolment: {enroledCourses.length}</h3>
            <div className="grid md:grid-cols-2 items-center gap-5 justify-between">
                {
                    enroledCourses?.map(course => <TeachersEnrolledCoursesCard
                        key={course._id}
                        course={course}
                    ></TeachersEnrolledCoursesCard>)

                }
            </div >
        </div>
    );
};

export default TeachersEnrolledCourses;