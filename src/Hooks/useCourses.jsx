
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCourses = () => {
    const axiosSecure = useAxiosSecure()
    const { data: courses = [], refetch, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () =>
            await axiosSecure.get('/api/v1/allCourses')
                .then(res => {
                    const data = (res.data);
                    return data
                })

    })
    return [courses,isLoading]
};

export default useCourses;