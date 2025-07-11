import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useParams, useNavigate } from "react-router-dom";
import { Item, ItemImage, ItemVariant } from "../../types/Item";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { fetchBuyerAddress } from "../../features/BuyerAddress/BuyerAddressSlice";
import { fetchStore } from "../../features/StoreSlice/StoreSlice";

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
import { countTime } from "../../utility/countTime";


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

  const { user } = useSelector(
    (state: RootState) => state.profile
  );

  const { id } = useParams<{ id: string }>();
  
  const product = products.find(
    (product: Item) => product.id.toString() === id
  );
  const [currentVariant, setCurrentVariant] = useState<ItemVariant>(product?.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity < currentVariant.stock_quantity ? prevQuantity + 1 : currentVariant.stock_quantity));
  }

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  }

  const countStars = (rating:number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<img key={i} src={DarkStar} alt="Dark Star" className="w-4 h-4" />);
      } else {
        stars.push(<img key={i} src={LightStar} alt="Light Star" className="w-4 h-4" />);
      }
    }
    return stars;
  }

  useEffect(() => {
    if (addressStatus === "idle" || !address) {
      // Fetch the buyer address when the component mounts
      const promise = dispatch(fetchBuyerAddress());

      return () => {
        promise.abort();
      }
    }
  }, []);

  useEffect(() => {
    if (storeStatus === "idle" || !store) {
      // Fetch the store information when the component mounts
      const promise = dispatch(fetchStore(parseInt(product.store.id)));

      return () => {
        promise.abort();
      }
    }
  }, []);

  return (
    <div>
      <header>
        <BuyerHeader />
      </header>
      <nav className="ml-16 mt-4 text-lg">
        <Link to="/">Home</Link>
        {product.category_hierarchy?.map((category: { id: number; name: string; slug: string }) => (
          <> / <Link to={`/category/${category.slug}`}>{category.name}</Link></> 
        ))}
      </nav>
      <main className="mx-8 my-4">
        <div className="w-full flex">
          {/* Product and Variants */}
          <div className="w-2/3">
            {/* Images */}
            <div>
              <img 
                src={product.promotion_image.url}
                alt={product.promotion_image.alt_text || "Product Image"}
                className=""
              />
              <div>
                <img src={ChevronLeft} alt="Previous" />
                <div>
                  <img 
                    src={product.promotion_image.url}
                    alt={product.promotion_image.alt_text || "Product Image"}
                    className=""
                  />
                  {product.product_images?.map((image: ItemImage) => (
                    <img
                      src={image.url}
                      alt={image.alt_text || "Product Image"}
                      className=""
                    />
                  ))}
                  {product.variants?.map((variant: ItemVariant) => {
                    return variant.images?.map((image: ItemImage) => (
                      <img
                        key={image.id}
                        src={image.url}
                        alt={image.alt_text || "Variant Image"}
                        className=""
                      />
                    ));
                  })}
                </div>
                <img src={ChevronRight} alt="Next" />
              </div>
            </div>

            {/* Other info */}
            <div>
              <h1>{product.name}</h1>
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5"><div className="flex items-center">{countStars(product.avgRating)}</div> <span className="text-blue-500">{product.avgRating ?? 0}</span></div>
                  <p>|</p>
                  <p><span className="text-blue-500">{product.totalRating ?? 0}</span> Rating</p>
                  <p>|</p>
                  <p>{product.bought} Sold</p>
                </div>
                <div>
                  <img src={Heart} alt="Favorite" className="cursor-pointer" />
                  <img src={Share} alt="Share" className="cursor-pointer" />
                </div>
              </div>
              <p>${currentVariant.price}</p>
              <div>
                <div>
                  <p>Variants</p>
                  <p>Remain: {currentVariant.stock_quantity}</p>
                </div>
                <div>
                  <p>{currentVariant.variant_name}</p>
                  <div>
                    {product.variants.map((variant: ItemVariant) => (
                      <p key={variant.id}>{variant.variant_name}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <p>Quantity</p>
                <div>
                  <div onClick={decreaseQuantity}>-</div>
                  <div>{quantity}</div>
                  <div onClick={increaseQuantity}>+</div>
                </div>
              </div>
              <div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded">
                  Buy Now
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Shop Information */}
          <div className="w-1/3">
            <h3>Delivery Options</h3>
            
            {/* Location */}
            <div>
              <div>
                <img src={Location} alt="Location" />
                {(!address && !user) && (<p>Please login to see delivery options.</p>)}
                {(!address && user) && (<p>Your address might not be set up, or the address is fetching</p>)}
                {address && (
                  <p>
                    {address.address_line_1}, {address.city}, {address.state}, {address.postal_code}
                  </p>
                )}
              </div>
              <div>
                {(!address && !user) && (
                  <Link to="/login" className="text-purple-600 hover:underline">Login</Link>
                )}
                {(!address && user) && (
                  <Link to="/buyer/address" className="text-purple-600 hover:underline">Update</Link>
                )}
                {address && (
                  <Link to="/buyer/address" className="text-purple-600 hover:underline">Change</Link>
                )}
              </div>
            </div>

            {/* ! Ship date: This function should be done later */}
            <div>
              <div>
                <img src={DeliveryTruck} alt="Delivery Truck" />
                <p>Ships in 1-2 business days</p>
              </div>
            </div>
            
            <div>
              <div>
                {store?.profile_img ? (
                  <img src={store.profile_img} alt="Store Profile"/>
                ) : (
                  <img src={DefaultAvatar} alt="Default Avatar" />
                )}
                {store?.name ? (
                  <p>{store.name}</p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div>
                <button>Chat Now</button>
                <button>View Store</button>
              </div>
            </div>

            <div>
              <div>
                <p>Ratings</p>
                <p>{store?.total_reviews ?? 0}</p>
              </div>
              <div>
                <p>Average Rating</p>
                <p>{store?.average_rating ?? 0}</p>
              </div>
              <div>
                <p>Join</p>
                <p>{store?.created_at ? countTime(store.created_at) : 'N/A'}</p>
              </div>
            </div>

          </div>
        </div>

        
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
};

export default ProductPage;
