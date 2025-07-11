import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Root = () => {
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