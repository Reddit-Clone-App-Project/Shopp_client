import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';
import SellerBlackHeader from '../../components/SellerBlackHeader';
// SVG
import AddImage from '../../assets/addImage.svg';
import AddVideo from '../../assets/addVideo.svg';
import Chat from '../../assets/chat.svg';
import Cart from '../../assets/HomePage/Header/shopping-cart.svg';
import CategoryInput from '../../components/CategoryInput';

const CreateProduct = () => {
    const [productImage, setProductImage] = useState<File[]>([]);
    const [promotionImage, setPromotionImage] = useState<File | null>(null);
    const [productVideo, setProductVideo] = useState<File | null>(null);
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [next, setNext] = useState(false); 

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
    const maxFiles = 9;

    const handleProductFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const selectedFilesCount = productImage?.length;
        const limitImage = selectedFilesCount + 1;
        
        if (limitImage > maxFiles) {
            toast.error(`You can only upload a maximum of ${maxFiles} images.`);

            if(productFilesInputRef.current) {
                productFilesInputRef.current.value = '';
            };

            setProductImage([...productImage]);
        } else {
            setProductImage([...productImage, ...Array.from(files)]);
        };
    };

    const handlePromotionFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPromotionImage(file);
        } else {
            setPromotionImage(null);
        }
    };

    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductVideo(file);
        } else {
            setProductVideo(null);
        }
    };

    const removeImage = (idToRemove: number) => {
        setProductImage(prevImages => prevImages.filter((_, id) => id !== idToRemove))
    };

    return (
    <>
        <SellerBlackHeader section={'Product Management > Add a Product'} />
        <div className='w-full min-h-screen flex gap-3 justify-between items-start text-white bg-gray-950 pt-20 px-6'>
            <div className='w-1/5 bg-slate-700 px-2.5 pt-2.5 pb-4 mt-4'>
                <h3 className='font-semibold mb-2.5'>Suggested information filling</h3>
                <ul className='space-y-2 text-sm'>
                    <li>✓ Add at least 3 images</li>
                    <li>✓ Add a product video</li>
                    <li>✓ Product name must be at least 25-100 characters long</li>
                    <li>✓ Add at least 100 characters in the product description</li>
                    <li>✓ Add brand</li>
                </ul>
            </div>

            <div className='w-3/5 mt-4'>
                <div className='flex bg-slate-700 h-12'>
                    <div className='flex-1 flex justify-start items-center'>
                        {next === false && 
                            <>
                                <p className='ml-5 text-[#A567C6]'>Basic information</p>
                                <div className='bg-[#A567C6] h-0.5 w-39 absolute self-end'></div>
                                <p className='ml-5'>Sales information</p>
                            </>
                        }
                        {next &&
                            <>
                                <p className='ml-5'>Basic information</p>
                                <p className='ml-5 text-[#A567C6]'>Sales information</p>
                                <div className='bg-[#A567C6] ml-39 h-0.5 w-36 absolute self-end'></div>
                            </>
                        } 
                    </div>
                </div>
                {/* Basic information */}
                <div className='bg-slate-700 px-4 py-4 mt-4'>
                    <h3 className='font-semibold text-lg mb-2.5'>Basic information</h3>
                    <div className='flex items-center'>
                        <p><span className='text-red-500'>*</span>Product Image (1x1 image)</p>
                        {productImage?.length !== 0 ? <button className='text-white border border-slate-600 rounded-lg px-2 bg-slate-600 ml-4 hover:cursor-pointer hover:bg-slate-400' onClick={() => setProductImage([])}>Remove All Images</button> : ''}
                    </div>
                    <div className='flex gap-4 mb-2'>
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
                        <div className='flex overflow-y-scroll py-4 px-2'>
                            {productImage.map((image, id) => 
                                <>
                                    <img key={id} src={URL.createObjectURL(image)} alt={`Image ${id + 1}`} className='w-48 h-48' />
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
                                            className="flex w-48 h-48 flex-col items-center justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
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
                                        />
                                    <img src={promotionImage ? URL.createObjectURL(promotionImage) : undefined} alt='promotion image' className='h-48 w-48 self-center ml-5' />
                                    <span className='self-start hover:cursor-pointer ml-1' onClick={() => setPromotionImage(null)}>X</span>
                                </>
                                :
                                <>
                                    <label
                                        htmlFor="promotion-image"
                                        className="flex w-48 h-48 flex-col items-center justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
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
                            <ul className='w-1/2 ml-6 text-sm text-slate-400 self-center'>
                                <li>Upload 1x1 image</li>
                                <li>Promotion photo will be displayed on Search Results, Today's Suggestions, etc. Using beautiful promotion photo will attract more visits to your products</li>
                            </ul>
                        </div>
                    </div>

                    <div className='mb-4'>
                        <p>Product's video</p>
                        <div className='flex mt-4 items-center'>
                            {productVideo ? 
                                <>    
                                    <label
                                        htmlFor="product-video"
                                        className="flex w-48 h-48 flex-col justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <img src={AddVideo} alt='Add Product' />
                                            <p className="mt-2 text-sm text-slate-400">
                                                <span className="font-semibold">Add video</span>
                                            </p>
                                            <p className='text-3xl text-slate-400'>+</p>
                                        </div>
                                    </label>
                                    <input 
                                        type="file" 
                                        accept="video/*" 
                                        id='product-video' 
                                        className='hidden'
                                        onChange={handleVideoFileChange}
                                    />
                                    <video src={URL.createObjectURL(productVideo)} controls className='h-48 w-48 ml-5'>
                                        Broswer doesn't support video format
                                    </video>
                                    <span className='self-start hover:cursor-pointer ml-1' onClick={() => setProductVideo(null)}>X</span>
                                </>
                                :
                                <>    
                                    <label
                                        htmlFor="product-video"
                                        className="flex w-48 h-48 flex-col justify-center aspect-square border-2 border-slate-400 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <img src={AddVideo} alt='Add Product' />
                                            <p className="mt-2 text-sm text-slate-400">
                                                <span className="font-semibold">Add video</span>
                                            </p>
                                            <p className='text-3xl text-slate-400'>+</p>
                                        </div>
                                    </label>
                                    <input 
                                        type="file" 
                                        accept="video/*" 
                                        id='product-video' 
                                        className='hidden'
                                        onChange={handleVideoFileChange}
                                    />
                                </>
                            }               
                            <ul className='w-1/2 text-sm ml-6 text-slate-400'>
                                <li>Maximum size 30Mb, resolution not exceeding 1280x1280px</li>
                                <li>Length: 10s-60s</li>
                                <li>Format: MP4</li>
                                <li>Note: the product may be displayed while the video is being processed. The video will be displayed automatically after successful processing</li>
                            </ul>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 mb-4'>
                        <label htmlFor='product-name'><span className='text-red-500'>*</span>Product Name</label>
                        <input className='border border-slate-400 focus:border-slate-200 focus:outline-none rounded-md p-2 text-slate-400' type="text" id='product-name' placeholder="Product's name + Brand name + Model + Specifications" value={productName} onChange={e => setProductName(e.target.value)}/>
                    </div>

                    <div className='flex flex-col gap-2 mb-2'>
                        <label htmlFor='category'><span className='text-red-500'>*</span>Category</label>
                        <CategoryInput 
                            options={categories}
                            placeholder='e.g., Electronics, Clothing, Home, Books, Toys'
                            onSelect={(value) => setCategory(value)}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='product-description'><span className='text-red-500'>*</span>Product Description</label>
                        <textarea className='border border-slate-400 p-2 rounded-md text-slate-400' id='product-description' placeholder='Product description' rows={5} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        <p className='text-slate-400 self-end'>{description.length}/3000</p>
                    </div>
                </div>
                {/* Sales information */}
                {/* Shipping information */}
                {/* Other information */}
            </div>

            <div className='w-1/5 bg-slate-700 px-2.5 py-2 mt-4'>
                <p className='font-semibold'>Preview</p>
                <img
                    src={promotionImage ? URL.createObjectURL(promotionImage) : undefined}
                    alt="Product Preview Image"
                    className='my-3 w-50 m-auto'
                />
                <h2 className='font-bold mb-3'>{productName}</h2>
                <div className='flex flex-wrap mb-2'>
                    {productImage.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Product Image ${index + 1}`}
                            className='w-7 h-7 object-cover m-1 ml-0'
                        />
                    ))}
                </div>
                
                <h6 className='font-medium mb-2'>Description</h6>
                <p className='font-extralight text-[0.75rem]'>{description}</p>
                
                <div className='flex h-12 my-4 mx-2'>
                    <button className='flex grow-1 items-center justify-center bg-blue-700'>
                        <img className='w-6' src={Chat} alt="Chat" />
                    </button>
                    <button className='flex grow-1 items-center justify-center bg-blue-700'>
                        <img className='w-6' src={Cart} alt="Cart" />
                    </button>
                    <button className='flex grow-2 items-center justify-center bg-purple-700'>
                        Buy Now
                    </button>
                </div>

                <p className='font-extralight text-[0.75rem]'>Images are for reference only and are not the final image the Buyer sees.</p>
            </div>
        </div>
    </>
  )
}

export default CreateProduct