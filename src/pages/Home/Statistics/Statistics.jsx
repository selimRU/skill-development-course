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
        <div className="w-full my-10 text-center ">
            <div className=" flex flex-row md:flex-row gap-5 text-center justify-between items-center ">
                <div className=" w-9/12 md:w-9/12 lg:w-9/12 flex flex-col lg:flex-row md:flex-col items-center justify-between text-white my-5 gap-5 bg-blue-300 p-5 rounded-md">
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
                <div className=" w-3/12 ">
                    <img className=" lg:w-full h-[400px] md:h-full lg:h-full object-cover rounded-md" src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Statistics;