import { AnimatePresence, motion } from "framer-motion";
import { ProductDataType, VariantDataType } from "../../pages/seller/CreateProduct";
import React, { useState } from "react";


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
        sku,
        variant: {}
    } = data;

    const [variant, setVariant] = useState(false);
    const [newVariant, setNewVariant] = useState<Omit<VariantDataType, "id">>({
        variantName: '',
        variantPrice: '',
        variantWeight: '',
        variantLength: '',
        variantWidth: '',
        variantHeight: '',
        variantSku: '',
    });
    const [variantList, setVariantList] = useState<VariantDataType[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [nextId, setNextId] = useState(1);
    

    const handleCreateVariant = () => {
        if (!newVariant.variantName.trim()) return;
        setVariantList(prev => [...prev, 
            {id: nextId, ...newVariant}
        ]);
        setNextId(prev => prev + 1);
        setNewVariant({variantName: '',
            variantPrice: '',
            variantWeight: '',
            variantLength: '',
            variantWidth: '',
            variantHeight: '',
            variantSku: '',
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleCreateVariant();
    };

    const handleChangeVariant = (idx: number, field: keyof Omit<VariantDataType, "id">, value: string) => {
        setVariantList(prev =>
            prev.map((v, i) => 
                i === idx ? { ...v, [field]: value } : v
            )
        );
    };

    const handleRemoveVariant = (idToDelete: number) => {
        setVariantList(prev => prev.filter(variant => variant.id !== idToDelete));
    };

    const handleSubmit = () => {
        onChange(prev => ({
            ...prev,
            variants: variantList
        }));
        onSubmit();
    };

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

                    {!variant &&
                    <>
                        <h3 className='font-semibold text-lg mb-2.5'>Price</h3>
                        <div className='flex flex-col gap-4 mb-4'>
                            <label htmlFor='product-price' className='font-semibold text-[0.9rem]'>
                                <span className='text-red-500'>*</span>
                                Price in US dollar
                            </label>
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[50%]' 
                                type="text"
                                id='product-price'
                                placeholder="Enter price here" 
                                value={price} 
                                onChange={e => onChange(prev => ({...prev, price: e.target.value}))}
                            />
                        </div>

                        <h3 className='font-semibold text-lg mb-2.5'>Shipping</h3>
                        <div className='flex flex-col gap-4 mb-4'>
                            <label htmlFor='product-weight' className='font-semibold text-[0.9rem]'>
                                <span className='text-red-500'>*</span>
                                Weight (lbs) - After packing
                            </label>
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[50%]' 
                                type="text"
                                id='product-weight' 
                                placeholder="Enter weight here" 
                                value={weight} 
                                onChange={e => onChange(prev => ({...prev, weight: e.target.value}))}
                            />
                        </div>
                        <div className='flex flex-col gap-4 mb-4'>
                            <label htmlFor='product-length' className='font-semibold text-[0.9rem]'>
                                <span className='text-red-500'>*</span>
                                Packing size (cm) - Actual shipping fee will vary if you enter wrong size
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

                        <h3 className='font-semibold text-lg mb-2.5'>Other information</h3>
                        <div className='flex flex-col gap-4 mb-4'>
                            <label htmlFor='product-sku' className='font-semibold text-[0.9rem]'>
                                <span className='text-red-500'>*</span>
                                Product's Sku
                            </label>
                            <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[80%]' 
                                type="text" 
                                id='product-sku' 
                                placeholder="Enter Sku" 
                                value={sku} 
                                onChange={e => onChange(prev => ({...prev, sku: e.target.value}))}
                            /> 
                        </div>
                            
                    </>
                    }

                    {variant &&
                        <div className='flex flex-col gap-4 mb-4'>
                            <label htmlFor='variant-name' className='font-semibold text-[0.9rem]'>
                                <span className='text-red-500'>*</span>
                                At least 2 variants and max 10 variants
                            </label>
                            <div className='flex'>
                                <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 text-slate-400 w-[50%] mr-6' 
                                    type="text"
                                    id='variant-name'
                                    placeholder="Enter variant name here" 
                                    value={newVariant.variantName} 
                                    onChange={e => setNewVariant({...newVariant, variantName: e.target.value})}
                                    onKeyDown={handleKeyDown}
                                />
                                <button 
                                    className="border border-slate-400 px-3 py-1 text-slate-400 rounded-xl hover:cursor-pointer active:text-white active:border-white"
                                    disabled={variantList.length >= 10}
                                    type="button"
                                    onClick={handleCreateVariant}
                                >
                                    Create
                                </button>
                            </div>

                            <div className="min-w-[42rem] transition-all">
                                {variantList.length === 0 ? (
                                    <div className="ml-20 text-slate-400 italic">
                                        Any variants generated
                                    </div>
                                ) : (
                                variantList.map((variant, idx) => (
                                <div key={variant.id} className="mb-2 border border-slate-400 p-2 rounded-xl">
                                    <div
                                        className="cursor-pointer flex justify-between items-center"
                                        onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                                    >
                                        <span className="text-lg font-semibold">
                                            {variant.variantName}
                                        </span>
                                        <span>{activeIndex === idx ? "▲" : "▼"}</span>
                                    </div>
                                    <AnimatePresence initial={false}>
                                    {activeIndex === idx && (
                                        <>
                                            <label htmlFor={`variant-name-${idx}`} className='font-semibold text-[0.8rem]'>
                                                <span className='text-red-500'>*</span>
                                                Variant name
                                            </label>
                                            <label htmlFor={`variant-price-${idx}`} className='font-semibold text-[0.8rem] ml-34'>
                                                <span className='text-red-500'>*</span>
                                                Price in US dollar
                                            </label>
                                            <motion.div className="mt-2 gap-2 mb-4"
                                                initial={{ opacity: 0, scaleY: 0.95 }}
                                                animate={{ opacity: 1, scaleY: 1 }}
                                                exit={{ opacity: 0, scaleY: 0.95 }}
                                                transition={{ duration: 0.22, ease: "easeInOut" }}
                                                style={{ originY: 0 }}
                                            >
                                                
                                                <input
                                                className="mr-2 border border-slate-400 focus:border-slate-200 focus:outline-none p-2"
                                                id={`variant-name-${idx}`}
                                                placeholder="Enter Name"
                                                type="text"
                                                value={variant.variantName}
                                                onChange={e => handleChangeVariant(idx, "variantName", e.target.value)}
                                                />
                                                <input
                                                className="mr-2 border border-slate-400 focus:border-slate-200 focus:outline-none p-2"
                                                id={`variant-price-${idx}`}
                                                placeholder="Enter Price"
                                                type="text"
                                                value={variant.variantPrice}
                                                onChange={e => handleChangeVariant(idx, "variantPrice", e.target.value)}
                                                />

                                                <h3 className='font-semibold text-[0.9rem] mb-2.5 mt-4'>Shipping</h3>
                                                <div className='flex flex-col gap-4 mb-4'>
                                                    <label htmlFor={`variant-weight-${idx}`} className='font-semibold text-[0.8rem]'>
                                                        <span className='text-red-500'>*</span>
                                                        Weight (lbs) - After packing
                                                    </label>
                                                    <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 w-[50%]' 
                                                        type="text"
                                                        id={`variant-weight-${idx}`} 
                                                        placeholder="Enter weight here" 
                                                        value={variant.variantWeight} 
                                                        onChange={e => handleChangeVariant(idx, "variantWeight", e.target.value)}
                                                    />
                                                </div>
                                                <div className='flex flex-col gap-4 mb-4'>
                                                    <label htmlFor={`variant-length-${idx}`} className='font-semibold text-[0.8rem]'>
                                                        <span className='text-red-500'>*</span>
                                                        Packing size (cm) - Actual shipping fee will vary if you enter wrong size
                                                    </label>
                                                    <div className='flex justify-between w-[80%]'>
                                                        <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 w-[30%]' 
                                                            type="text" 
                                                            id={`variant-length-${idx}`} 
                                                            placeholder="Enter Length" 
                                                            value={variant.variantLength} 
                                                            onChange={e => handleChangeVariant(idx, "variantLength", e.target.value)}
                                                        />
                                                        <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 w-[30%]' 
                                                            type="text" 
                                                            placeholder="Enter Width" 
                                                            value={variant.variantWidth} 
                                                            onChange={e => handleChangeVariant(idx, "variantWidth", e.target.value)}
                                                        />
                                                        <input className='border border-slate-400 focus:border-slate-200 focus:outline-none p-2 w-[30%]' 
                                                            type="text" 
                                                            placeholder="Enter Height" 
                                                            value={variant.variantHeight} 
                                                            onChange={e => handleChangeVariant(idx, "variantHeight", e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <label htmlFor={`variant-sku-${idx}`} className='font-semibold text-[0.8rem]'>
                                                <span className='text-red-500'>*</span>
                                                    Sku
                                            </label>
                                            <motion.div className="mt-2 flex gap-2 mb-1"
                                                initial={{ opacity: 0, scaleY: 0.95 }}
                                                animate={{ opacity: 1, scaleY: 1 }}
                                                exit={{ opacity: 0, scaleY: 0.95 }}
                                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                                style={{ originY: 0 }}
                                            >
                                                
                                                <input
                                                className="mr-2 border border-slate-400 focus:border-slate-200 focus:outline-none p-2"
                                                id={`variant-sku-${idx}`}
                                                placeholder="Enter Sku"
                                                type="text"
                                                value={variant.variantSku}
                                                onChange={e => handleChangeVariant(idx, "variantSku", e.target.value)}
                                                />
                                                <button className="ml-auto mr-1 border border-slate-400 text-slate-400 py-1 px-2 rounded-lg hover:cursor-pointer hover:bg-[#A567C6] hover:border-[#A567C6] hover:text-white"
                                                    onClick={() => handleRemoveVariant(variant.id)}
                                                    type="button">
                                                    Delete Variant
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                    </AnimatePresence>
                                </div>
                                )))}
                            </div>
                        </div>
                    }

                    <div className="flex justify-end items-center mt-10">
                        <button
                            onClick={onBack}
                            className='mr-4 border-[#A567C6] rounded-lg px-3 py-1 bg-[#A567C6] hover:cursor-pointer hover:bg-purple-800'
                        >
                            Back
                        </button>
                        <button
                            onClick={handleSubmit}
                            /*Add a disbled check on variants
                            disabled={!price || !weight || !length || !width || !height } */
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


/* Old shipping methdod code with switch deprecated

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
*/