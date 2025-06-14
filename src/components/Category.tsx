import React, { useState, useEffect } from "react";
// SVG
import Beauty from "../assets/HomePage/Category/beauty.svg";
import Book from "../assets/HomePage/Category/book.svg";
import Bracelet from "../assets/HomePage/Category/bracelet.svg";
import Camera from "../assets/HomePage/Category/camera.svg";
import ConvenienceStore from "../assets/HomePage/Category/convenience-store.svg";
import Electric from "../assets/HomePage/Category/electric.svg";
import HighHeels from "../assets/HomePage/Category/high-heels.svg";
import Home from "../assets/HomePage/Category/home.svg";
import Kid from "../assets/HomePage/Category/kid.svg";
import Laptop from "../assets/HomePage/Category/laptop.svg";
import MenFashion from "../assets/HomePage/Category/menFashion.svg";
import MenShoes from "../assets/HomePage/Category/menShoes.svg";
import Motorbike from "../assets/HomePage/Category/motorbike.svg";
import Phone from "../assets/HomePage/Category/phone.svg";
import PurseWallet from "../assets/HomePage/Category/purse-wallet.svg";
import TennisRacket from "../assets/HomePage/Category/tennis-racket.svg";
import TV from "../assets/HomePage/Category/tv.svg";
import Watch from "../assets/HomePage/Category/watch.svg";
import WomenFashion from "../assets/HomePage/Category/womenFashion.svg";
import Yoga from "../assets/HomePage/Category/yoga.svg";

const Category : React.FC = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const categories : {icon: string, title: string}[] = [
    { icon: MenFashion, title: "Men's Fashion" },
    { icon: Phone, title: "Phones & Accessories" },
    { icon: TV, title: "Electronic equipment" },
    { icon: Laptop, title: "PC & Laptop" },
    { icon: Camera, title: "Cameras and Camcorders" },
    { icon: Watch, title: "Watch" },
    { icon: MenShoes, title: "Men's shoes" },
    { icon: Electric, title: "Household electrical appliances" },
    { icon: TennisRacket, title: "Sports and travel" },
    { icon: Motorbike, title: "Cars & Motorcycles & Bicycles" },
    { icon: WomenFashion, title: "Women's Fashion" },
    { icon: Kid, title: "Mother and Baby" },
    { icon: Home, title: "Home & Life" },
    { icon: Beauty, title: "Beauty" },
    { icon: Yoga, title: "Health" },
    { icon: HighHeels, title: "Women's shoes" },
    { icon: PurseWallet, title: "Women's bags and wallets" },
    { icon: Bracelet, title: "Women's accessories and jewelry" },
    { icon: ConvenienceStore, title: "Online Grocery" },
    { icon: Book, title: "Online Bookstore" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length]);

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  };

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % categories.length);
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold text-center mb-8">Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <img
                  src={category.icon}
                  alt={category.title}
                  className="w-8 h-8"
                />
              </div>
              <p className="text-sm text-center text-gray-700">{category.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Category;
