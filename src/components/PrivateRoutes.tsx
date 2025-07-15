/* 
    This component it's used to check authorization for the whole routes path of a page and it's usually put in the routes file like this
    <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']} component={AdminHomePage} />} />
    like AccessGuard it can have no role and it'll check if a user it's logged for the whole path routes
    For example for all the routes like /admin/me, /admin/ticket, /admin/dashbaord and so on the component will check authorization
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import { useEffect } from 'react';

interface PrivateRouteProps {
    children: React.ReactNode; /* component that we render if the user have authorization */
    allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
    const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const location = useLocation();

     useEffect(() => {
        if (!isLoggedIn) {
        toast.error('You must be logged in!');
        navigate('/login', { state: { from: location.pathname }, replace: true });
        }
    }, [isLoggedIn, navigate, location]);

    if (!isLoggedIn) return null;

    if (allowedRoles && !allowedRoles.includes(role || '')) {
        toast.error('You do not have permission to access this page.', {
            autoClose: false,
            closeOnClick: true,
            onClose: () => navigate('/home')
        });
        return null;
    }

    return <>{children}</>;
};

export default PrivateRoute;
