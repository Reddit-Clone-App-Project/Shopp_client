import Logo from '../assets/Logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';
import Footer from '../components/Footer';

const LoginPage = () => {

    const handleSubmit = () => {

    };

    return (
        <div>
            <header className='absolute w-[1440px] h-[100px] left-[0px] top–[0px] bg-[#A567C6]'>
                <img src={ Logo } alt='Logo shopp' className='absolute w-[135px] h-[56px] left-[652px] top-[22px]'/>
            </header>
            <main>
                <div className='absolute w-[500px] h-[350px] left-[470px] top-[139px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px]'>
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




