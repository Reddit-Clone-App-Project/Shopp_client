/* 
    This component it's used to check authorization for the whole routes path of a page and it's usually put in the routes file like this
    <Route path="/admin" element={<PrivateRoute allowedRoles={['admin']} component={AdminHomePage} />} />
    like AccessGuard it can have no role and it'll check if a user it's logged for the whole path routes
    For example for all the routes like /admin/me, /admin/ticket, /admin/dashbaord and so on the component will check authorization
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';

interface PrivateRouteProps {
    component: React.ComponentType<any>; /* component that we render if the user have authorization */
    allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, allowedRoles }) => {
    const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    if (!isLoggedIn) {
        toast.error('You must be logged in!', {
            autoClose: false,
            closeOnClick: true,
            onClose: () => navigate('/login')
        });
        return null;
    }

    if (allowedRoles && !allowedRoles.includes(role || '')) {
        toast.error('You do not have permission to access this page.', {
            autoClose: false,
            closeOnClick: true,
            onClose: () => navigate('/home')
        });
        return null;
    }

    return <Component />;
};

export default PrivateRoute;
