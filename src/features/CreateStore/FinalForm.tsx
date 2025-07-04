import React from 'react';
import frame from '../../assets/CreateStore/FinalFrame.svg';
import vector from '../../assets/CreateStore/FinalVector.svg';
import redCross from '../../assets/CreateStore/RedCross.svg';
import CreateStoreHeader from '../../components/CreateStoreHeader';
import { Link } from 'react-router-dom';

export type FinalFormProps = {
    status: boolean;
};

const FinalForm: React.FC<FinalFormProps> = ({ status }) => {

    return (
        <div className="bg-[#F4F4F5] flex flex-col min-h-screen">
            <CreateStoreHeader />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='flex w-full max-w-[1000px] h-[500px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <div className='flex w-[75%] h-[200px] m-auto'>
                        <img src={frame} alt='bar progress' className='ml-4 mb-6'/>
                    </div>
                    { status === true && 
                        <div className="content-center p-2 w-full mr-10 ml-0">
                            <img src={vector} alt='waiting' className='h-[150px] m-auto mb-10'/>
                            <p className='text-[1.2rem] text-center'>
                                Now wait until we verify your information! <br />
                                We will send you the result via the email that you registered
                            </p>
                        </div>
                    }
                    { status === false && 
                        <div className="content-center p-2 w-full mr-10 ml-0">
                            <img src={redCross} alt='error' className='h-[150px] m-auto mb-10'/>
                            <p className='text-[1.2rem] text-center'>
                                There was an error during the registration <br />
                                Please try again
                            </p>
                        </div>
                    }
                    <div className='mt-auto'>
                        <Link to='/home' className="bg-black text-white px-4 py-1.5 rounded-md hover:bg-purple-800 transition-colors cursor-pointer">
                            End
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default FinalForm;