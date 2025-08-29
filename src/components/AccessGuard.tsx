/* 
    This component it's used for specific page or section that have only access with role, like a dashboard for a owner seller but not for a editor seller
    To call this component you need to wrap the component around the page or section, for example:
    <AccessGuard allowedRoles={['seller']}>
        <CreateStorePage />
    </AccessGuard>
    it can have no allowedRoles and it verify only if the user is logged in
*/

import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { RootState } from '../redux/store';
import Loading from './Loading';

interface AccessGuardProps {
    allowedRoles?: string[];
    children: React.ReactNode; /* the content of the page that's rendered if the user have the authorization */
};

const AccessGuard: React.FC<AccessGuardProps> = ({ allowedRoles, children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, role, status } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if(status === 'succeeded' || status === 'failed'){
            if (!isLoggedIn) {
                toast.error('You must be logged in!', {
                    autoClose: false,
                    closeOnClick: true,
                    onClose: () => navigate('/login', { state: { from: location } })
                });
                return;
            };
    
            if (allowedRoles && !allowedRoles.includes(role || '')) {
                toast.error('You do not have permission to access this page.', {
                    autoClose: false,
                    closeOnClick: true,
                    onClose: () => navigate('/home')
                });
            };
        }
    }, [isLoggedIn, role, status, allowedRoles, navigate, location]);

    if (status === 'loading' || status === 'idle') {
        return <Loading />;
    }

    if (isLoggedIn && (!allowedRoles || allowedRoles.includes(role || ''))) {
        return <>{children}</>;
    }

    return null;
};

export default AccessGuard;
