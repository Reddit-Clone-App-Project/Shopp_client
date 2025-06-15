import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/Auth/AuthSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
/*import { useNavigate } from 'react-router-dom';*/
import Logo from '../assets/Logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () => {
    /*const navigate = useNavigate();*/
    const dispatch = useDispatch();

    const handleLogin = async (eOrP: string, password: string) => {
        try {
            const res = await axios.post('http://localhost:3000/users/login', {
                eOrP,
                password,
            });

            dispatch(loginSuccess({accessToken: res.data.accessToken}))
            toast.success('Login successfully!');
            /*navigate('/homepage');*/

        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error("Network or Database Error!");
            }
        }
    }; 

    return (
        <div className="flex flex-col min-h-screen">
            <header className='h-[100px] bg-[#A567C6] flex items-center justify-center'>
                <Link to="/home">
                    <img src={ Logo } alt='Logo shopp' className='w-[135px] h-[56px]'/>
                </Link>
            </header>
            
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='w-full max-w-md bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <LoginForm 
                        onSubmit={handleLogin}
                    />
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default LoginPage;