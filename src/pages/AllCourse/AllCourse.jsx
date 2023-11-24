import useCourses from "../../Hooks/useCourses";
import AllCourseCard from "./AllCourseCard";


const AllCourse = () => {
    const [courses] = useCourses()
    return (
        <div className=" grid md:grid-cols-2 items-center gap-5 justify-between max-w-6xl mx-auto">
            {
                courses.map(course => <AllCourseCard
                    key={course._id}
                    course={course}
                ></AllCourseCard>)
            }
        </div>
    );
};

export default AllCourse;