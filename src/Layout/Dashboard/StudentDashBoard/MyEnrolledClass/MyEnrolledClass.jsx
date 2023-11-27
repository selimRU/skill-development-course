import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { Button, Card } from "flowbite-react";

const MyEnrolledClass = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: enroledCourse = {}, isPending: isAEnrolPending } = useQuery({
        queryKey: ['enroled', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/v1/paymentAndCourseInfo/${user?.email}`)
            console.log(res.data);
            return res.data
        }
    })

    if (isAEnrolPending)
        return <progress></progress>

    return (
        <div>
            {
                enroledCourse.payments === null ? <h3 className=" text-base md:text-3xl text-center font-semibold lg:my-10">You haven,t enroled for any course.Thanks</h3>
                    :
                    <Card
                        className="max-w-sm"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={enroledCourse?.payments?.image}
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {enroledCourse?.payments?.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Name: {user?.displayName}
                        </p>
                        <Button gradientDuoTone="greenToBlue">Continue button</Button>
                    </Card>
            }
        </div>
    );
};

export default MyEnrolledClass;