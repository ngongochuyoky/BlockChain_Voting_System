import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes( {isAllowed, redirectPath} ) {
    console.log(isAllowed)
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}

export default ProtectedRoutes;