import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import axios from "axios";
import { handleLogout } from "../Auth/AuthSlice";
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
  const { status, error, user } = useSelector(
    (state: RootState) => state.profile
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [cachedSuggestions, setCachedSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  }

  // Handle Escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
            <Link to="/seller" className="hover:underline">
              Seller channel
            </Link>
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
                            setIsDropdownOpen(false)
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
          <img
            src={ShoppingCart}
            alt="Shopping Cart"
            className="w-6 h-6 text-white cursor-pointer hover:opacity-80"
          />
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
            <img src={ShoppingCart} alt="Shopping Cart" className="w-5 h-5" />
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
                        setIsMobileMenuOpen(false)
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
