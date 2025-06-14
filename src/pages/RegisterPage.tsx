import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/Logo.svg';
import Footer from '../components/Footer';
import RegisterForm from '../features/RegisterUser/RegisterForm';
import { Link } from 'react-router-dom';

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

            alert('Registration completed!');
            navigate('/login');
            
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert('Network Error, try again!')
            }
        };
    };

    return (
        <div>
            <header className='h-[100px] bg-[#A567C6] content-center'>
                <Link to="/home">
                    <img src={ Logo } alt='Logo shopp' className='flex w-[135px] h-[56px] m-auto'/>
                </Link>
            </header>
            <div>
                <div className='w-[500px] h-[560px] m-auto mt-8 bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px]'>
                    <RegisterForm 
                        onSubmit={handleRegister}
                    />  
                </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default RegisterPage;