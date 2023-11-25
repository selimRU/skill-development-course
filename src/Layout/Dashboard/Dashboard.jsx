import { Outlet } from "react-router-dom";
// import DashBoardNav from "./DashBoardNav";
import { FaBook, FaHome, FaList, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UseAdmin from "../../Hooks/UseAdmin";
import { IoIosMan } from "react-icons/io";
import { FaCodePullRequest } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { MdLibraryAdd, MdRateReview } from "react-icons/md";
import useTeacher from "../../Hooks/useTeacher";
const Dashboard = () => {
    const [isAdmin, isAdminPending] = UseAdmin()
    const [isTeacher, isATeacherPending] = useTeacher()
    console.log(isAdmin);
    console.log(isAdminPending);
    if (isAdminPending) {
        return <p>loading...</p>
    }
    return (
        <div className=" roboto max-w-6xl mx-auto flex flex-col md:flex-row gap-5">
            <div className=" max-h-sm w-full md:w-2/5 lg:w-2/5 bg-blue-300 space-y-4 p-5">
                {/* isAdmin && !isTeacher && */}
                    <div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaCodePullRequest />
                            <NavLink to={'/dashBoard/teacherRequest'}>TEACHER'S REQUEST</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaUser />
                            <NavLink to='/dashboard/allUsers'>ALL USERS</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <SiGoogleclassroom />
                            <NavLink to='/dashBoard/allCourses'>ALL COURSES</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <IoIosMan />
                            <NavLink to='/dashBoard/profile'>PROFILE</NavLink>
                        </div>
                    </div>
             
                    // isTeacher && !isAdmin &&
                    <div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <MdLibraryAdd />
                            <NavLink to={'/dashBoard/addCourse'}>ADD COURSE</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <MdRateReview />
                            <NavLink to='/dashboard/myClasses'>MY COURSEES</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <IoIosMan />
                            <NavLink to='/dashBoard/teacherProfile'>MY PROFILE</NavLink>
                        </div>
                    </div>
                     {/* <p>!isAdmin && !isTeacher && </p> */}
                    <div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <MdRateReview />
                            <NavLink to={'/dashBoard/myEnroledCourses'}>MY ENROLED COURSEES</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <IoIosMan />
                            <NavLink to='/dashBoard/studentProfile'>MY PROFILE</NavLink>
                        </div>
                    </div>
               
                <div>
                    <div className=" border-b-2 border-white my-5"></div>
                    <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                        <FaHome />
                        <NavLink to='/'>HOME</NavLink>
                    </div>
                    <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                        <FaUtensils />
                        <NavLink>MENU</NavLink>
                    </div>
                    <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                        <FaList />
                        <NavLink>SHOP</NavLink>
                    </div>
                    <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                        <FaBook />
                        <NavLink>CONTACT</NavLink>
                    </div>
                </div>
            </div>
            <div className=" w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;