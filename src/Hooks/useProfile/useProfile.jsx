import { useQuery } from "@tanstack/react-query";
import useAuth from "../useAuth";
import useAxiosSecure from "../useAxiosSecure";


const useProfile = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: profile, isPending: isATeacherPending } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/getUser/profile/${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })
    return { profile, isATeacherPending }
};

export default useProfile;