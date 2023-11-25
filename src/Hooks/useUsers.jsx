import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const data = await axiosSecure.get('/api/v1/getUsers')
            console.log(data);
            return data.data
        }
    })

    return [users, refetch]
};

export default useUsers;