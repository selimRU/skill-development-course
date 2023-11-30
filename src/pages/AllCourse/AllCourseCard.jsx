'use client';
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import useTeacher from "../../Hooks/useTeacher";
import UseAdmin from "../../Hooks/UseAdmin";


const AllCourseCard = ({ course }) => {
    const [isTeacher] = useTeacher()
    const [isAdmin] = UseAdmin()
    const { _id, title, image, name, email, price, description } = course

    return (
        <div>
            <Card className="max-w-sm" imgSrc={image} horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Teacher:{name}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Price: {price}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    email: {email}
                </p>
                {/* <p className="font-normal text-gray-700 dark:text-gray-400">
                    Total Enrolment: {singleEnroled?.length}
                </p> */}
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    {description}
                </p>
                {
                    !isAdmin && !isTeacher &&
                    <Button gradientDuoTone="greenToBlue"><Link to={`/dashboard/enroledCourseDetails/${_id}`}>Enroll</Link></Button>
                }
            </Card>
        </div>
    );
};

export default AllCourseCard;