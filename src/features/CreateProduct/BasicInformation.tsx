import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import SellerBlackHeader from '../../components/SellerBlackHeader';
import AddImage from '../../assets/addImage.svg';
import CategoryInput from '../../components/CategoryInput';
import { ProductDataType } from '../../pages/seller/CreateProduct';

type BasicInfoProps = {
    data: ProductDataType;
    onChange: (updater: (prev: ProductDataType) => ProductDataType) => void;
    onNext: () => void;
};

const BasicInformation: React.FC<BasicInfoProps> = ({ data, onChange, onNext }) => {
    const { 
        name,
        category,
        description,
        productImage, 
        promotionImage,
    } = data;

    // ! Mock category, change in the future
    const categories = [
        'Electronics',
        'Clothing',
        'Home',
        'Books',
        'Toys',
    ]

    // handle amount of allowance images in product images
    const productFilesInputRef = useRef<HTMLInputElement | null>(null);
    const promotionFileInputRef = useRef<HTMLInputElement | null>(null);
    const maxFiles = 9;

    const handleProductFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const selectedFilesCount = data.productImage.length;
        const limitImage = selectedFilesCount + 1;
        
        if (limitImage > maxFiles) {
            toast.error(`You can only upload a maximum of ${maxFiles} images.`);

            if(productFilesInputRef.current) {
                productFilesInputRef.current.value = '';
            };
        } else {
            onChange(prev  => ({
                ...prev,
                productImage: [...prev.productImage, ...Array.from(files)],
            }));
        };
    };

    const removeImage = (idToRemove: number) => {
        onChange(prev => ({
            ...prev,
            productImage: prev.productImage.filter((_, id) => id !== idToRemove),
        }));
    };

    const handlePromotionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange(prev => ({...prev, promotionImage: file}));
        };
    };

    const removePromotionImage = () => {
        onChange(prev => ({...prev, promotionImage: ''}));

        if (promotionFileInputRef.current) {
            promotionFileInputRef.current.value = '';
        };
    };


    return (
    <div>
        <div className='mt-4'>
            <div className='flex bg-slate-700 h-12'>
                <div className='flex-1 flex justify-start items-center'>
                    <p className='ml-5 text-[#A567C6]'>Basic information</p>
                    <div className='bg-[#A567C6] h-0.5 w-39 absolute self-end'></div>
                    <p className='ml-5'>Sales information</p>
                </div>
            </div>
            <div className='bg-slate-700 px-4 py-4 mt-4'>
                <h3 className='font-semibold text-lg mb-2.5'>Basic information</h3>
                <div className='flex items-center'>
                    <p><span className='text-red-500'>*</span>Product Image (1x1 image)</p>
                    {productImage?.length !== 0 && <button className='text-white border border-slate-600 rounded-lg px-2 bg-slate-600 ml-4 hover:cursor-pointer hover:bg-slate-400' onClick={() => onChange(prev => ({...prev, productImage: []}))}>Remove All Images</button>}
                </div>
                <div className='flex gap-4 mb-4'>
                    <label
                        htmlFor="product-image"
                        className="flex w-48 h-48 mt-5 flex-col items-center justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <img src={AddImage} alt='Add Product' />
                            <p className="mt-2 text-sm text-slate-400">
                                <span className="font-semibold">Add image</span> ({productImage.length}/{maxFiles})
                            </p>
                            <p className='text-3xl text-slate-400'>+</p>
                        </div>
                    </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        id='product-image' 
                        className='hidden'
                        multiple
                        onChange={handleProductFilesChange}
                        ref={productFilesInputRef}
                    />
                    <div className='flex overflow-y-scroll pt-4 px-2'>
                        {productImage.map((image, id) => 
                            <>
                                <img
                                    key={id}
                                    src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                    alt={`Image ${id + 1}`}
                                    className='w-48 h-48'
                                />
                                <span className='self-start hover:cursor-pointer ml-1 mr-6' onClick={() => removeImage(id)}>X</span>
                            </>
                        )}
                    </div>
                </div>

                <div className='mb-4'>
                    <p><span className='text-red-500'>*</span>Promotion Image (1x1 image)</p>
                    <div className='flex mt-4'>
                        {promotionImage ? 
                            <>
                                <label
                                    htmlFor="promotion-image"
                                    className="flex w-48 h-48 mr-5 flex-col items-center justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                                >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <img src={AddImage} alt='Add Product' />
                                    <p className="mt-2 text-sm text-slate-400">
                                        <span className="font-semibold">Change image (1/1)</span>
                                    </p>
                                    <p className='text-3xl text-slate-400'>+</p>
                                </div>
                                </label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id='promotion-image' 
                                    className='hidden' 
                                    onChange={handlePromotionFileChange}
                                    ref={promotionFileInputRef}   
                                />
                                <img src={promotionImage ? (typeof promotionImage === 'string' ? promotionImage : URL.createObjectURL(promotionImage)) : undefined} alt='promotion image' className='h-48 w-48 self-center' />
                                <span className='self-start hover:cursor-pointer ml-1' onClick={removePromotionImage}>X</span>
                            </>
                            :
                            <>
                                <label
                                    htmlFor="promotion-image"
                                    className="flex w-48 h-48 mr-5 flex-col items-center justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <img src={AddImage} alt='Add Product' />
                                        <p className="mt-2 text-sm text-slate-400">
                                            <span className="font-semibold">Add image</span>
                                        </p>
                                        <p className='text-3xl text-slate-400'>+</p>
                                    </div>
                                </label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    id='promotion-image' 
                                    className='hidden' 
                                    onChange={handlePromotionFileChange}   
                                />
                            </>
                        }
                        <ul className='w-1/3 ml-6 text-sm text-slate-400 self-center'>
                            <li>Upload 1x1 image</li>
                            <li>Promotion photo will be displayed on Search Results, Today's Suggestions, etc. Using beautiful promotion photo will attract more visits to your products</li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-4 mb-4'>
                    <label htmlFor='product-name'><span className='text-red-500'>*</span>Product Name</label>
                    <input className='border border-slate-400 focus:border-slate-200 focus:outline-none rounded-md p-2 text-slate-400' type="text" id='product-name' placeholder="Product's name + Brand name + Model + Specifications" value={name} onChange={e => onChange(prev => ({...prev, name: e.target.value}))}/>
                </div>

                <div className='flex flex-col gap-2 mb-2'>
                    <label htmlFor='category'><span className='text-red-500'>*</span>Category</label>
                    <CategoryInput 
                        options={categories}
                        placeholder='e.g., Electronics, Clothing, Home, Books, Toys'
                        onSelect={(value) => onChange(prev => ({...prev, category: value}))}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor='product-description'><span className='text-red-500'>*</span>Product Description</label>
                    <textarea className='border border-slate-400 p-2 rounded-md text-slate-400' id='product-description' placeholder='Product description' rows={5} value={description} onChange={e => onChange(prev => ({...prev, description: e.target.value}))}></textarea>
                    <p className='text-slate-400 self-start ml-1'>{description.length}/3000</p>
                </div>
                <button
                    onClick={onNext}
                    className='flex ml-auto mt-5 border-[#A567C6] rounded-lg px-3 py-1 bg-[#A567C6] hover:cursor-pointer hover:bg-purple-800'
                >
                    Next
                </button>
            </div>
        </div>
    </div>
  );
};

export default BasicInformation;