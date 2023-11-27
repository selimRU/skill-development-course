import { Link, useLoaderData } from "react-router-dom";
'use client';
import { Button, Card } from 'flowbite-react';

const EnroledCourseDetails = () => {
    const enroledCourse = useLoaderData()
    console.log(enroledCourse);
    return (
        <div className=" ">
            {enroledCourse.map(course => < Card
                className="max-w-xl mx-auto my-5"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
            >
                <img className=" h-[400px] object-cover " src={course.image} alt="" />
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Teacher:{course.name}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Price: {course.price}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {course.description}
                </p>
                <Button gradientDuoTone="greenToBlue"><Link to={`/dashboard/payment/${course._id}`}>Pay</Link></Button>
            </Card>
            )

            }
        </div >
    );
};

export default EnroledCourseDetails;