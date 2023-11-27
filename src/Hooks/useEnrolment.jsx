import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useEnrolment = () => {
    const axiosSecure = useAxiosSecure()
    const { data: enroled = {}, isPending: isEnrolPending } = useQuery({
        queryKey: ['enrol'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/enrolmentCount`)
            console.log(res.data);
            return res.data
        }
    })
    return { enroled, isEnrolPending }
};

export default useEnrolment;