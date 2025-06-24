import React from 'react';
import frame from '../../assets/CreateStore/SideFrame2.svg';
import CreateStoreHeader from '../../components/CreateStoreHeader';
import ToggleSwitch from '../../components/ToggleSwitch';

type Form2Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
};

const Form2: React.FC<Form2Props> = ({ data, onChange, onNext, onBack, onSubmit }) => {

    return (
        <div className="bg-[#F4F4F5] flex flex-col min-h-screen">
            <CreateStoreHeader />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='flex w-full max-w-[1000px] h-[500px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <div className='flex w-[75%] h-[200px] m-auto'>
                        <img src={frame} alt='bar progress' className='ml-4 mb-6'/>
                    </div>
                    <div className="flex flex-col justify-between p-2 mb-2 w-full mr-10 font-light">
                        <div>
                            <h2 className='text-2xl'>Shipping Method</h2>
                            <p className='text-[0.8rem] text-gray-500'>Activate the appropriate shipping method</p>
                        </div>
                        <div className='flex justify-between'> 
                            <p className='text-[1.2rem] font-normal'>Express</p>
                            <ToggleSwitch 
                                value={data.expressShipping}
                                onChange={(val) => onChange({ ...data, expressShipping: val})}
                            />
                        </div>

                        <div className='flex justify-between'> 
                            <p className='text-[1.2rem] font-normal'>Fast</p>
                            <ToggleSwitch 
                                value={data.fastShipping}
                                onChange={(val) => onChange({ ...data, fastShipping: val})}
                            />
                        </div>
                        
                        <div className='flex justify-between'> 
                            <p className='text-[1.2rem] font-normal'>Economical</p>
                            <ToggleSwitch 
                                value={data.economicalShipping}
                                onChange={(val) => onChange({ ...data, economicalShipping: val})}
                            />
                        </div>

                        <div className='flex justify-between'> 
                            <div>
                                <p className='text-[1.2rem] font-normal'>Bulky</p>
                                <p className='text-[0.8rem] text-gray-500 w-90'>For goods that are over 155lbs, or have the total width, length, and height over 150 centimeters</p>
                            </div>
                            <ToggleSwitch 
                                value={data.bulkyShipping}
                                onChange={(val) => onChange({ ...data, bulkyShipping: val})}
                            />
                        </div>

                        <div className='flex justify-end'>
                            <button
                                type='button'
                                onClick={onBack}
                                className="bg-white w-16 border py-1 px-2 rounded-[8px] hover:cursor-pointer hover:bg-purple-800 hover:text-white mr-6"
                            >
                                Back
                            </button>

                            <button
                                type='button'
                                onClick={() => {
                                    onSubmit();
                                    onNext(); 
                                }}
                                disabled={!(data.expressShipping || data.fastShipping || data.economicalShipping || data.bulkyShipping)}
                                className="bg-[#A567C6] hover:bg-purple-800 w-16 text-white py-1 px-2 rounded-[8px] hover:cursor-pointer disabled:opacity-50 disabled:hover:bg-[rgba(165,103,198)] disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
};

export default Form2;