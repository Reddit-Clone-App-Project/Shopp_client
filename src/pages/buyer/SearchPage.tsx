import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import ItemCard from "../../components/Item";
import {
  clearSearchResults,
  searchProductsAsync,
} from "../../features/Search/SearchSlice";

// SVG
import Filter from "../../assets/Filter.svg";
import LightBulb from "../../assets/LightBulb.svg";
import ChevronDown from "../../assets/chevron-down.svg";
import ChevronLeft from "../../assets/HomePage/Category/chevron-left.svg";
import ChevronRight from "../../assets/HomePage/Category/chevron-right.svg";
import DarkStar from "../../assets/Product/DarkStar.svg";
import LightStar from "../../assets/Product/LightStar.svg";

const SearchPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { results, offset } = useSelector((state: RootState) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [sortOrder, setSortOrder] = useState<
    | "Relevance"
    | "Newest"
    | "Most Bought"
    | "Price: Low to High"
    | "Price: High to Low"
  >("Relevance");
  const [priceDropdown, setPriceDropdown] = useState(false);

  const toggleOnPriceDropdown = () => {
    setPriceDropdown(true);
  };

  const toggleOffPriceDropdown = () => {
    setPriceDropdown(false);
  };

  const initialFilterState = {
    shippingTypes: [] as string[],
    minPrice: "",
    maxPrice: "",
    rating: "",
  };

  const [filters, setFilters] = useState(initialFilterState);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prev) => ({
        ...prev,
        shippingTypes: checked
          ? [...prev.shippingTypes, value]
          : prev.shippingTypes.filter((type) => type !== value),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleApplyFilters = () => {
    dispatch(clearSearchResults());
    dispatch(
      searchProductsAsync({
        query: searchTerm,
        sortBy: sortOrder,
        minPrice: parseInt(filters.minPrice) || null,
        maxPrice: parseInt(filters.maxPrice) || null,
        rating: parseInt(filters.rating) || null,
      })
    );
    setIsFilterOpen(false); // Close the filter sidebar on mobile after applying filters
  };

  const handleClearFilters = () => {
    setFilters(initialFilterState);
    dispatch(clearSearchResults());
    dispatch(
      searchProductsAsync({
        query: searchTerm,
        sortBy: sortOrder,
      })
    );
  };

  const handleChangeSortOrder = (newSortOrder: string) => {
    setSortOrder(
      newSortOrder as
        | "Relevance"
        | "Newest"
        | "Most Bought"
        | "Price: Low to High"
        | "Price: High to Low"
    );
    dispatch(clearSearchResults());
    dispatch(
      searchProductsAsync({
        query: searchTerm,
        sortBy: newSortOrder,
        minPrice: parseInt(filters.minPrice) || null,
        maxPrice: parseInt(filters.maxPrice) || null,
        rating: parseInt(filters.rating) || null,
      })
    );
  };

  const countStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <img key={i} src={DarkStar} alt="Dark Star" className="w-3 h-3" />
        );
      } else {
        stars.push(
          <img key={i} src={LightStar} alt="Light Star" className="w-3 h-3" />
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(clearSearchResults());
      const promise = dispatch(
        searchProductsAsync({
          query: searchTerm,
          sortBy: sortOrder,
          minPrice: parseInt(filters.minPrice) || null,
          maxPrice: parseInt(filters.maxPrice) || null,
          rating: parseInt(filters.rating) || null,
        })
      );

      return () => {
        promise.abort();
      };
    }
  }, [dispatch, searchTerm, sortOrder, filters]);

  return (
    <div>
      <header>
        <BuyerHeader />
      </header>
      <div className="mt-[56px] md:mt-30 flex flex-col md:flex-row justify-center gap-4 md:mx-4">
        {/* Filter Trigger Button for Mobile */}
        <div className="md:hidden p-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            <span>{isFilterOpen ? "Close Filters" : "Show Filters"}</span>
          </button>
        </div>

        {/* Filter Sidebar */}
        <div
          className={`
            ${isFilterOpen ? "block" : "hidden"} md:block 
            w-full md:w-auto p-4 bg-blue-100 
            md:sticky md:top-24 md:self-start
            transition-all duration-300 ease-in-out
          `}
        >
          <h2 className="text-lg font-bold">
            <img src={Filter} alt="Filter" className="inline-block mr-2 w-3" />
            SEARCH FILTER
          </h2>
          <div className="mt-4">
            <h4>Shipping Type</h4>
            <div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="fast"
                  id="fast"
                  checked={filters.shippingTypes.includes("fast")}
                  onChange={handleFilterChange}
                />
                <label htmlFor="fast">Fast</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value="economical"
                  id="economical"
                  checked={filters.shippingTypes.includes("economical")}
                  onChange={handleFilterChange}
                />
                <label htmlFor="economical">Economical</label>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <h4>Price Range {"(USD)"}</h4>
            <input
              type="number"
              name="minPrice"
              min={0}
              placeholder="Min"
              className="w-full pl-1 border border-gray-500"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              min={0}
              placeholder="Max"
              className="w-full pl-1 border border-gray-500"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>

          <div className="mt-4">
            <h4>Rating</h4>
            {[1, 2, 3, 4, 5].map((starValue) => (
              <div className="flex items-center gap-2 mt-1" key={starValue}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  id={`rating-${starValue}`}
                  checked={filters.rating === String(starValue)}
                  onChange={handleFilterChange}
                />
                <label
                  htmlFor={`rating-${starValue}`}
                  className="flex items-center"
                >
                  {countStars(starValue)}
                  <span className="text-gray-600 ml-1">up</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleApplyFilters}
              className="px-2 py-1 cursor-pointer bg-purple-500 hover:bg-purple-600 text-white rounded-sm"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="px-2 py-1 cursor-pointer bg-purple-500 hover:bg-purple-600 text-white rounded-sm"
            >
              Clear Filter
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 p-6 bg-white">
          <div className="mb-8">
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <img
                  src={LightBulb}
                  alt="Search results"
                  className="inline-block mr-3 w-6 h-6"
                />
                Search results for
                <span className="text-blue-600 font-bold ml-1">
                  "{searchTerm}"
                </span>
              </h2>

              {/* Sorting bar */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mt-6">
                <h4 className="text-sm font-medium text-gray-600 mr-2 hidden md:block">
                  Sort by:
                </h4>

                <button
                  className={`px-4 py-2 text-sm font-medium  ${
                    sortOrder === "Relevance"
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-300 rounded-md transition-colors cursor-pointer`}
                  onClick={() => handleChangeSortOrder("Relevance")}
                >
                  Relevance
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium  ${
                    sortOrder === "Newest"
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-300 rounded-md transition-colors cursor-pointer`}
                  onClick={() => handleChangeSortOrder("Newest")}
                >
                  Newest
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium  ${
                    sortOrder === "Most Bought"
                      ? "bg-purple-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } border border-gray-300 rounded-md transition-colors cursor-pointer`}
                  onClick={() => handleChangeSortOrder("Most Bought")}
                >
                  Most Bought
                </button>

                <div
                  className="relative"
                  onMouseEnter={toggleOnPriceDropdown}
                  onMouseLeave={toggleOffPriceDropdown}
                >
                  <button
                    className={`flex items-center justify-between px-4 py-2 text-sm font-medium ${
                      sortOrder === "Price: Low to High" ||
                      sortOrder === "Price: High to Low"
                        ? "text-purple-600"
                        : "text-gray-700"
                    } bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:min-w-[200px] cursor-pointer`}
                  >
                    {sortOrder === "Price: Low to High"
                      ? "Price: Low to High"
                      : sortOrder === "Price: High to Low"
                      ? "Price: High to Low"
                      : "Price"}
                    <img
                      src={ChevronDown}
                      alt="chevron down"
                      className="w-4 h-4 ml-2"
                    />
                  </button>
                  <div
                    className={`absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 ${
                      priceDropdown ? "block" : "hidden"
                    }`}
                  >
                    <button
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer"
                      onClick={() => {
                        handleChangeSortOrder("Price: Low to High");
                        toggleOffPriceDropdown();
                      }}
                    >
                      Low to High
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => {
                        handleChangeSortOrder("Price: High to Low");
                        toggleOffPriceDropdown();
                      }}
                    >
                      High to Low
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:ml-auto">
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                    <img
                      src={ChevronLeft}
                      alt="Previous page"
                      className="w-4 h-4"
                    />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
                    <img
                      src={ChevronRight}
                      alt="Next page"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {results.length > 0 ? (
              results.map((product, index) => (
                <ItemCard key={index} flashSaleItem={null} item={product} />
              ))
            ) : (
              <p>No results found for "{searchTerm}"</p>
            )}
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default SearchPage;