import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import AllCourse from "../pages/AllCourse/AllCourse";
import CourseDetails from "../pages/AllCourse/CourseDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";
import TeacherRequest from "../components/TeacherRequest/TeacherRequest";
import Allusers from "../components/Allusers/Allusers";
import AddCourse from "../components/AddCourse/AddCourse";
import TeachOnSkillMinds from "../pages/TeachOnSkillMinds/TeachOnSkillMinds";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'allCourses',
                element: <AllCourse />
            },
            {
                path: 'courseDetails/:id',
                element: <CourseDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/api/v1/course/${params.id}`)
            },
        ]
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/signup',
        element: <SignUp />
    },

    // Admin part
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
            {
                path: 'teacherRequest',
                element: <TeacherRequest />
            },
            {
                path: 'allUsers',
                element: <Allusers />
            },
            {
                path: 'addCourse',
                element: <AddCourse />
            },
            {
                path: 'teachOnSkillMinds',
                element: <TeachOnSkillMinds />
            },
        ]
    },

])


export default router;