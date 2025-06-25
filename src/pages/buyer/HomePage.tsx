import React from "react";
import Footer from "../../components/Footer";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Hero from "../../features/Hero/Hero";
import BeforeCategory from "../../components/BeforeCategory";
import Category from "../../features/Category/Category";
import FlashSale from "../../features/FlashSale/FlashSale";
import SuggestionOfTheDay from "../../features/SuggestionOfTheDay/SuggestionOfTheDay";

const HomePage: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <header>
        <BuyerHeader />
      </header>
      <div>
        <Hero />
        <BeforeCategory />
        <Category />
        <FlashSale />
        <SuggestionOfTheDay />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
