import { Card } from 'flowbite-react';
import React from 'react';

const TeachersEnrolledCoursesCard = ({ course }) => {
    const { image, title, name, price, description } = course
    return (
        <div className=''>
            < Card
                className="max-w-xl mx-auto my-5"
                imgAlt="Meaningful alt text for an image that is not purely decorative"
            // imgSrc={image}
            >
                <img className=" h-[400px] object-cover " src={image} alt="" />
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
            </Card>
        </div>
    );
};

export default TeachersEnrolledCoursesCard;