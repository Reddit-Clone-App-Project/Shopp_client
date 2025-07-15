import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useSearchParams } from "react-router-dom";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import ItemCard from "../../components/Item";
import { searchProductsAsync } from "../../features/Search/SearchSlice";

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

  const { results, offset } = useSelector((state: RootState) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") || "";

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
    if (!results.length) {
      const promise = dispatch(searchProductsAsync({ query: searchTerm }));

      return () => {
        promise.abort();
      };
    }
  }, []);

  return (
    <div>
      <header>
        <BuyerHeader />
      </header>
      <div className="mt-[56px] md:mt-30 flex justify-center gap-4 md:mx-4">
        {/* Filter */}
        {/* Ai start here */}
        <div className="hidden md:block p-4 bg-blue-100">
          <h2 className="text-lg font-bold">
            <img src={Filter} alt="Filter" className="inline-block mr-2 w-3" />{" "}
            SEARCH FILTER
          </h2>
          <div className="mt-4">
            <h4>Shipping Type</h4>
            <div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="fast" value="fast" id="fast" />
                <label htmlFor="fast">Fast</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="economical"
                  value="economical"
                  id="economical"
                />
                <label htmlFor="economical">Economical</label>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <h4>Price Range {'(USD)'}</h4>
            <input type="number" placeholder="Min" className="w-full pl-1 border border-gray-500" />
            <input type="number" placeholder="Max" className="w-full pl-1 border border-gray-500" />
          </div>

          <div className="mt-4">
            <h4>Rating</h4>
            <div className="flex items-center gap-2 mt-1">
              <input type="radio" name="rating" value="1" id="rating-1" />
              <label htmlFor="rating-1" className="flex items-center">{countStars(1)} <span className="text-gray-600 ml-1">up</span></label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="rating" value="2" id="rating-2" />
              <label htmlFor="rating-2" className="flex items-center">{countStars(2)} <span className="text-gray-600 ml-1">up</span></label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="rating" value="3" id="rating-3" />
              <label htmlFor="rating-3" className="flex items-center">{countStars(3)} <span className="text-gray-600 ml-1">up</span></label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="rating" value="4" id="rating-4" />
              <label htmlFor="rating-4" className="flex items-center">{countStars(4)} <span className="text-gray-600 ml-1">up</span></label>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" name="rating" value="5" id="rating-5" />
              <label htmlFor="rating-5" className="flex items-center">{countStars(5)} <span className="text-gray-600 ml-1">up</span></label>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <button className="px-2 py-1 bg-purple-500 text-white rounded-sm">Apply</button>
            <button className="px-2 py-1 bg-purple-500 text-white rounded-sm">Clear Filter</button>
          </div>
        </div>
          {/* AI end here */}

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
                Search results for{" "}
                <span className="text-blue-600 font-bold ml-1">
                  "{searchTerm}"
                </span>
              </h2>

              {/* Sorting bar */}
              <div className="flex items-center gap-4 mt-6">
                <h4 className="text-sm font-medium text-gray-600 mr-2">
                  Sort by:
                </h4>

                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                  Relevance
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                  Newest
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer">
                  Most Bought
                </button>

                <div className="relative">
                  <button className="flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors min-w-[120px] cursor-pointer">
                    Price
                    <img
                      src={ChevronDown}
                      alt="chevron down"
                      className="w-4 h-4 ml-2"
                    />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 hidden">
                    <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 cursor-pointer">
                      Low to High
                    </button>
                    <button className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                      High to Low
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-auto">
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
