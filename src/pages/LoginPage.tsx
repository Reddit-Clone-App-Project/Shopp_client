import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/Auth/AuthSlice';
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
            alert('Login successfully!');
            /*navigate('/homepage');*/

        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("Network or Database Error!");
            }
        }
    }; 

    return (
        <div>
            <header className='h-[100px] bg-[#A567C6] content-center'>
                <img src={ Logo } alt='Logo shopp' className='flex w-[135px] h-[56px] m-auto'/>
            </header>
            <main>
                <div className='w-[500px] h-[320px] m-auto mt-8 bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px]'>
                    <LoginForm 
                        onSubmit={handleLogin}
                    />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default LoginPage;




