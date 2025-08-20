import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import axios from "axios";
import { handleLogout } from "../Auth/AuthSlice";
import { fetchBuyerCart, removeFromCart } from "../Cart/CartSlice";
// SVG
import Bell from "../../assets/HomePage/Header/bell.svg";
import GitHub from "../../assets/HomePage/Header/github-white.svg";
import Search from "../../assets/HomePage/Header/search.svg";
import ShoppingCart from "../../assets/HomePage/Header/shopping-cart.svg";
import Menu from "../../assets/HomePage/Header/hamburger_menu.svg";
import CloseIcon from "../../assets/HomePage/Header/Close.svg";
import Logo from "../../assets/Logo.svg";
import GenericAvatar from "../../assets/generic-avatar.svg";
import { deleteProfile } from "../UserProfile/UserProfileSlice";

/* A custom hook for debouncing
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 */
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const BuyerHeader: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const { status, user } = useSelector((state: RootState) => state.profile);

  const { cart } = useSelector((state: RootState) => state.cart);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cachedSuggestions, setCachedSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);
  const mobileCartDropdownRef = useRef<HTMLDivElement>(null);

  // Handle search
  const handleSearch = () => {
    const searchQuery =
      selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]
        ? suggestions[selectedSuggestionIndex]
        : debouncedSearchTerm;

    if (searchQuery) {
      navigate(`/search?q=${searchQuery}`);
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleClickLogout = async () => {
    try {
      await dispatch(handleLogout());
      dispatch(deleteProfile());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handle cart functions
  const handleCartItemRemove = async (productVariantId: number) => {
    try {
      await dispatch(removeFromCart(productVariantId));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  // Helper function to get all items from cart (supports both old and new structure)
  const getAllCartItems = () => {
    if (!cart) return [];

    // New structure: cart has stores property
    if ((cart as any).stores && Array.isArray((cart as any).stores)) {
      return (cart as any).stores.flatMap((store: any) => store.items || []);
    }

    // Old structure: cart is an array of items
    if (Array.isArray(cart)) {
      return cart;
    }

    return [];
  };

  // Helper function to check if cart has items
  const hasCartItems = () => {
    const items = getAllCartItems();
    return items.length > 0;
  };

  const calculateCartTotal = () => {
    const items = getAllCartItems();
    return items
      .reduce((total: number, item: any) => {
        return total + item.price_at_purchase * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const getTotalCartItems = () => {
    const items = getAllCartItems();
    return items.reduce((total: number, item: any) => total + item.quantity, 0);
  };

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Fetch cart data when component mounts and user is logged in
  useEffect(() => {
    if (status === "succeeded" && user) {
      dispatch(fetchBuyerCart());
    }
  }, [dispatch, status, user]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(
          `http://localhost:3000/products/suggestions?q=${debouncedSearchTerm}`
        )
        .then((response) => {
          setSuggestions(response.data);
          setCachedSuggestions(response.data);
          setSelectedSuggestionIndex(-1);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
      setCachedSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  }, [debouncedSearchTerm]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Element;

      if (
        searchContainerRef.current &&
        target &&
        !searchContainerRef.current.contains(target)
      ) {
        setSuggestions([]);
      }

      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }

      // Check if click is outside both desktop and mobile cart dropdowns
      const isOutsideDesktopCart =
        cartDropdownRef.current && !cartDropdownRef.current.contains(target);
      const isOutsideMobileCart =
        mobileCartDropdownRef.current &&
        !mobileCartDropdownRef.current.contains(target);

      if (isOutsideDesktopCart && isOutsideMobileCart) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Handle focus to restore suggestions
  const handleSearchFocus = () => {
    if (searchTerm && cachedSuggestions.length > 0) {
      setSuggestions(cachedSuggestions);
      setSelectedSuggestionIndex(-1);
    }
  };

  return (
    <div className="bg-purple-500 fixed top-0 left-0 right-0 z-50">
      {/* Desktop Header (hidden on mobile) */}
      <div className="hidden md:block">
        {/* Top header */}
        <div className="flex justify-between items-center px-8 pt-2 pb-0.5 text-sm text-white">
          <div className="flex items-center space-x-6">
            {user?.role === "seller" ? (
              <Link to="/seller/dashboard" className="hover:underline">
                Seller channel
              </Link>
            ) : (
              <Link to="/seller" className="hover:underline">
                Seller channel
              </Link>
            )}
            <div className="flex items-center space-x-2">
              <a
                href="https://github.com/Reddit-Clone-App-Project/Shopp_client"
                target="_blank"
                className="hover:underline"
              >
                Show project Github respository
              </a>
              <img src={GitHub} alt="GitHub" className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src={Bell} alt="Notifications" className="w-4 h-4" />
              <span className="hover:underline cursor-pointer">
                Notification
              </span>
            </div>
            <div className="relative" ref={dropdownRef}>
              {status !== "succeeded" ? (
                <div className="flex items-center space-x-4">
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                  <span>|</span>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                </div>
              ) : (
                <>
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-white">{user?.username}</span>
                    <img
                      className="h-6 cursor-pointer hover:opacity-80"
                      src={user?.profile_img ?? GenericAvatar}
                      alt="Profile image"
                    />
                  </div>

                  {isDropdownOpen && (
                    <>
                      {/* Invisible backdrop to capture outside clicks */}
                      <div
                        className="fixed inset-0 z-5"
                        onClick={() => setIsDropdownOpen(false)}
                      />
                      <div className="absolute flex flex-col bg-white text-black top-8 right-0 shadow-lg rounded-md overflow-hidden min-w-[120px] z-10">
                        <Link
                          to="/profile"
                          className="px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          to="/carts"
                          className="px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          className="px-4 py-2 hover:bg-gray-100 text-sm text-left"
                          onClick={() => {
                            setIsDropdownOpen(false);
                            handleClickLogout();
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom header */}
        <div className="flex items-center justify-between px-8 pb-3 pt-1">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8 cursor-pointer" />
          </Link>
          <div
            className="flex-1 max-w-3xl mx-12 relative"
            ref={searchContainerRef}
          >
            <input
              type="text"
              placeholder="Free shipping with Shopp - Register now"
              className="w-full h-10 pl-4 pr-10 bg-white focus:outline-none focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleSearchFocus}
              onKeyDown={handleKeyDown}
            />
            <div
              onClick={handleSearch}
              className="absolute w-14 h-6 right-3 top-1/2 transform -translate-y-1/2 bg-purple-600 flex items-center justify-center cursor-pointer hover:bg-purple-700"
            >
              <img src={Search} alt="Search" className="w-4 h-4" />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <Link
                    to={`search/${suggestion}`}
                    key={index}
                    className={`block p-2 hover:bg-purple-100 cursor-pointer shadow-sm ${
                      selectedSuggestionIndex === index ? "bg-purple-100" : ""
                    }`}
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="relative" ref={cartDropdownRef}>
            <div
              className="relative cursor-pointer hover:opacity-80"
              onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
            >
              <img
                src={ShoppingCart}
                alt="Shopping Cart"
                className="w-6 h-6 text-white"
              />
              {hasCartItems() && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalCartItems()}
                </span>
              )}
            </div>

            {isCartDropdownOpen && (
              <>
                {/* Invisible backdrop to capture outside clicks */}
                <div
                  className="fixed inset-0 z-5"
                  onClick={() => setIsCartDropdownOpen(false)}
                />
                <div
                  className="absolute top-8 right-0 bg-white shadow-xl rounded-lg overflow-hidden min-w-[380px] max-w-[420px] z-10 border border-gray-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-purple-800">
                        Shopping Cart
                      </h3>
                      {status === "succeeded" && hasCartItems() && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          {getTotalCartItems()}{" "}
                          {getTotalCartItems() === 1 ? "item" : "items"}
                        </span>
                      )}
                    </div>
                  </div>

                  {status !== "succeeded" ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                        <img
                          src={ShoppingCart}
                          alt="Cart"
                          className="w-8 h-8 text-purple-600"
                        />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        Sign in to view your cart
                      </h4>
                      <p className="text-gray-500 text-sm mb-4">
                        Please log in to see your saved items and continue
                        shopping
                      </p>
                      <div className="space-y-2">
                        <Link
                          to="/login"
                          className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                          onClick={() => setIsCartDropdownOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          className="block w-full bg-white text-purple-600 text-center py-3 rounded-lg hover:bg-purple-50 transition-all duration-200 font-semibold border border-purple-600"
                          onClick={() => setIsCartDropdownOpen(false)}
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                  ) : !hasCartItems() ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <img
                          src={ShoppingCart}
                          alt="Empty Cart"
                          className="w-8 h-8 opacity-50"
                        />
                      </div>
                      <p className="text-gray-500 text-sm">
                        Your cart is empty
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Add some products to get started!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-96 overflow-y-auto">
                        {/* Check if cart has the new structure with stores */}
                        {(cart as any).stores
                          ? // New structure: render by stores
                            (cart as any).stores.map((store: any) => (
                              <div key={store.store_id}>
                                {(cart as any).stores.length > 1 && (
                                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                                    <h5 className="text-xs font-semibold text-gray-600">
                                      {store.store_name}
                                    </h5>
                                  </div>
                                )}
                                {store.items.map((item: any) => (
                                  <div
                                    key={`${store.store_id}-${item.product_variant_id}`}
                                    className="p-4 border-b border-gray-50 hover:bg-gray-25 transition-colors duration-200"
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="flex-shrink-0">
                                        <img
                                          src={
                                            item.image_url ||
                                            "/placeholder-image.jpg"
                                          }
                                          alt={item.product_name || "Product"}
                                          className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
                                          {item.product_name ||
                                            "Unknown Product"}
                                        </h4>
                                        {item.variant_name && (
                                          <p className="text-xs text-gray-400 mb-1">
                                            Variant: {item.variant_name}
                                          </p>
                                        )}
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            Qty: {item.quantity}
                                          </span>
                                          <span className="text-sm font-bold text-purple-600">
                                            $
                                            {(
                                              item.price_at_purchase *
                                              item.quantity
                                            ).toFixed(2)}
                                          </span>
                                        </div>
                                        <button
                                          onClick={() =>
                                            handleCartItemRemove(
                                              item.product_variant_id
                                            )
                                          }
                                          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors duration-200 border border-red-200 hover:border-red-300 cursor-pointer"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))
                          : // Old structure: render items directly
                            Array.isArray(cart) &&
                            cart.map((item: any, index: number) => (
                              <div
                                key={index}
                                className="p-4 border-b border-gray-50 hover:bg-gray-25 transition-colors duration-200"
                              >
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0">
                                    <img
                                      src={
                                        item.image_url ||
                                        "/placeholder-image.jpg"
                                      }
                                      alt={item.product_name || "Product"}
                                      className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">
                                      {item.product_name || "Unknown Product"}
                                    </h4>
                                    {item.variant_name && (
                                      <p className="text-xs text-gray-400 mb-1">
                                        Variant: {item.variant_name}
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        Qty: {item.quantity}
                                      </span>
                                      <span className="text-sm font-bold text-purple-600">
                                        $
                                        {(
                                          item.price_at_purchase * item.quantity
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleCartItemRemove(
                                          item.product_variant_id
                                        )
                                      }
                                      className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors duration-200 border border-red-200 hover:border-red-300 cursor-pointer"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>

                      <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-bold text-gray-800">
                            Total:
                          </span>
                          <span className="text-xl font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-lg">
                            ${calculateCartTotal()}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <Link
                            to="/cart"
                            className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => setIsCartDropdownOpen(false)}
                          >
                            View Full Cart
                          </Link>
                         
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header (shown on mobile) */}
      <div className="md:hidden">
        {/* Top bar with logo, search, cart and menu */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <img
                src={isMobileMenuOpen ? CloseIcon : Menu}
                alt="Menu"
                className="w-6 h-6"
              />
            </button>
            <Link to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-6" />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSearchExpanded(!isSearchExpanded)}>
              <img src={Search} alt="Search" className="w-5 h-5" />
            </button>
            <div className="relative" ref={mobileCartDropdownRef}>
              <div
                className="relative cursor-pointer hover:opacity-80"
                onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
              >
                <img
                  src={ShoppingCart}
                  alt="Shopping Cart"
                  className="w-5 h-5"
                />
                {hasCartItems() && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {getTotalCartItems()}
                  </span>
                )}
              </div>

              {isCartDropdownOpen && (
                <>
                  {/* Invisible backdrop to capture outside clicks */}
                  <div
                    className="fixed inset-0 z-5"
                    onClick={() => setIsCartDropdownOpen(false)}
                  />
                  <div
                    className="absolute top-8 right-0 bg-white shadow-xl rounded-lg overflow-hidden w-80 z-10 border border-gray-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-purple-100 border-b border-purple-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-purple-800">
                          Shopping Cart
                        </h3>
                        {status === "succeeded" && hasCartItems() && (
                          <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                            {getTotalCartItems()}
                          </span>
                        )}
                      </div>
                    </div>

                    {status !== "succeeded" ? (
                      <div className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                          <img
                            src={ShoppingCart}
                            alt="Cart"
                            className="w-6 h-6 text-purple-600"
                          />
                        </div>
                        <h4 className="text-base font-semibold text-gray-800 mb-2">
                          Sign in to view cart
                        </h4>
                        <p className="text-gray-500 text-xs mb-4">
                          Please log in to see your items
                        </p>
                        <div className="space-y-2">
                          <Link
                            to="/login"
                            className="block w-full bg-purple-600 text-white text-center py-2.5 rounded-lg hover:bg-purple-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => setIsCartDropdownOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/register"
                            className="block w-full bg-white text-purple-600 text-center py-2 rounded-lg hover:bg-purple-50 transition-all duration-200 text-xs font-semibold border border-purple-600"
                            onClick={() => setIsCartDropdownOpen(false)}
                          >
                            Create Account
                          </Link>
                        </div>
                      </div>
                    ) : !hasCartItems() ? (
                      <div className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                          <img
                            src={ShoppingCart}
                            alt="Empty Cart"
                            className="w-6 h-6 opacity-50"
                          />
                        </div>
                        <p className="text-gray-500 text-sm">
                          Your cart is empty
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          Add products to get started!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-72 overflow-y-auto">
                          {getAllCartItems()
                            .slice(0, 3)
                            .map((item: any, index: number) => (
                              <div
                                key={index}
                                className="p-3 border-b border-gray-50 hover:bg-gray-25 transition-colors duration-200"
                              >
                                <div className="flex items-start space-x-2">
                                  <div className="flex-shrink-0">
                                    <img
                                      src={
                                        item.image_url ||
                                        "/placeholder-image.jpg"
                                      }
                                      alt={item.product_name || "Product"}
                                      className="w-12 h-12 object-cover rounded-lg border border-gray-200 shadow-sm"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-semibold text-gray-900 truncate mb-1">
                                      {item.product_name || "Unknown Product"}
                                    </h4>
                                    {item.variant_name && (
                                      <p className="text-xs text-gray-400 mb-1">
                                        {item.variant_name}
                                      </p>
                                    )}
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        Qty: {item.quantity}
                                      </span>
                                      <span className="text-sm font-bold text-purple-600">
                                        $
                                        {(
                                          item.price_at_purchase * item.quantity
                                        ).toFixed(2)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          {getAllCartItems().length > 3 && (
                            <div className="p-2 text-center">
                              <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                                +{getAllCartItems().length - 3} more items
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-bold text-gray-800">
                              Total:
                            </span>
                            <span className="text-lg font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded">
                              ${calculateCartTotal()}
                            </span>
                          </div>
                          <Link
                            to="/cart"
                            className="block w-full bg-purple-600 text-white text-center py-2.5 rounded-lg hover:bg-purple-700 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                            onClick={() => setIsCartDropdownOpen(false)}
                          >
                            View Full Cart
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Expanded search (when search icon is clicked) */}
        {isSearchExpanded && (
          <div className="px-4 pb-3">
            <div className="relative" ref={searchContainerRef}>
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-10 pl-4 pr-10 bg-white rounded focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchFocus}
                onKeyDown={handleKeyDown}
              />
              <div
                onClick={handleSearch}
                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-purple-600 rounded-r"
              >
                <img src={Search} alt="Search" className="w-4 h-4" />
              </div>
              {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <Link
                      to={`search/${suggestion}`}
                      key={index}
                      className={`block p-2 hover:bg-purple-100 cursor-pointer shadow-sm ${
                        selectedSuggestionIndex === index ? "bg-purple-100" : ""
                      }`}
                    >
                      {suggestion}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile menu (when hamburger is clicked) */}
        {isMobileMenuOpen && (
          <div className="bg-purple-600 px-4 py-3">
            <div className="space-y-4">
              <Link
                to="/"
                className="block text-white hover:bg-purple-700 p-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/seller"
                className="block text-white hover:bg-purple-700 p-2 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Seller channel
              </Link>

              <a
                href="https://github.com/Reddit-Clone-App-Project/Shopp_client"
                target="_blank"
                className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded"
              >
                <span>GitHub Repository</span>
                <img src={GitHub} alt="GitHub" className="w-4 h-4" />
              </a>

              <div className="flex items-center space-x-2 text-white hover:bg-purple-700 p-2 rounded cursor-pointer">
                <img src={Bell} alt="Notifications" className="w-4 h-4" />
                <span>Notification</span>
              </div>

              <div className="pt-2 border-t border-purple-400">
                {status !== "succeeded" ? (
                  <>
                    <Link
                      to="/register"
                      className="block text-white hover:bg-purple-700 p-2 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                    <Link
                      to="/login"
                      className="block text-white hover:bg-purple-700 p-2 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2">
                      <span className="text-white">{user?.username}</span>
                      <img
                        className="h-6 cursor-pointer hover:opacity-80"
                        src={user?.profile_img ?? GenericAvatar}
                        alt="Profile image"
                      />
                    </div>
                    <Link
                      to="/profile"
                      className="block text-white hover:bg-purple-700 p-2 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/carts"
                      className="block text-white hover:bg-purple-700 p-2 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      className="block text-white hover:bg-purple-700 p-2 rounded w-full text-left"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleClickLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerHeader;
