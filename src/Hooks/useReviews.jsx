import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useReviews = () => {
    const axiosPublic = useAxiosPublic()
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () =>
            await axiosPublic.get('/api/v1/reviews')
                .then(res => {
                    const data = (res.data);
                    return data
                })

    })
    return [reviews, refetch]
};

export default useReviews;