import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import LoginForm from '../features/LoginSeller/LoginForm';
import Footer from '../components/Footer';

const SellerLoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-[100px] bg-[#A567C6] flex items-center justify-center">
        <Link to="/home">
          <img src={Logo} alt="Logo shopp" className="w-[135px] h-[56px]" />
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 bg-black">
        <div className="w-full max-w-md bg-black border-t border-t-[rgba(255,255,255,0.1)] shadow-[0_4px_4px_rgba(255,255,255,0.1)] rounded-[12px] p-6 sm:p-8">
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerLoginPage;
