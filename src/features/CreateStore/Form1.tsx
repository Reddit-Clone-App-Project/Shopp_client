import React, { useState } from 'react';
import frame from '../../assets/CreateStore/SideFrame1.svg';
import CreateStoreHeader from '../../components/CreateStoreHeader';
import AddAddressModal from './AddAddressModal';
import { AddressFormData } from './AddAddressModal';



type Form1Props = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
};

const Form1: React.FC<Form1Props> = ({ data, onChange, onNext }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    
    const handleAddressSave = (address: AddressFormData) => {
        onChange({ ...data, address });
    };

    return (
        <div className="bg-[#F4F4F5] flex flex-col min-h-screen">
            <CreateStoreHeader />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className='flex w-full max-w-[1000px] h-[500px] bg-[#FFFFFF] border-t border-t-[rgba(0,0,0,0.1)] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[12px] p-6 sm:p-8'>
                    <div className='flex m-auto w-[75%] h-[200px]'>
                        <img src={frame} alt='bar progress' className='ml-4 mb-6'/>
                    </div>
                    <div className="flex flex-col justify-between p-2 mb-2 w-full mr-10">
                        <label htmlFor="name" className="block text-[1.2rem] font-normal">
                            Shop's Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            placeholder="ToyShop.official"
                            value={data.storeName}
                            onChange={e => onChange({ ...data, storeName: e.target.value })}
                            className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                        />

                        <p className='text-[1.2rem] font-normal'>Pick Up Address</p>
                        {data.address && (
                            <div className="border-[rgba(0,0,0,0.3)] border rounded-[8px]">
                            <p>{data.address.full_name}, {data.address.phone_number}</p>
                            <p>{data.address.city}, {data.address.province}, {data.address.country}, {data.address.postal_code}</p>
                            <p>{data.address.address_line1}, {data.address.address_line2}</p>
                            </div>
                        )}
                        <button 
                            type='button' 
                            onClick={() => setModalOpen(true)} 
                            className="px-2 py-1 w-18 rounded-[8px] bg-[#A567C6] text-white hover:bg-purple-700 hover:cursor-pointer"
                            >
                            + Add
                        </button>

                        <AddAddressModal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            onSave={(addr) => {
                                handleAddressSave(addr);
                                setModalOpen(false);
                            }}
                        />

                        <label htmlFor="email" className="block text-[1.2rem] font-normal">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            placeholder="example@gmail.com"
                            value={data.storeEmail}
                            onChange={e => onChange({ ...data, storeEmail: e.target.value })}
                            autoComplete='email'
                            className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                        />

                        <label htmlFor="phone" className="block text-[1.2rem] font-normal">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="text"
                            required
                            placeholder="012345678"
                            value={data.storePhone}
                            onChange={e => onChange({ ...data, storePhone: e.target.value })}
                            autoComplete='tel'
                            className="box-border w-full h-10 px-3 border border-[rgba(0,0,0,0.3)] rounded-[8px]"
                        />
                        <div className='flex justify-end'>
                            <button
                                type='button'
                                onClick={onNext}
                                disabled={!data.storeName || !data.storeEmail || !data.storePhone || !data.address}
                                className="bg-[#A567C6] hover:bg-purple-800 w-16 text-white py-1 px-2 rounded-[8px] hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[rgba(165,103,198)]"
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

export default Form1;
                    
                    /*<button 
                        type='button'
                        onClick={onSubmit} 
                        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Save store
                    </button>*/