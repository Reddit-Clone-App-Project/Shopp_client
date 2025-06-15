import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <header className='h-[100px] bg-[#A567C6] flex items-center justify-center'>
                <Link to="/home">
                    <img src={ Logo } alt='Logo shopp' className='w-[135px] h-[56px]'/>
                </Link>
            </header>
            
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='w-full max-w-md bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <LoginForm />
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default LoginPage;