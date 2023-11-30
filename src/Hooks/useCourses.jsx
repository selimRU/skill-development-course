
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCourses = () => {

    const axiosSecure = useAxiosSecure()

    const { data: courses = [], refetch, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosSecure.get('/api/v1/allCourses')
            // console.log(res.data);
            const data = (res.data);
            return data
        }
    })
    return [courses, refetch, isLoading]

};

export default useCourses;