import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTeacher = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isTeacher = [], isPending: isATeacherPending } = useQuery({
        queryKey: ['teacher', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/getUser/teacher/${user?.email}`)
            return res.data.accepted
        }

    })

    return [isTeacher, isATeacherPending]
};

export default useTeacher;