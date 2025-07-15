import { ProductDataType } from "../../pages/seller/CreateProduct";
import SellerBlackHeader from "../../components/SellerBlackHeader";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";


type SalesInfoProps = {
    data: ProductDataType;
    onChange: (updater: (prev: ProductDataType) => ProductDataType) => void;
    onBack: () => void;
    onSubmit: () => void;
};

const SalesInformation: React.FC<SalesInfoProps> = ({ data, onChange, onBack, onSubmit }) => {
    const {
        price,
        weight,
        length,
        width,
        height,
        express,
        fast,
        economical,
        bulky,
        sku,
    } = data;

    const [variant, setVariant] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm<ProductDataType>();

    return (
        <div>
            <div className='mt-4'>
                <div className='flex bg-slate-700 h-12'>
                    <div className='flex-1 flex justify-start items-center'>
                        <p className='ml-5'>Basic information</p>
                        <p className='ml-5 text-[#A567C6]'>Sales information</p>
                        <div className='bg-[#A567C6] ml-39 h-0.5 w-36 absolute self-end'></div>
                    </div>
                </div>
                <div className='bg-slate-700 px-4 py-4 mt-4'>
                    <h3 className='font-semibold text-lg mb-2.5'>Sales information</h3>
                    <div className='flex font-semibold mb-4 text-[0.9rem]'>
                        <p className={`mr-6 hover:cursor-pointer hover:underline ${!variant ? 'underline text-[#A567C6]' : ''}`} 
                            onClick={() => setVariant(false)}>
                                No Variants
                        </p>
                        <p className={`mr-6 hover:cursor-pointer hover:underline ${variant ? 'underline text-[#A567C6]' : ''}`} 
                            onClick={() => setVariant(true)}>
                                Variants
                        </p>
                    </div>
                    <h3 className='font-semibold text-lg mb-2.5'>Shipping</h3>
                    <div className='flex flex-col gap-4 mb-4'>
                        <label htmlFor='product-weight' className='font-semibold text-[0.9rem]'>
                            <span className='text-red-500'>*</span>
                            Weight(lbs) - After packing
                        </label>
                        <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[50%]' 
                            type="number"
                            step='1' 
                            id='product-weight'
                            {...register('weight', {
                                required: 'Weight required',
                                pattern: {
                                    value: /^\d+$/,
                                    message: 'Insert only integer numbers'
                                }
                            })} 
                            placeholder="Enter weight here" 
                            value={weight} 
                            onChange={e => onChange(prev => ({...prev, weight: Number(e.target.value)}))}
                        />
                    </div>
                    <div className='flex flex-col gap-4 mb-4'>
                        <label htmlFor='product-weight' className='font-semibold text-[0.9rem]'>
                            <span className='text-red-500'>*</span>
                            Packing size(cm) - Actual shipping fee will vary if you enter wrong size
                        </label>
                        <div className='flex justify-between w-[80%]'>
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[30%]' 
                                type="number" 
                                id='product-weight' 
                                placeholder="Enter Length" 
                                value={length} 
                                onChange={e => onChange(prev => ({...prev, length: Number(e.target.value)}))}
                            />
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[30%]' 
                                type="number" 
                                id='product-weight' 
                                placeholder="Enter Width" 
                                value={width} 
                                onChange={e => onChange(prev => ({...prev, width: Number(e.target.value)}))}
                            />
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[30%]' 
                                type="number" 
                                id='product-weight' 
                                placeholder="Enter Height" 
                                value={height} 
                                onChange={e => onChange(prev => ({...prev, height: Number(e.target.value)}))}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-10">
                        <button
                            onClick={onBack}
                            className='mr-4 border-[#A567C6] rounded-lg px-3 py-1 bg-[#A567C6] hover:cursor-pointer hover:bg-purple-800'
                        >
                            Back
                        </button>
                        <button
                            onClick={onSubmit}
                            className='border-[#A567C6] rounded-lg px-3 py-1 bg-[#A567C6] hover:cursor-pointer hover:bg-purple-800'
                        >
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesInformation;