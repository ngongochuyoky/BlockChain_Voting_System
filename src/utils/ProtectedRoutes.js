import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoutes( {isAllowed, redirectPath} ) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
}

export default ProtectedRoutes;