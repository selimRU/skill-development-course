import useCourses from "../../../../Hooks/useCourses";
import CourseCard from "./CourseCard";



const AllCourseAdmin = () => {
    const [courses] = useCourses()
    return (
        <div className=" grid md:grid-cols-2 items-center gap-5 justify-between">
            {
                courses.map(course => <CourseCard
                    key={course._id}
                    course={course}
                ></CourseCard>)
            }
        </div>
    );
};

export default AllCourseAdmin;