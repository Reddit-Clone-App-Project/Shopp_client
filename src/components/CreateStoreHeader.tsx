import Logo from '../assets/CreateStore/ShoppStoreLogo.svg';

const CreateStoreHeader = () => {
    return (
        <header className="h-[100px] bg-white flex items-center">
            <img src={Logo} alt="logo" className="h-[45px] w-[200px] mr-6 ml-1"/>
            <h1 className="text-3xl">Sign up to become a Shopp seller</h1>
        </header>
    );
}; 
 
export default CreateStoreHeader;