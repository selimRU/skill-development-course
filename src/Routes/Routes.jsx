import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import CourseDetails from "../Layout/Dashboard/TacherDashBoard/MyClasses/CourseDetails";
import Dashboard from "../Layout/Dashboard/Dashboard";
import TeachOnSkillMinds from "../pages/TeachOnSkillMinds/TeachOnSkillMinds";
import AllCourseAdmin from "../Layout/Dashboard/AdminDashBoard/AllCourseAdmin/AllCourseAdmin";
import MyProfile from "../Layout/Dashboard/AdminDashBoard/MyProfile/MyProfile";
import TeacherRequest from "../Layout/Dashboard/AdminDashBoard/TeacherRequest/TeacherRequest";
import Allusers from "../Layout/Dashboard/AdminDashBoard/Allusers/Allusers";
import AllCourse from "../pages/AllCourse/AllCourse";
import AddCourse from "../Layout/Dashboard/TacherDashBoard/AddCourse/AddCourse";
import MyClasses from "../Layout/Dashboard/TacherDashBoard/MyClasses/MyClasses";
import TeacherProfile from "../Layout/Dashboard/TacherDashBoard/TeacherProfile/TeacherProfile";
import MyEnrolledClass from "../Layout/Dashboard/StudentDashBoard/MyEnrolledClass/MyEnrolledClass";
import StudentProfile from "../Layout/Dashboard/StudentDashBoard/StudentProfile/StudentProfile";
import UpdateCourse from "../Layout/Dashboard/TacherDashBoard/MyClasses/UpdateCourse";
import Payment from "../Layout/Dashboard/Payment/Payment";



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
                path: 'teachOnSkillMinds',
                element: <TeachOnSkillMinds />
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
    {
        path: '/dashboard',
        element: <Dashboard />,
        children: [

            // Admin part
            {
                path: 'teacherRequest',
                element: <TeacherRequest />
            },
            {
                path: 'allUsers',
                element: <Allusers />
            },
            {
                path: 'allCourses',
                element: <AllCourseAdmin />
            },
            {
                path: 'profile',
                element: <MyProfile />
            },

            // teacher part
            {
                path: 'addCourse',
                element: <AddCourse />
            },
            {
                path: 'myClasses',
                element: <MyClasses />
            },
            {
                path: 'teacherProfile',
                element: <TeacherProfile />
            },
            {
                path: 'courseDetails/:id',
                element: <CourseDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/api/v1/course/${params.id}`)
            },
            {
                path: 'updateCourse/:id',
                element: <UpdateCourse />,
                loader: ({ params }) => fetch(`http://localhost:5000/api/v1/course/${params.id}`)
            },

            // student part
            {
                path: 'myEnroledCourses',
                element: <MyEnrolledClass />
            },
            {
                path: 'studentProfile',
                element: <StudentProfile />
            },
            {
                path: 'payment',
                element: <Payment />
            },

        ]
    },

])


export default router;