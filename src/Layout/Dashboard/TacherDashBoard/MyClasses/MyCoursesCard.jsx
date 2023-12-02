'use client';
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyCoursesCard = ({ myCourse, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { _id, title, image, name, email, price, description, status } = myCourse
    console.log(_id);

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
                                title: "Coursek has been deleted",
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
            <Card className="max-w-sm" imgSrc={image} collapse-horizontal >
                <div className=" flex flex-col md:flex-col lg:flex-row justify-between gap-5 items-center">
                    <div className=" space-y-5">
                        <h5 className="lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Title: {title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Teacher: {name}
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
                            Status: {status ? status : 'pending'}
                        </p>
                    </div>
                    <div className="flex flex-row lg:flex-col justify-between gap-5 items-center">
                        <div>
                            <Button className=" " gradientDuoTone="greenToBlue"><Link to={`/dashboard/updateCourse/${_id}`}> Update</Link></Button>
                        </div>
                        <div>
                            <Button onClick={handleDeleteCourse} gradientDuoTone="greenToBlue">Delete</Button>
                        </div>
                        <div>
                            {status ?
                                <Button gradientDuoTone="greenToBlue"><Link to={`/dashboard/courseDetails/${title}`}>Details</Link></Button>
                                :
                                <Button disabled gradientDuoTone="greenToBlue"> Details</Button>
                            }
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MyCoursesCard;


// import { FaBus, FaIceCream, FaUsers, FaWallet } from "react-icons/fa";
// import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { useState } from "react";
// import { useEffect } from "react";


// const AdminHome = () => {
//     const [count, setCount] = useState({})
//     const axiosSecure = useAxiosSecure()
//     const { user } = useAuth()


//     useEffect(() => {
//         axiosSecure.get('/api/v1/counts')
//             .then(res => {
//                 console.log(res.data);
//                 setCount(res.data)
//             })
//     }, [])
//     return (
//         <div className=" w-full">
//             <h4 className=" text-3xl uppercase">HI, WELCOME {user?.displayName}</h4>
//             <div className=" grid items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-3 text-white my-5">
//                 <div className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-200 rounded-md">
//                     <div className="flex gap-5 items-center px-12 py-4">
//                         <div>
//                             <FaWallet className=" text-4xl" />
//                         </div>
//                         <div>
//                             <p className=" text-3xl">{count.revenue}</p>
//                             <p className=" text-lg">Revenue</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className=" bg-gradient-to-r from-orange-500 to-orange-200 rounded-md">
//                     <div className="flex gap-5 items-center px-12 py-4">
//                         <div>
//                             <FaUsers className=" text-4xl" />
//                         </div>
//                         <div >
//                             <p className=" text-3xl">{count.usersCount}</p>
//                             <p className=" text-lg">Customers</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-gradient-to-r from-pink-500 to-pink-200 rounded-md">
//                     <div className="flex gap-5 items-center px-12 py-4">
//                         <div>
//                             <FaIceCream className=" text-4xl" am />
//                         </div>
//                         <div>
//                             <p className=" text-3xl">{count.foodsCount}</p>
//                             <p className=" text-lg">Products</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="bg-gradient-to-r from-sky-500 to-sky-200 rounded-md">
//                     <div className="flex gap-5 items-center px-12 py-4">
//                         <div>
//                             <FaBus className=" text-4xl" />
//                         </div>
//                         <div >
//                             <p className=" text-3xl">{count.paymentsCount}</p>
//                             <p className=" text-lg">Orders</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminHome;