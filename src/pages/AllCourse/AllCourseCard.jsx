'use client';
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";


const AllCourseCard = ({ course }) => {
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
                    {description}
                </p>
                <Button gradientDuoTone="greenToBlue"><Link to={`/dashboard/courseDetails/${_id}`}>Enroll</Link></Button>
            </Card>
        </div>
    );
};

export default AllCourseCard;