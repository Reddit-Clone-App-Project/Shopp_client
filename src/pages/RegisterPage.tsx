import { useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Footer from '../components/Footer';
import RegisterForm from '../features/RegisterUser/RegisterForm';

const RegisterPage = () => {
    const navigate = useNavigate(); 

    const handleSubmit = async (email: string, phone: string, password: string, role: string) => {
        try {
            const response = await fetch('http://localhost:3000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phone, password, role }),
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.error || 'Error during registration');
                return;
            };

            alert('Registration completed');
            navigate('/login');
            
        } catch (err) {
            alert('Connection Failed, try again')
        }
    };

    return (
        <div>
            <header className='h-[100px] bg-[#A567C6] content-center'>
                <img src={ Logo } alt='Logo shopp' className='flex w-[135px] h-[56px] m-auto'/>
            </header>
            <main>
                <div className='w-[500px] h-[560px] m-auto mt-8 bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px]'>
                    <RegisterForm 
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

export default RegisterPage;