
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.svg';
import Footer from '../components/Footer';
import RegisterForm from '../features/RegisterUser/RegisterForm';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const RegisterPage = () => {
    const navigate = useNavigate(); 

    const handleRegister = async (email: string, phone_number: string, password: string, role: string) => {
        try {
            await axios.post('http://localhost:3000/users/register', {
                email,
                phone_number,
                password,
                role,
            });

            toast.success('Registration completed!');
            navigate('/login');
            
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Network Error, try again!')
            }
        };
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className='h-[100px] bg-[#A567C6] flex items-center justify-center'>
                <Link to="/home">
                    <img src={ Logo } alt='Logo shopp' className='w-[135px] h-[56px]'/>
                </Link>
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
                <div className='w-full max-w-lg bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8 my-8'>
                    <RegisterForm 
                        onSubmit={handleRegister}
                    />  
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegisterPage;