import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';

export type AddressFormData = {
    full_name: string;
    phone_number: string;
    country: string;
    province: string | null;
    city: string;
    postal_code: string;
    address_line1: string;
    address_line2: string | null;
};

type AddAddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: AddressFormData) => void;
};

const AddAddressModal: React.FC<AddAddressModalProps> = ({ isOpen, onClose, onSave }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddressFormData>();

    useEffect(() => {
        if (!isOpen) reset();
    }, [isOpen, reset]);
    
    const onSubmit = (data: AddressFormData) => {
        onSave(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                    onClick={onClose}>
                    ✖
                </button>
                <h2 className="text-lg font-bold mb-4">Add Address</h2>
                <div className="flex flex-col gap-4">
                    <input 
                        type="text" {...register("full_name", { required: "Name required" })} placeholder="Full Name" className="border p-2 rounded"       
                    />
                        {errors.full_name && 
                            <p className="text-red-500 text-sm">{errors.full_name.message}</p>}

                    <input 
                        type="text" {...register("phone_number", { required: "Phone number required" })} placeholder="Phone Number" className="border p-2 rounded" 
                    />
                        {errors.phone_number && 
                            <p className="text-red-500 text-sm">{errors.phone_number.message}</p>}

                    <input 
                        type="text" {...register("country", { required: "Country required" })} placeholder="Country" className="border p-2 rounded" 
                    />
                        {errors.country && 
                            <p className="text-red-500 text-sm">{errors.country.message}</p>}

                    <input 
                        type="text" {...register("province")} placeholder="Province" className="border p-2 rounded" 
                    />
                        
                    <input 
                        type="text" {...register("city", { required: "City required" })} placeholder="City" className="border p-2 rounded"       
                    />
                        {errors.city && 
                            <p className="text-red-500 text-sm">{errors.city.message}</p>}

                    <input 
                        type="text" {...register("postal_code", { required: "Postal code required" })} placeholder="Postal Code" className="border p-2 rounded"       
                    />
                        {errors.postal_code && 
                            <p className="text-red-500 text-sm">{errors.postal_code.message}</p>}

                    <input 
                        type="text" {...register("address_line1", { required: "Address required" })} placeholder="Address line 1" className="border p-2 rounded"       
                    />
                        {errors.address_line1 && 
                            <p className="text-red-500 text-sm">{errors.address_line1.message}</p>}

                    <input 
                        type="text" {...register("address_line2")} placeholder="Address line 2" className="border p-2 rounded"       
                    />
                       
                    <button 
                        type="button" 
                        onClick={handleSubmit(onSubmit)}
                        className="bg-black text-white py-2 px-4 rounded hover:bg-purple-700 hover:cursor-pointer">
                        Save
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AddAddressModal;