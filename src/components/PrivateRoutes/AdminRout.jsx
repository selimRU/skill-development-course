import { Navigate, useLocation } from "react-router-dom";
import UseAdmin from "../../Hooks/UseAdmin";


const AdminRout = ({ children }) => {
    const location = useLocation()
    const [isAdmin, isAdminPending] = UseAdmin()

    if (isAdminPending)
        return <progress></progress>

    if (!isAdmin) {
        return <Navigate state={location.pathname} to='signin' />
    }
    return children
    return (
        <div>

        </div>
    );
};

export default AdminRout;