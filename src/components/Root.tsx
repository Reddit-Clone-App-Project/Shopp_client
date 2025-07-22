import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchNewAccessToken } from '../features/Auth/AuthSlice';
import { handleGetProfile } from '../features/UserProfile/UserProfileSlice';

const Root = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const { status, error, user } = useSelector(
        (state: RootState) => state.profile
    );

    useEffect(() => {
        if(!isLoggedIn){ 
            const promise = dispatch(fetchNewAccessToken());
            return () => {
                promise.abort(); // Clean up the promise if the component unmounts
            }
        }
    }, [isLoggedIn, dispatch]);

    useEffect(() => {
        if (isLoggedIn && !user) {
            const promise = dispatch(handleGetProfile());
            return () => {
                promise.abort();
            }
        }
    }, [isLoggedIn, user, dispatch]);


    return (
        <div>
            <main>
                <Outlet />
            </main>
            <ToastContainer />
        </div>
    )
};

export default Root;