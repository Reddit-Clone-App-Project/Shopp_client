import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import useEmblaCarousel from "embla-carousel-react";
import { ItemImage, ItemVariant } from "../../types/Item";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { fetchBuyerAddress } from "../../features/BuyerAddress/BuyerAddressSlice";
import { fetchStore } from "../../features/StoreSlice/StoreSlice";
import { countTime } from "../../utility/countTime";
import {
  fetchProductById,
  clearProduct,
} from "../../features/ProductDetail/ProductDetailSlice";
import { addToCart } from "../../features/Cart/CartSlice";
import { postProductToWishlist } from "../../features/Wishlist/WishlistDetailSlice";
import { fetchWishlists } from "../../features/Wishlist/WishlistSlice";
import Review from "../../features/Review/Review";
import StoreHotProduct from "../../features/StoreHotProduct/StoreHotProduct";
import StoreDiscount from "../../features/StoreDiscount/StoreDiscount";
import StoreProducts from "../../features/StoreProducts/StoreProducts";
import SuggestionOfTheDay from "../../features/SuggestionOfTheDay/SuggestionOfTheDay";
import { singleItemCheckout } from "../../api";
import { loadStripe } from "@stripe/stripe-js";
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

interface Wishlist {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const ProductPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const product = useSelector(
    (state: RootState) => state.productDetail.product
  );

  const { addresses, status: addressStatus } = useSelector(
    (state: RootState) => state.buyerAddress
  );

  const address = addresses?.find((address) => address.is_default) || null;

  const { store } = useSelector((state: RootState) => state.storeProfile);

  const { user } = useSelector((state: RootState) => state.profile);

  const { id } = useParams<{ id: string }>();

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

  // Mobile variant selection modal state
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"addToCart" | "buyNow">(
    "addToCart"
  );

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Wishlist modal state
  const [showWishlistModal, setShowWishlistModal] = useState(false);

