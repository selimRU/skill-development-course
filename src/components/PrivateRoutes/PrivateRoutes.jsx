import { Navigate, useLocation } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
import useAuth from "../../Hooks/useAuth";

const PrivateRoutes = ({ children }) => {
    const location = useLocation()
    const { user, loading } = useAuth()
    if (loading)
        return <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
        />
    if (!user) {
        return <Navigate state={location.pathname} to='/logIn'></Navigate>
    }
    return children
};

export default PrivateRoutes;