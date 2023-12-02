import { FaIceCream, FaUsers, FaWallet } from "react-icons/fa";
import img from '../../../assets/img.png'
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import useEnrolment from "../../../Hooks/useEnrolment";

const Statistics = () => {
    const { enroled, isEnrolPending } = useEnrolment()
    const [courseCount, setCourseCount] = useState(0)
    const [userCount, setUserCount] = useState(0)
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    // const { data: enroled, isPending: isATeacherPending } = useQuery({
    //     queryKey: ['enrol'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/api/v1/enrolmentCount`)
    //         console.log(res.data);
    //         return res.data
    //     }
    // })

    useEffect(() => {
        axiosSecure.get('/api/v1/courseCount')
            .then(res => {
                console.log(res.data);
                setCourseCount(res.data)
            })
    }, [])
    useEffect(() => {
        axiosSecure.get('/api/v1/getUsers/count')
            .then(res => {
                console.log(res.data);
                setUserCount(res.data)
            })
    }, [])

    return (
        <div className="w-full my-10 text-center bg-blue-300">
            <div className=" flex flex-row md:flex-row gap-10 text-center justify-between items-center">
                <div className=" w-full md:w-1/2 lg:w-9/12 flex flex-col lg:flex-row md:flex-col items-center justify-between text-white my-5 gap-5">
                    <div className=" w-full lg:w-[250px] lg:h-[250px] md:h-[150px] bg-gradient-to-r from-fuchsia-500 to-fuchsia-200 rounded-md">
                        <div className="flex gap-5 items-center px-12 py-4">
                            <div>
                                <FaWallet className=" text-4xl" />
                            </div>
                            <div>
                                <p className=" text-3xl">{enroled?.enroledCount}</p>
                                <p className=" text-lg">Total Enrolment</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-200 rounded-md w-full lg:w-[250px] lg:h-[250px] md:h-[150px]">
                        <div className="flex gap-5 items-center px-12 py-4">
                            <div>
                                <FaUsers className=" text-4xl" />
                            </div>
                            <div >
                                <p className=" text-3xl">{userCount.usersCount}</p>
                                <p className=" text-lg">Customers</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-pink-500 to-pink-200 rounded-md w-full lg:w-[250px] lg:h-[250px] md:h-[150px]">
                        <div className="flex gap-5 items-center px-12 py-4">
                            <div>
                                <FaIceCream className=" text-4xl" am />
                            </div>
                            <div>
                                <p className=" text-3xl">{courseCount.allCourses}</p>
                                <p className=" text-lg">Products</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 w-3/12 flex justify-end ">
                    <img className=" lg:w-full" src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Statistics;



// const AdminHome = () => {
//
//     return (
//         <div className=" w-full">
//             <h4 className=" text-3xl uppercase">HI, WELCOME {user?.displayName}</h4>
//             <div className=" grid items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-3 text-white my-5">
//                 <div className="bg-gradient-to-r from-fuchsia-500 to-fuchsia-250 rounded-md">
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
//                 <div className=" bg-gradient-to-r from-orange-500 to-orange-250 rounded-md">
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
//                 <div className="bg-gradient-to-r from-pink-500 to-pink-250 rounded-md">
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
//                 <div className="bg-gradient-to-r from-sky-500 to-sky-250 rounded-md">
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