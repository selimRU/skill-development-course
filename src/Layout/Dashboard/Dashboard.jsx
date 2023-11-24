import { Outlet } from "react-router-dom";
// import DashBoardNav from "./DashBoardNav";
import { FaBook, FaHome, FaList, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UseAdmin from "../../Hooks/UseAdmin";


const Dashboard = () => {
    const [isAdmin, isAdminPending] = UseAdmin()
    console.log(isAdmin);
    console.log(isAdminPending);
    if (isAdminPending) {
        return <p>loading...</p>
    }
    return (
        <div className=" max-w-6xl mx-auto flex flex-col md:flex-row gap-5">
            <div className=" max-h-sm w-full md:w-2/5 lg:w-2/5 bg-blue-300 space-y-4 p-5">
                {isAdmin &&
                    <div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaHome />
                            <NavLink to={'dashBoard/adminHome'}>ADMIN HOME</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaUtensils />
                            <NavLink to='/dashBoard/addItem'>ADD ITEMS</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaList />
                            <NavLink to='/dashBoard/manageItem'>MANAGE ITEMS</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaBook />
                            <NavLink to='/dashBoard/myCarts'>MANAGE BOOKINGS</NavLink>
                        </div>
                        <div className=" flex flex-col md:flex-col lg:flex-row items-center gap-1 mb-3">
                            <FaUser />
                            <NavLink to='/dashboard/allUsers'>ALL USERS</NavLink>
                        </div>
                    </div>
                }
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