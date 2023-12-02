import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import MyCoursesCard from "./MyCoursesCard";

const MyClasses = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: courses, refetch } = useQuery({
        queryKey: ['courses', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/getCourses/${user?.email}`)
            console.log(res);
            return res.data
        }
    })
    return (
        <div>
            <h3 className=" text-2xl text-center font-semibold mb-5 border-b-2 border-blue-300 py-3 text-blue-400">My added Courses</h3>
            <div className=" grid md:grid-cols-2 items-center gap-5 justify-between px-5 md:px-0 lg:px-0">
                {
                    courses?.map(myCourse => <MyCoursesCard
                        key={myCourse._id}
                        myCourse={myCourse}
                        refetch={refetch}
                    ></MyCoursesCard>)
                }
            </div>
        </div>
    );
};

export default MyClasses;