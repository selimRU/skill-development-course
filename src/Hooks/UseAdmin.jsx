import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const UseAdmin = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: isAdmin, isPending: isAdminpending } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/getUsers/admin/${user?.email}`)
            console.log(res);
            return res.data.admin
        }

    })

    return [isAdmin, isAdminpending]
};

export default UseAdmin;