import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useTeacherRequest = () => {
    const axiosSecure = useAxiosSecure()
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['request'],
        queryFn: async () => {
            const data = await axiosSecure.get('/api/v1/teacherRequest')
            console.log(data);
            return data.data
        }
    })
    return [requests,refetch]
};

export default useTeacherRequest;