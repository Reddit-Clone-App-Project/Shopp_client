import Logo from '../assets/Logo.svg';
import LoginForm from '../features/LoginUser/LoginForm';

const LoginPage = () => {

    return (
        <div>
            <header className='absolute w-[1440px] h-[100px] left-[0px] top–[0px] bg-[#A567C6]'>
                <img src={ Logo } alt='Logo shopp' className='absolute w-[135px] h-[56px] left-[652px] top-[22px]'/>
            </header>
            <main>
                <div className='absolute w-[500px] h-[350px] left-[470px] top-[139px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px]'>
                    <section>
                        <LoginForm />
                        <p className='absolute w-[119px] h-[17px] left-[50px] top-[225px] Inter not-italic font-normal text-sm leading-4 text-purple-800'>Forget Password?</p>
                    </section>
                </div>
            </main>
            <p>prova</p>
        </div>
    );
};

export default LoginPage;

/* Forget Password? */




