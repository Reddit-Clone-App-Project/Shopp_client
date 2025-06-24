import Logo from '../assets/CreateStore/ShoppStoreLogo.svg';
import { Link } from 'react-router-dom';

const CreateStoreHeader = () => {
    return (
        <header className="h-[100px] bg-white flex items-center">
            <Link to='/home'>
                <img src={Logo} alt="logo" className="h-[45px] w-[200px] mr-6 ml-1"/>
            </Link>
            <h1 className="text-3xl">Sign up to become a Shopp seller</h1>
        </header>
    );
}; 
 
export default CreateStoreHeader;