import axios from 'axios';
import Logo from '../assets/Logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () => {

    const handleSubmit = (eOrP: string, password: string) => {
        
    };

    return (
        <div>
            <header className='h-[100px] bg-[#A567C6] content-center'>
                <img src={ Logo } alt='Logo shopp' className='flex w-[135px] h-[56px] m-auto'/>
            </header>
            <main>
                <div className='w-[500px] h-[320px] m-auto mt-8 bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px]'>
                    <LoginForm 
                        onSubmit={handleSubmit}
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