  // Get wishlist data
  const { wishlists } = useSelector((state: RootState) => state.wishlist);

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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }); //This is used for mobile image carousel
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
      setSelectedImage(product?.promotion_image || null);
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
          <img
            key={i}
            src={DarkStar}
            alt="Dark Star"
            className="w-2 h-2 md:w-4 md:h-4"
          />
        );
      } else {
        stars.push(
          <img
            key={i}
            src={LightStar}
            alt="Light Star"
            className="w-2 h-2 md:w-4 md:h-4"
          />
        );
      }
    }
    return stars;
  };

  const handleProtectedAction = (action: () => void) => {
    if (user) {
      action();
    } else {
      toast.info("Please log in to continue.");
      navigate("/login", { state: { from: location } });
    }
  };

  const handleAddToCart = async () => {
    if (!currentVariant) return;

    const productVariantId = currentVariant.id;
    const priceAtPurchase = currentVariant.price * quantity;

    try {
      dispatch(
        addToCart({
          productVariantId,
          quantity,
          priceAtPurchase,
        })
      );
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!address || !address.id) {
        toast.error("Please select or add a delivery address");
        return;
      }

      if (!product || !currentVariant) {
        toast.error("Product or variant not found");
        return;
      }

      if (!store) {
        toast.error("Store not found");
        return;
      }

      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
      );

      const session = await singleItemCheckout(
        {
          product_name: product?.name || "",
          image_url: currentVariant?.images?.[0]?.url || "",
          price_at_purchase: currentVariant?.price || 0,
          product_variant_id: currentVariant?.id || 0,
          quantity: quantity,
          express_shipping: store.express_shipping,
          fast_shipping: store.fast_shipping,
          economical_shipping: store.economical_shipping,
          bulky_shipping: store.bulky_shipping,
          store_id: store.id || 0,
        },
        address.id
      );

      const result = await stripe?.redirectToCheckout({
        sessionId: session.data.id,
      });

      if (result?.error) {
        toast.error(result.error.message || "Payment failed");
      }
    } catch (error: any) {
      console.error("Error during payment:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Payment failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Handle mobile modal actions
  const handleMobileAddToCart = () => {
    if (product?.variants && product.variants.length > 1) {
      setModalAction("addToCart");
      setIsMobileModalOpen(true);
    } else {
      handleProtectedAction(handleAddToCart);
    }
  };

  const handleMobileBuyNow = () => {
    if (product?.variants && product.variants.length > 1) {
      setModalAction("buyNow");
      setIsMobileModalOpen(true);
    } else {
      // Proceed with buy now logic
      handleProtectedAction(handleBuyNow);
    }
  };

  const handleModalConfirm = () => {
    if (modalAction === "addToCart") {
      handleProtectedAction(handleAddToCart);
    } else {
      // Handle buy now logic
      handleProtectedAction(handleBuyNow);
    }
    setIsMobileModalOpen(false);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please login to add products to wishlist");
      navigate("/login");
      return;
    }

    // Fetch wishlists and show modal
    dispatch(fetchWishlists());
    setShowWishlistModal(true);
  };

  const handleWishlistSelect = (wishlistId: number) => {
    if (!product) return;

    dispatch(
      postProductToWishlist({
        wishlistId,
        productId: product.id,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to wishlist!");
        setShowWishlistModal(false);
      })
      .catch((error) => {
        toast.error(error || "Failed to add product to wishlist");
      });
  };

  // Early return if product is not found
  useEffect(() => {
    if (!product) {
      // If product not found, redirect to home page
      // navigate("/");
    } else {
      // Initialize states when product is available - reset for new product
      if (product.promotion_image) {
        setSelectedImage(product.promotion_image);
        setCurrentImage(product.promotion_image);
      }
      if (product.variants?.[0]) {
        setCurrentVariant(product.variants[0]);
      }
      // Reset image carousel index for new product
      setCurrentImageIndex(0);
    }
  }, [product, navigate]);

  useEffect(() => {
    if (!product) {
      // If product not found, redirect to home page
      // navigate("/");
    }
  }, []);

  // Clear previous product and fetch new product by ID
  useEffect(() => {
    if (id) {
      // Clear the previous product first
      dispatch(clearProduct());

      // Then fetch the new product (convert string id to number)
      const productId = parseInt(id, 10);
      if (!isNaN(productId)) {
        const promise = dispatch(fetchProductById(productId));

        return () => {
          promise.abort();
        };
      }
    }
  }, [dispatch, id]);

  // Scroll to top when component mounts or product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

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

  // Skeleton Loading Component
  const ProductSkeleton = () => (
    <div className="bg-gray-100 animate-pulse">
      <header>
        <BuyerHeader />
      </header>

      {/* Mobile product bottom panel skeleton */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center h-16 bg-gray-300">
        <div className="flex-2 h-full bg-gray-400"></div>
        <div className="flex-2 h-full bg-gray-400"></div>
        <div className="flex-3 h-full bg-gray-500"></div>
      </div>

      {/* Navigation skeleton */}
      <nav className="hidden md:block ml-16 pt-[124px] text-lg">
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 h-6 w-12 rounded"></div>
          <div className="bg-gray-300 h-6 w-1 rounded"></div>
          <div className="bg-gray-300 h-6 w-20 rounded"></div>
          <div className="bg-gray-300 h-6 w-1 rounded"></div>
          <div className="bg-gray-300 h-6 w-24 rounded"></div>
        </div>
      </nav>

      <main className="pt-10 md:pt-0 md:mx-8 my-4">
        <div className="w-full flex flex-col md:flex-row">
          {/* Product skeleton */}
          <div className="w-full md:w-2/3 flex flex-col md:flex-row bg-white pb-4">
            {/* Mobile image skeleton */}
            <div className="md:hidden relative">
              <div className="w-full aspect-square bg-gray-300"></div>
            </div>

            {/* Desktop image skeleton */}
            <div className="hidden md:block w-full md:w-1/2">
              <div className="w-full h-96 bg-gray-300 rounded"></div>
              <div className="mt-6 px-4">
                <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                    <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                  </div>
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Product info skeleton */}
            <div className="pt-4 px-4 md:px-4 w-full md:w-1/2">
              <div className="bg-gray-300 h-6 w-3/4 rounded mb-4"></div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 bg-gray-300 rounded"
                      ></div>
                    ))}
                  </div>
                  <div className="bg-gray-300 h-4 w-8 rounded"></div>
                  <div className="bg-gray-300 h-4 w-1 rounded"></div>
                  <div className="bg-gray-300 h-4 w-16 rounded"></div>
                  <div className="bg-gray-300 h-4 w-1 rounded"></div>
                  <div className="bg-gray-300 h-4 w-12 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>

              <div className="bg-gray-300 h-8 w-24 rounded mt-4"></div>
              <div className="bg-gray-300 h-4 w-32 rounded mt-4 hidden md:block"></div>

              {/* Variants skeleton */}
              <div className="hidden md:flex gap-4 mt-4">
                <div className="bg-gray-300 h-4 w-16 rounded"></div>
                <div>
                  <div className="bg-gray-300 h-4 w-24 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="bg-gray-300 h-8 w-16 rounded"></div>
                    <div className="bg-gray-300 h-8 w-16 rounded"></div>
                    <div className="bg-gray-300 h-8 w-16 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Quantity skeleton */}
              <div className="hidden md:flex gap-4 mt-4 items-center">
                <div className="bg-gray-300 h-4 w-16 rounded"></div>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-300 h-8 w-8 rounded"></div>
                  <div className="bg-gray-300 h-4 w-4 rounded"></div>
                  <div className="bg-gray-300 h-8 w-8 rounded"></div>
                </div>
              </div>

              {/* Buttons skeleton */}
              <div className="hidden md:flex gap-4 mt-4">
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
                <div className="bg-gray-300 h-10 w-28 rounded"></div>
              </div>
            </div>
          </div>

          {/* Shop Information skeleton */}
          <div className="w-full md:w-1/3 bg-blue-100 px-4 py-4">
            <div className="bg-gray-300 h-6 w-32 rounded mb-4"></div>

            {/* Location skeleton */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2 w-2/3">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="bg-gray-300 h-4 w-48 rounded"></div>
              </div>
              <div className="bg-gray-300 h-4 w-16 rounded"></div>
            </div>

            {/* Delivery skeleton */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="bg-gray-300 h-4 w-40 rounded"></div>
              </div>
            </div>

            {/* Store info skeleton */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-4 w-1/2">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="bg-gray-300 h-4 w-24 rounded"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-300 h-6 w-16 rounded"></div>
                <div className="bg-gray-300 h-6 w-20 rounded"></div>
              </div>
            </div>

            {/* Store stats skeleton */}
            <div className="flex md:grid md:grid-cols-2 gap-2 md:gap-4 mt-4">
              <div className="bg-gray-300 h-4 w-16 rounded"></div>
              <div className="bg-gray-300 h-4 w-20 rounded"></div>
              <div className="bg-gray-300 h-4 w-12 rounded"></div>
            </div>
          </div>
        </div>

        {/* Product Details skeleton */}
        <div className="flex flex-col-reverse md:flex-row gap-6 mt-6 md:mt-20">
          <div className="flex-1">
            {/* Description skeleton */}
            <div className="px-4 py-6 bg-white mb-12">
              <div className="bg-blue-100 px-4 py-2 mb-4">
                <div className="bg-gray-300 h-6 w-32 rounded"></div>
              </div>

              <div className="space-y-4 mb-4">
                <div className="flex justify-between">
                  <div className="bg-gray-300 h-4 w-16 rounded"></div>
                  <div className="bg-gray-300 h-4 w-48 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="bg-gray-300 h-4 w-24 rounded"></div>
                  <div className="bg-gray-300 h-4 w-12 rounded"></div>
                </div>
              </div>

              <div className="bg-blue-100 px-4 py-2 mt-16 mb-4">
                <div className="bg-gray-300 h-6 w-24 rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-full rounded"></div>
                <div className="bg-gray-300 h-4 w-3/4 rounded"></div>
              </div>
            </div>

            {/* Review skeleton */}
            <div className="bg-white p-4 rounded">
              <div className="bg-gray-300 h-6 w-32 rounded mb-4"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-300 h-16 w-full rounded"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            {/* Store sections skeleton */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded">
                <div className="bg-gray-300 h-6 w-32 rounded mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-300 h-20 w-full rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store products skeleton */}
        <div className="mt-6">
          <div className="bg-white p-4 rounded">
            <div className="bg-gray-300 h-6 w-40 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-48 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestion skeleton */}
        <div className="mt-6">
          <div className="bg-white p-4 rounded">
            <div className="bg-gray-300 h-6 w-48 rounded mb-4"></div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-32 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
      <div className="md:hidden w-full h-10"></div>
    </div>
  );

  // Return skeleton or loading state if product is not found
  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <div className="bg-gray-100">
      <header>
        <BuyerHeader />
      </header>

      {/* Mobile product bottom panel */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center h-16">
        <button
          onClick={handleMobileAddToCart}
          className="flex-2 h-full py-2 flex flex-col justify-center items-center text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600"
        >
          <img
            src={AddCart}
            alt="Add to Cart"
            className="inline-block mr-1 w-4"
          />
          <p>Add to Cart</p>
        </button>
        <button className="flex-2 h-full py-2 flex flex-col justify-center items-center text-sm font-semibold text-white bg-purple-500 hover:bg-purple-600">
          <img src={Chat} alt="Chat" className="inline-block mr-1 w-4" />
          <p>Chat Now</p>
        </button>
        <button
          onClick={handleMobileBuyNow}
          className="flex-3 h-full py-2 text-center text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700"
        >
          Buy Now
        </button>
      </div>

      <nav className="hidden md:block ml-16 pt-[124px] text-lg">
        {product ? (
          <>
            <Link to="/">Shopp</Link>
            {product.category_hierarchy?.map(
              (category: {
                id: number | null;
                name: string | null;
                slug: string | null;
              }) => (
                <>
                  {" "}
                  /{" "}
                  <Link to={`/category/${category.slug}`}>{category.name}</Link>
                </>
              )
            )}
          </>
        ) : (
          <div className="bg-[#d9d9d9] h-5 w-16 rounded-lg"></div>
        )}
      </nav>
      <main className="pt-10 md:pt-0 md:mx-8 my-4">
        <div className="w-full flex flex-col md:flex-row">
          {/* Product and Variants */}
          <div className="w-full md:w-2/3 flex flex-col md:flex-row bg-white pb-4">
            {/* Carousel cho Mobile */}
            <div className="md:hidden relative">
              {allImages.length > 0 ? (
                <>
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
                </>
              ) : (
                <div className="bg-[#d9d9d9]"></div>
              )}
            </div>

            {product.variants ? (
              product.variants.length > 1 ? (
                <div className="md:hidden pl-2 py-2">
                  <p className="text-sm font-semibold">
                    {product.variants.length} variants available
                  </p>
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
              ) : (
                <></>
              )
            ) : (
              <div className="flex items-center justify-center">
                <div className="bg-[#d9d9d9] w-5 h-5"></div>
                <div className="bg-[#d9d9d9] w-5 h-5"></div>
                <div className="bg-[#d9d9d9] w-5 h-5"></div>
                <div className="bg-[#d9d9d9] w-5 h-5"></div>
                <div className="bg-[#d9d9d9] w-5 h-5"></div>
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
                      {product.average_rating
                        ? countStars(Number(product.average_rating))
                        : countStars(0)}
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
                  <img
                    src={Heart}
                    alt="Favorite"
                    className="cursor-pointer"
                    onClick={handleAddToWishlist}
                  />
                  <img src={Share} alt="Share" className="cursor-pointer" />
                </div>
              </div>
              <p className="text-2xl mt-4 font-bold">
                ${currentVariant?.price || 0}
              </p>
              <p className="mt-4 hidden md:inline">
                Remain: {currentVariant?.stock_quantity || 0}
              </p>
              {product.variants && product.variants.length > 1 && (
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
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => handleProtectedAction(handleBuyNow)}
                >
                  Buy Now
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => handleProtectedAction(handleAddToCart)}
                >
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
                    {address.address_line1}, {address.address_line2},{" "}
                    {address.city}, {address.province}, {address.postal_code}
                  </p>
                )}
              </div>
              <div>
                {!address && !user && (
                  <p
                    onClick={() => handleProtectedAction(() => {})}
                    className="text-purple-600 hover:underline cursor-pointer"
                  >
                    Login
                  </p>
                )}
                {!address && user && (
                  <Link
                    to="/me/my-account/address"
                    className="text-purple-600 hover:underline"
                  >
                    Update
                  </Link>
                )}
                {address && (
                  <Link
                    to="/me/my-account/address"
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
                  <img
                    src={store.profile_img}
                    alt="Store Profile"
                    className="h-10 w-10 object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={DefaultAvatar}
                    alt="Default Avatar"
                    className="h-10 w-10 object-cover rounded-full"
                  />
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
                    (category: {
                      id: number;
                      name: string;
                      slug: string | null;
                    }) => (
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
                  {product.variants &&
                    product.variants.reduce(
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
              average_rating={Number(product.average_rating)}
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
            {product.store ? (
              <>
                <StoreDiscount store_id={product.store.id} />
                <StoreHotProduct store_id={product.store.id} />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {product.store ? <StoreProducts store_id={product.store.id} /> : <></>}
        <SuggestionOfTheDay />
      </main>

      <footer>
        <Footer />
      </footer>
      <div className="md:hidden w-full h-10"></div>

      {/* Mobile Variant Selection Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-25"
            onClick={() => setIsMobileModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                {modalAction === "addToCart" ? "Select Variant" : "Buy Now"}
              </h3>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <span className="text-gray-500 text-xl">×</span>
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-start space-x-3">
                <img
                  src={
                    currentVariant?.images?.[0]?.url ||
                    product?.promotion_image?.url ||
                    ""
                  }
                  alt={product?.name}
                  className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
                <div className="flex-1">
                  <p className="text-lg font-bold text-blue-500">
                    ${currentVariant?.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Stock: {currentVariant?.stock_quantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Variant Selection */}
            <div className="p-4 max-h-60 overflow-y-auto">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Variants
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {product?.variants?.map((variant: ItemVariant) => (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantChange(variant)}
                    className={`p-3 border rounded-lg text-sm transition-all duration-200 ${
                      currentVariant?.id === variant.id
                        ? "border-purple-500 bg-purple-50 text-purple-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {variant.variant_name}
                  </button>
                ))}
              </div>

              {/* Quantity Selection */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Quantity
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="w-16 h-10 flex items-center justify-center border-x border-gray-300 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    {currentVariant?.stock_quantity} available
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={handleModalConfirm}
                disabled={
                  !currentVariant || currentVariant.stock_quantity === 0
                }
                className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
                  currentVariant && currentVariant.stock_quantity > 0
                    ? modalAction === "addToCart"
                      ? "bg-purple-500 hover:bg-purple-600"
                      : "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {modalAction === "addToCart" ? "Add to Cart" : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {showWishlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add to Wishlist</h2>
              <button
                onClick={() => setShowWishlistModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {wishlists.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You don't have any wishlists yet.
                </p>
                <button
                  onClick={() => {
                    setShowWishlistModal(false);
                    navigate("/wishlist");
                  }}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Your First Wishlist
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-600 mb-4">
                  Choose a wishlist to add this product:
                </p>
                {wishlists.map((wishlist: Wishlist) => (
                  <div
                    key={wishlist.id}
                    onClick={() => handleWishlistSelect(wishlist.id)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {wishlist.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Created{" "}
                          {new Date(wishlist.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-purple-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowWishlistModal(false);
                      navigate("/wishlist");
                    }}
                    className="w-full px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    + Create New Wishlist
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
