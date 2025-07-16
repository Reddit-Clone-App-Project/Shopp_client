import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { Item, ItemImage, ItemVariant } from "../../types/Item";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { fetchBuyerAddress } from "../../features/BuyerAddress/BuyerAddressSlice";
import { fetchStore } from "../../features/StoreSlice/StoreSlice";
import { countTime } from "../../utility/countTime";
import Review from "../../features/Review/Review";
import StoreHotProduct from "../../features/StoreHotProduct/StoreHotProduct";
import StoreDiscount from "../../features/StoreDiscount/StoreDiscount";
import StoreProducts from "../../features/StoreProducts/StoreProducts";
import SuggestionOfTheDay from "../../features/SuggestionOfTheDay/SuggestionOfTheDay";

// SVG
import ChevronLeft from "../../assets/HomePage/Category/chevron-left.svg";
import ChevronRight from "../../assets/HomePage/Category/chevron-right.svg";
import Heart from "../../assets/Heart.svg";
import Share from "../../assets/Share.svg";
import Location from "../../assets/Product/Location.svg";
import DeliveryTruck from "../../assets/Product/LightDeliveryTruck.svg";
import DarkStar from "../../assets/Product/DarkStar.svg";
import LightStar from "../../assets/Product/LightStar.svg";
import DefaultAvatar from "../../assets/generic-avatar.svg";
import AddCart from "../../assets/Product/AddCartLight.svg";
import Chat from "../../assets/chat.svg";

const ProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector(
    (state: RootState) => state.suggestionOfTheDay
  );
  const { address, status: addressStatus } = useSelector(
    (state: RootState) => state.buyerAddress
  );
  const { store, status: storeStatus } = useSelector(
    (state: RootState) => state.storeProfile
  );

  const { user } = useSelector((state: RootState) => state.profile);

  const { id } = useParams<{ id: string }>();

  const product = products.find(
    (product: Item) => product.id.toString() === id
  );

  // This is the selected image for the product
  const [selectedImage, setSelectedImage] = useState<ItemImage | null>(
    product?.promotion_image || null
  );

  // This is the current image that is displayed in the product page while through selected or hovered
  const [currentImage, setCurrentImage] = useState<ItemImage | null>(
    product?.promotion_image || null
  );

  const [currentVariant, setCurrentVariant] = useState<ItemVariant | null>(
    product?.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState<number>(1);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Get all images in a single array for carousel navigation
  const getAllImages = (): ItemImage[] => {
    if (!product) return [];

    const allImages: ItemImage[] = [];

    if (product.promotion_image) {
      allImages.push(product.promotion_image);
    }

    if (product.product_images) {
      allImages.push(...product.product_images);
    }

    if (product.variants) {
      product.variants.forEach((variant: ItemVariant) => {
        if (variant.images) {
          allImages.push(...variant.images);
        }
      });
    }

    return allImages;
  };


  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false}); //This is used for mobile image carousel
  const [currentSlide, setCurrentSlide] = useState(0); //This is used for mobile image carousel
  const allImages = getAllImages();
  const imagesPerView = 3; // Number of thumbnails to show at once

  // Navigation functions for image carousel
  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev > 0
        ? prev - imagesPerView
        : Math.max(0, allImages.length - imagesPerView)
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev + imagesPerView < allImages.length ? prev + imagesPerView : 0
    );
  };

  const getVisibleImages = () => {
    return allImages.slice(
      currentImageIndex,
      currentImageIndex + imagesPerView
    );
  };

  // When choosing a variant, update the selected image and current variant
  const handleVariantChange = (variant: ItemVariant) => {
    setCurrentVariant(variant);
    if (variant.images && variant.images.length > 0) {
      setSelectedImage(variant.images[0]);
    } else {
      // If the variant has no images, fallback to the product's promotion image
      setSelectedImage(product.promotion_image || null);
    }
  };

  const increaseQuantity = () => {
    if (!currentVariant) return;
    setQuantity((prevQuantity) =>
      prevQuantity < currentVariant.stock_quantity
        ? prevQuantity + 1
        : currentVariant.stock_quantity
    );
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const countStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <img key={i} src={DarkStar} alt="Dark Star" className="w-2 h-2 md:w-4 md:h-4" />
        );
      } else {
        stars.push(
          <img key={i} src={LightStar} alt="Light Star" className="w-2 h-2 md:w-4 md:h-4" />
        );
      }
    }
    return stars;
  };

  // Early return if product is not found
  useEffect(() => {
    if (!product) {
      // If product not found, redirect to home page
      navigate("/");
    } else {
      // Initialize states when product is available
      if (product.promotion_image && !selectedImage) {
        setSelectedImage(product.promotion_image);
        setCurrentImage(product.promotion_image);
      }
      if (product.variants?.[0] && !currentVariant) {
        setCurrentVariant(product.variants[0]);
      }
    }
  }, [product, navigate, selectedImage, currentVariant]);

  useEffect(() => {
    if (!product) {
      // If product not found, redirect to home page
      navigate("/");
    }
  }, []);

  // Update the current image when the selected image changes
  useEffect(() => {
    if (selectedImage) {
      setCurrentImage(selectedImage);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (addressStatus === "idle" || !address) {
      // Fetch the buyer address when the component mounts
      const promise = dispatch(fetchBuyerAddress());

      return () => {
        promise.abort();
      };
    }
  }, []);

  useEffect(() => {
  if (product?.store?.id) {
    const promise = dispatch(fetchStore(product.store.id));
    return () => {
      promise.abort();
    };
  }
}, [dispatch, product?.store?.id]);

  // Return null or loading state if product is not found
  if (!product) {
    return null; // Component will unmount and navigate will redirect
  }

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect(); // Lấy slide index ban đầu
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="bg-gray-100">
      <header>
        <BuyerHeader />
      </header>

      {/* Mobile product bottom panel */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center h-16">
        <button className="flex-2 h-full py-2 flex flex-col justify-center items-center text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600">
          <img src={AddCart} alt="Add to Cart" className="inline-block mr-1 w-4" />
          <p>Add to Cart</p>
        </button>
        <button className="flex-2 h-full py-2 flex flex-col justify-center items-center text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600">
          <img src={Chat} alt="Chat" className="inline-block mr-1 w-4" />
          <p>Chat Now</p>
        </button>
        <button className="flex-3 h-full py-2 text-center text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700">
          Buy Now
        </button>
      </div>

      <nav className="hidden md:block ml-16 pt-[124px] text-lg">
        <Link to="/">Shopp</Link>
        {product.category_hierarchy?.map(
          (category: { id: number; name: string; slug: string }) => (
            <>
              {" "}
              / <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </>
          )
        )}
      </nav>
      <main className="pt-10 md:pt-0 md:mx-8 my-4">
        <div className="w-full flex flex-col md:flex-row">
          {/* Product and Variants */}
          <div className="w-full md:w-2/3 flex flex-col md:flex-row bg-white pb-4">
            {/* Carousel cho Mobile */}
            <div className="md:hidden relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {allImages.map((image, index) => (
                    <div className="flex-[0_0_100%] min-w-0" key={index}>
                      <img
                        src={image.url}
                        alt={image.alt_text || `Product Image ${index + 1}`}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
      
              {allImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-xs px-2.5 py-1 rounded-full">
                  {currentSlide + 1} / {allImages.length}
                </div>
              )}
            </div>
            
            {product.variants.length > 1 && (
              <div className="md:hidden pl-2 py-2">
                <p className="text-sm font-semibold">{product.variants.length} variants available</p>
                <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                  {product.variants.map((variant: ItemVariant) => {
                    if (!variant.images || variant.images.length === 0)
                      return null;

                    const variantImage = variant.images[0];
                    const imageIndex = allImages.findIndex(
                      (img) => img.id === variantImage.id
                    );
                    const isSelected = currentSlide === imageIndex;

                    return (
                      <img
                        src={variantImage.url}
                        alt={variant.variant_name}
                        key={variant.id}
                        onClick={() => {
                          if (emblaApi && imageIndex !== -1) {
                            emblaApi.scrollTo(imageIndex);
                          }
                        }}
                        className={`w-12 h-12 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-2 border-purple-500 ring-2 ring-purple-200"
                            : "border border-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Images for desktop */}
            <div className="hidden md:block">
              <img
                src={currentImage?.url || product.promotion_image?.url || ""}
                alt={currentImage?.alt_text ?? "Product Image"}
                className="w-full md:w-100 md:h-100"
              />
              <div className="hidden md:block mt-6 px-4">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 shadow-sm">
                  {/* Previous Button */}
                  <button
                    className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md transition-all duration-200 ${
                      currentImageIndex > 0
                        ? "hover:shadow-lg hover:bg-gray-50 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={goToPrevious}
                    disabled={currentImageIndex === 0}
                  >
                    <img src={ChevronLeft} alt="Previous" className="w-5 h-5" />
                  </button>

                  {/* Image Thumbnails Container */}
                  <div className="flex items-center gap-3 w-66">
                    <div className="flex items-center gap-3 transition-transform duration-300 ease-in-out">
                      {getVisibleImages().map(
                        (image: ItemImage, index: number) => {
                          const isSelected = selectedImage?.id === image.id;
                          return (
                            <div
                              key={`thumb-${image.id || index}`}
                              className="flex-shrink-0"
                            >
                              <img
                                src={image.url}
                                alt={image.alt_text || "Product Image"}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                                  isSelected
                                    ? "border-purple-500 shadow-lg transform scale-105"
                                    : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                                }`}
                                onClick={() => setSelectedImage(image)}
                                onMouseEnter={() => setCurrentImage(image)}
                                onMouseLeave={() =>
                                  setCurrentImage(selectedImage)
                                }
                              />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Next Button */}
                  <button
                    className={`flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md transition-all duration-200 ${
                      currentImageIndex + imagesPerView < allImages.length
                        ? "hover:shadow-lg hover:bg-gray-50 cursor-pointer"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={goToNext}
                    disabled={
                      currentImageIndex + imagesPerView >= allImages.length
                    }
                  >
                    <img src={ChevronRight} alt="Next" className="w-5 h-5" />
                  </button>
                </div>

                {/* Carousel Indicators */}
                {allImages.length > imagesPerView && (
                  <div className="flex justify-center mt-3 gap-2">
                    {Array.from({
                      length: Math.ceil(allImages.length / imagesPerView),
                    }).map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          Math.floor(currentImageIndex / imagesPerView) ===
                          index
                            ? "bg-purple-500"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        onClick={() =>
                          setCurrentImageIndex(index * imagesPerView)
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Other info */}
            <div className="pt-4 px-1 md:px-0">
              <h1 className="text-md">{product.name}</h1>
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      {countStars(product.average_rating)}
                    </div>{" "}
                    <span className="text-blue-500">
                      {product.average_rating ?? 0}
                    </span>
                  </div>
                  <p>|</p>
                  <p>
                    <span className="text-blue-500">
                      {product.total_reviews ?? 0}
                    </span>{" "}
                    Rating
                  </p>
                  <p>|</p>
                  <p>{product.bought} Sold</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={Heart} alt="Favorite" className="cursor-pointer" />
                  <img src={Share} alt="Share" className="cursor-pointer" />
                </div>
              </div>
              <p className="text-2xl mt-4 font-bold">
                ${currentVariant?.price || 0}
              </p>
              <p className="mt-4 hidden md:inline">
                Remain: {currentVariant?.stock_quantity || 0}
              </p>
              {product.variants.length > 1 && (
                <div className="hidden md:flex gap-4 mt-2">
                  <div className="flex">
                    <p>Variants</p>
                  </div>
                  <div>
                    <p className="text-blue-500">
                      {currentVariant?.variant_name || "No variant selected"}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {product.variants.map((variant: ItemVariant) => (
                        <div
                          onClick={() => handleVariantChange(variant)}
                          key={variant.id}
                          className="px-3 py-2 bg-purple-100 cursor-pointer hover:bg-purple-200"
                        >
                          {variant.variant_name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="hidden md:flex gap-4 mt-4">
                <p>Quantity</p>
                <div className="flex items-center gap-4">
                  <div
                    onClick={decreaseQuantity}
                    className="cursor-pointer font-bold text-xl bg-gray-200 px-3 py-0.5"
                  >
                    -
                  </div>
                  <div>{quantity}</div>
                  <div
                    onClick={increaseQuantity}
                    className="cursor-pointer font-bold text-xl bg-gray-200 px-3 py-0.5"
                  >
                    +
                  </div>
                </div>
              </div>
              <div className="hidden md:flex gap-4 mt-4">
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">
                  Buy Now
                </button>
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Shop Information */}
          <div className="w-full md:w-1/3 bg-blue-100 px-4 py-4">
            <h3 className="text-lg text-gray-600">Delivery Options</h3>

            {/* Location */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2 w-2/3">
                <img src={Location} alt="Location" />
                {!address && !user && (
                  <p className="font-semibold">
                    Please login to see delivery options.
                  </p>
                )}
                {!address && user && (
                  <p className="font-semibold">
                    Your address might not be set up, or the address is fetching
                  </p>
                )}
                {address && (
                  <p className="font-semibold">
                    {address.address_line_1}, {address.city}, {address.state},{" "}
                    {address.postal_code}
                  </p>
                )}
              </div>
              <div>
                {!address && !user && (
                  <Link to="/login" className="text-purple-600 hover:underline">
                    Login
                  </Link>
                )}
                {!address && user && (
                  <Link
                    to="/buyer/address"
                    className="text-purple-600 hover:underline"
                  >
                    Update
                  </Link>
                )}
                {address && (
                  <Link
                    to="/buyer/address"
                    className="text-purple-600 hover:underline"
                  >
                    Change
                  </Link>
                )}
              </div>
            </div>

            {/* ! Ship date: This function should be done later */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <img src={DeliveryTruck} alt="Delivery Truck" />
                <p className="font-semibold">Ships in 1-2 business days</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-4 w-1/2">
                {store?.profile_img ? (
                  <img src={store.profile_img} alt="Store Profile" />
                ) : (
                  <img src={DefaultAvatar} alt="Default Avatar" />
                )}
                {store?.name ? (
                  <p className="font-semibold">{store.name}</p>
                ) : (
                  <p className="font-semibold">Loading...</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button className="hidden md:block bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 text-sm rounded cursor-pointer">
                  Chat Now
                </button>
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 text-sm rounded cursor-pointer">
                  View Store
                </button>
              </div>
            </div>

            <div className="flex md:grid md:grid-cols-2 gap-2 md:gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <p>Ratings</p>
                <p className="text-blue-500">{store?.total_reviews ?? 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>Average Rating</p>
                <p className="text-blue-500">{store?.average_rating ?? 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>Join</p>
                <p className="text-blue-500">
                  {store?.created_at ? countTime(store.created_at) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------------Product Details----------------------------------------------------------------- */}

        <div className="flex flex-col-reverse md:flex-row gap-6 mt-6 md:mt-20">
          <div>
            {/* Description */}
            <div className="px-4 py-6 bg-white mb-12">
              <div className="bg-blue-100 px-4 py-2 mb-4">
                <h2 className="text-lg">Product Detail</h2>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p>Category</p>
                <nav className="">
                  <Link to="/" className="text-blue-500">
                    Shopp
                  </Link>
                  {product.category_hierarchy?.map(
                    (category: { id: number; name: string; slug: string }) => (
                      <>
                        {" "}
                        /{" "}
                        <Link
                          to={`/category/${category.slug}`}
                          className="text-blue-500"
                        >
                          {category.name}
                        </Link>
                      </>
                    )
                  )}
                </nav>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p>Total Amounts</p>
                <p className="">
                  {product.variants.reduce(
                    (total: number, variant: ItemVariant) =>
                      total + variant.stock_quantity,
                    0
                  )}
                </p>
              </div>

              <div className="bg-blue-100 px-4 py-2 mt-16 mb-4">
                <h2 className="text-lg">Description</h2>
              </div>
              <p>{product.description}</p>
            </div>

            {/* Rating */}
            <Review
              total_reviews={product.total_reviews}
              average_rating={product.average_rating}
              countStars={countStars}
              stars_5={product.stars_5}
              stars_4={product.stars_4}
              stars_3={product.stars_3}
              stars_2={product.stars_2}
              stars_1={product.stars_1}
              have_comment={product.have_comment}
              have_image={product.have_image}
            />
          </div>

          <div>
            <StoreDiscount store_id={product.store.id} />
            <StoreHotProduct store_id={product.store.id} />
          </div>
        </div>

        <StoreProducts store_id={product.store.id} />
        <SuggestionOfTheDay />
      </main>

      <footer>
        <Footer />
      </footer>
      <div className="md:hidden w-full h-10"></div>
    </div>
  );
};

export default ProductPage;