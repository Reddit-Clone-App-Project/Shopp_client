import Store from '../../assets/CreateStore/Store.svg';
import Logo from '../../assets/CreateStore/ShoppStoreLogo.svg';

type StoreStep1Props = {
  onNext: () => void;
};

const LandingForm: React.FC<StoreStep1Props> = ({ onNext }) => {
    return (
        <div className="bg-[#F4F4F5] flex flex-col min-h-screen">
            <header className="h-[100px] bg-white flex items-center">
                <img src={Logo} alt="logo" className="h-[45px] w-[200px] mr-6 ml-1"/>
                <h1 className="text-3xl">Sign up to become a Shopp seller</h1>
            </header>
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='flex justify-center w-full max-w-[1000px] h-[500px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <div>
                        <img src={Store} alt='store' className='h-[100px] w-[100px] m-auto mt-22'/>
                        <p className='text-[1.2rem] font-[350] mb-5'>This account haven't had a shop yet!</p>
                        <button 
                            onClick={onNext}
                            className='flex w-full sm:w-auto m-auto px-4 py-3 bg-[#A567C6] text-[1.2rem] font-[350] rounded-[8px] text-white leading-4 hover:cursor-pointer hover:bg-purple-800'>
                            Sign up
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};
    
export default LandingForm;