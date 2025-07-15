import { ProductDataType } from "../../pages/seller/CreateProduct";
import SellerBlackHeader from "../../components/SellerBlackHeader";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import ToggleSwitch from "../../components/ToggleSwitch";


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
                            type="text"
                            id='product-weight'
                            {...register('weight', {
                                required: 'Weight required',
                            })} 
                            placeholder="Enter weight here" 
                            value={weight} 
                            onChange={e => onChange(prev => ({...prev, weight: e.target.value}))}
                        />
                    </div>
                    <div className='flex flex-col gap-4 mb-4'>
                        <label htmlFor='product-length' className='font-semibold text-[0.9rem]'>
                            <span className='text-red-500'>*</span>
                            Packing size(cm) - Actual shipping fee will vary if you enter wrong size
                        </label>
                        <div className='flex justify-between w-[80%]'>
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[30%]' 
                                type="text" 
                                id='product-length' 
                                placeholder="Enter Length" 
                                value={length} 
                                onChange={e => onChange(prev => ({...prev, length: e.target.value}))}
                            />
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[30%]' 
                                type="text" 
                                placeholder="Enter Width" 
                                value={width} 
                                onChange={e => onChange(prev => ({...prev, width: e.target.value}))}
                            />
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[30%]' 
                                type="text" 
                                placeholder="Enter Height" 
                                value={height} 
                                onChange={e => onChange(prev => ({...prev, height: e.target.value}))}
                            />
                        </div>
                    </div>
                    <div className="border border-slate-400 p-2 rounded-lg">
                         <div className='flex justify-between mb-5 items-center'> 
                            <p className='text-[1.2rem] font-normal'>Express</p>
                            <p className="ml-auto mr-4">7.00 $</p>
                            <ToggleSwitch 
                                value={express}
                                onChange={(val) => onChange(prev => ({ ...prev, express: val}))}
                            />
                        </div> 
                        <div className='flex justify-between mb-5 items-center'> 
                            <p className='text-[1.2rem] font-normal'>Fast</p>
                            <p className="ml-auto mr-4">6.00 $</p>
                            <ToggleSwitch 
                                value={fast}
                                onChange={(val) => onChange(prev => ({ ...prev, fast: val}))}
                            />
                        </div>
                        <div className='flex justify-between mb-5 items-center'> 
                            <p className='text-[1.2rem] font-normal'>Economical</p>
                            <p className="ml-auto mr-4">5.00 $</p>
                            <ToggleSwitch 
                                value={economical}
                                onChange={(val) => onChange(prev => ({ ...prev, economical: val}))}
                            />
                        </div>
                        <div className='flex justify-between mb-5 items-center'> 
                            <div>
                                <p className='text-[1.2rem] font-normal'>Bulky</p>
                            </div>
                            <ToggleSwitch 
                                value={bulky}
                                onChange={(val) => onChange(prev => ({ ...prev, bulky: val}))}
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
                            /* disabled={!weight || !length || !width || !height || !(express || fast || economical || bulky)} */
                            className='border-[#A567C6] rounded-lg px-3 py-1 bg-[#A567C6] hover:cursor-pointer hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#A567C6]'
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