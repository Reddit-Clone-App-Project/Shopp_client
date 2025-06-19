import React, { useState } from 'react';
import frame from '../../assets/CreateStore/SideFrame1.svg';
import CreateStoreHeader from '../../components/CreateStoreHeader';
import { StoreStepProps } from './LandingForm';
import AddAddressModal from './AddAddressModal';
import { AddressFormData } from './AddAddressModal';



type Form1Props = {
  data: any;
  onChange: (data: any) => void;
  onSubmit: () => void;
};

const Form1: React.FC<Form1Props> = ({ data, onChange, onSubmit }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleAddressSave = (address: AddressFormData) => {
        onChange({ ...data, address });
    };

    return (
        <div className="bg-[#F4F4F5] flex flex-col min-h-screen">
            <CreateStoreHeader />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='flex w-full max-w-[1000px] h-[500px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <div className='flex h-[350px]'>
                        <img src={frame} alt='bar progress' className='ml-4'/>
                        <ul className='font-light text-[1.2rem] mt-5 mb-5 ml-2 flex flex-col justify-between w-full'>
                            <li className='font-semibold text-purple-800'>Shop's Information</li>
                            <li>Shipping Settings</li>
                            <li>Tax Information</li>
                            <li>Identification Information</li>
                            <li>Complete</li>
                        </ul>
                    </div>
                </div>
                <div className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Step 3: Indirizzo</h2>

                    {data.address && (
                        <div className="mb-4 border rounded p-2">
                        <p>{data.address.street}, {data.address.city}</p>
                        <p>{data.address.postalCode}, {data.address.country}</p>
                        </div>
                    )}

                    <button 
                        type='button' 
                        onClick={() => setModalOpen(true)} 
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        + Aggiungi Indirizzo
                    </button>

                    <AddAddressModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        onSave={(addr) => {
                        handleAddressSave(addr);
                        setModalOpen(false);
                        }}
                    />

                    <button 
                        type='button'
                        onClick={onSubmit} 
                        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Invia Store
                    </button>
                </div>
            </main>
        </div>
    )
};

export default Form1;