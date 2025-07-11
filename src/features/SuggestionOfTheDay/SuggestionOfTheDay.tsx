import React, { useEffect } from "react";
import ItemCard from "../../components/Item";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { fetchSuggestionOfTheDay } from "./SuggestionOfTheDaySlice";

const SuggestionOfTheDay: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.profile);
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector(
    (state: RootState) => state.suggestionOfTheDay.products
  );
  const { offset, status } = useSelector(
    (state: RootState) => state.suggestionOfTheDay
  );

 useEffect(() => {
  // We only fetch if there are no products.
  // This is the only condition we need.
  if (items.length === 0) {
    const promise = dispatch(fetchSuggestionOfTheDay(offset));

    // The cleanup function will run on unmount.
    return () => {
      promise.abort();
    };
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // <-- The dependency array MUST be empty.


  /*
    const items: Item[] = [
        {
            name: "Classic Leather Wallet",
            price: 49.99,
            image_url: "https://images.pexels.com/photos/4452523/pexels-photo-4452523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 10,
            sold: 2345,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "Wireless Bluetooth Headphones",
            price: 89.50,
            image_url: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 20,
            sold: 4879,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: true
        },
        {
            name: "Stainless Steel Water Bottle",
            price: 24.95,
            image_url: "https://images.pexels.com/photos/1092876/pexels-photo-1092876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 5,
            sold: 876,
            isMall: false,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Organic Green Tea Bags",
            price: 12.00,
            image_url: "https://images.pexels.com/photos/712618/pexels-photo-712618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 0,
            sold: 345,
            isMall: false,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Men's Casual Plaid Shirt",
            price: 35.75,
            image_url: "https://images.pexels.com/photos/157675/fashion-men-s-individuality-black-and-white-157675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 15,
            sold: 1234,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "Smart Fitness Tracker Watch",
            price: 65.00,
            image_url: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 10,
            sold: 3122,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: true
        },
        {
            name: "Aromatherapy Essential Oil Diffuser",
            price: 42.99,
            image_url: "https://images.pexels.com/photos/4057755/pexels-photo-4057755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 25,
            sold: 987,
            isMall: false,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "Non-Stick Cookware Set (10-Piece)",
            price: 129.99,
            image_url: "https://images.pexels.com/photos/1080036/pexels-photo-1080036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 30,
            sold: 1543,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: true
        },
        {
            name: "Portable Power Bank 20000mAh",
            price: 39.99,
            image_url: "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 5,
            sold: 5123,
            isMall: true,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Women's High-Waisted Yoga Pants",
            price: 29.99,
            image_url: "https://images.pexels.com/photos/4078496/pexels-photo-4078496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 10,
            sold: 2876,
            isMall: false,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "Gourmet Coffee Bean Grinder",
            price: 55.49,
            image_url: "https://images.pexels.com/photos/373965/pexels-photo-373965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 15,
            sold: 765,
            isMall: true,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Handmade Scented Soy Candle",
            price: 18.00,
            image_url: "https://images.pexels.com/photos/109919/pexels-photo-109919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 0,
            sold: 1345,
            isMall: false,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Lightweight Running Shoes",
            price: 78.99,
            image_url: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 20,
            sold: 3321,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: true
        },
        {
            name: "Hardcover Fiction Novel",
            price: 22.50,
            image_url: "https://images.pexels.com/photos/34648/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 10,
            sold: 543,
            isMall: false,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Professional DSLR Camera Bag",
            price: 95.00,
            image_url: "https://images.pexels.com/photos/122428/pexels-photo-122428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 15,
            sold: 879,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "Electric Toothbrush with 4 Heads",
            price: 45.99,
            image_url: "https://images.pexels.com/photos/4279096/pexels-photo-4279096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 5,
            sold: 4123,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: true
        },
        {
            name: "Set of 12 Colored Pencils",
            price: 9.99,
            image_url: "https://images.pexels.com/photos/163065/colored-pencils-metric-school-supplies-163065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 0,
            sold: 654,
            isMall: false,
            isFreeShipping: false,
            isBestPrice: false
        },
        {
            name: "Insulated Lunch Bag",
            price: 19.95,
            image_url: "https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 10,
            sold: 1789,
            isMall: false,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "HD Webcam for Streaming",
            price: 59.00,
            image_url: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 15,
            sold: 2333,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: false
        },
        {
            name: "Adjustable Dumbbell Set",
            price: 199.99,
            image_url: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            discount: 20,
            sold: 998,
            isMall: true,
            isFreeShipping: true,
            isBestPrice: true
        }
    ];
    */
  return (
    <div className="flex flex-col mt-10 mx-0. lg:mx-14 gap-4">
      <div className="h-16 flex items-center justify-center lg:border border-gray-300">
        <h2 className="text-xl font-semibold text-purple-600 uppercase">
          Suggestion of the Day
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item, index) => (
          <ItemCard key={index} flashSaleItem={null} item={item} />
        ))}
      </div>

      {user ? (
        <button 
            className="self-center border border-gray-300 px-4 py-2 cursor-pointer hover:text-gray-600"
            onClick={() => {
                dispatch(fetchSuggestionOfTheDay(offset));
            }}
        >
          See More
        </button>
      ) : (
        <Link
          className="self-center border border-gray-300 px-4 py-2 cursor-pointer hover:text-gray-600"
          to="/login"
        >
          Login To See More
        </Link>
      )}
    </div>
  );
};

export default SuggestionOfTheDay;
