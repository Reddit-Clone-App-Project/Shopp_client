import React from "react";
import Footer from "../../components/Footer";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Hero from "../../features/Hero/Hero";
import BeforeCategory from "../../components/BeforeCategory";
import Category from "../../components/Category";

const HomePage: React.FC = () => {
  return (
    <>
      <header>
        <BuyerHeader />
      </header>
      <div>
        <Hero />
        <BeforeCategory />
        <Category />

      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default HomePage;
