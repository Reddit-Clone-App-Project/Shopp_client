// ! Category data is mocked, later be changed in the future.
import React, { useState, useEffect, useCallback } from "react";
// Import Embla Carousel
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
// SVG
import Beauty from "../../assets/HomePage/Category/beauty.svg";
import Book from "../../assets/HomePage/Category/book.svg";
import Bracelet from "../../assets/HomePage/Category/bracelet.svg";
import Camera from "../../assets/HomePage/Category/camera.svg";
import ConvenienceStore from "../../assets/HomePage/Category/convenience-store.svg";
import Electric from "../../assets/HomePage/Category/electric.svg";
import HighHeels from "../../assets/HomePage/Category/high-heels.svg";
import Home from "../../assets/HomePage/Category/home.svg";
import Kid from "../../assets/HomePage/Category/kid.svg";
import Laptop from "../../assets/HomePage/Category/laptop.svg";
import MenFashion from "../../assets/HomePage/Category/menFashion.svg";
import MenShoes from "../../assets/HomePage/Category/menShoes.svg";
import Motorbike from "../../assets/HomePage/Category/motorbike.svg";
import Phone from "../../assets/HomePage/Category/phone.svg";
import PurseWallet from "../../assets/HomePage/Category/purse-wallet.svg";
import TennisRacket from "../../assets/HomePage/Category/tennis-racket.svg";
import TV from "../../assets/HomePage/Category/tv.svg";
import Watch from "../../assets/HomePage/Category/watch.svg";
import WomenFashion from "../../assets/HomePage/Category/womenFashion.svg";
import Yoga from "../../assets/HomePage/Category/yoga.svg";
import ChevronLeft from "../../assets/HomePage/Category/chevron-left.svg";
import ChevronRight from "../../assets/HomePage/Category/chevron-right.svg";

const useResponsiveSlides = () => {
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to desktop

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(10); // 5x2 grid
      } else if (width >= 768) {
        setItemsPerPage(8); // 4x2 grid, or adjust as needed
      } else {
        setItemsPerPage(6); // 3x2 grid for smaller screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return itemsPerPage;
};

const Category: React.FC = () => {
  const itemsPerPage = useResponsiveSlides();

  // Embla Carousel setup with the Autoplay plugin
  // It stops on hover/interaction by default.
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' }, 
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    // Update state on carousel events
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    const onInit = () => {
        setScrollSnaps(emblaApi.scrollSnapList());
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onInit); // handles resize
    onInit(); // initial setup

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onInit);
    };
  }, [emblaApi]);


  const categories: { icon: string; title: string }[] = [
    // Your category data remains the same...
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
  
  // Chunk categories into pages. Each page will be one slide.
  const categoryPages = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) {
    categoryPages.push(categories.slice(i, i + itemsPerPage));
  }

  // Responsive grid classes
  const gridClasses = () => {
    if (itemsPerPage === 10) return 'grid-rows-2 grid-cols-5'; // Desktop
    if (itemsPerPage === 8) return 'grid-rows-2 grid-cols-4';  // Tablet
    return 'grid-rows-2 grid-cols-3';                          // Mobile
  };

  return (
    <section className="w-full py-8 md:py-12 bg-white relative">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-10 text-gray-800">Shop by Category</h2>
        
        {/* Embla carousel viewport */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Embla container */}
            <div className="flex">
              {/* Each page is a slide */}
              {categoryPages.map((page, pageIndex) => (
                <div key={pageIndex} className="flex-[0_0_100%] min-w-0">
                  <div className={`grid ${gridClasses()} gap-3 md:gap-6 px-1 md:px-2`}>
                    {page.map((category, itemIndex) => (
                      <div
                        key={pageIndex * itemsPerPage + itemIndex}
                        className="flex flex-col items-center justify-center p-3 md:p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group/item"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mb-2 md:mb-4 group-hover/item:bg-primary-50 transition-colors duration-300">
                           <img
                            src={category.icon}
                            alt={category.title}
                            className="w-5 h-5 md:w-8 md:h-8 transition-transform duration-300 group-hover/item:scale-110"
                          />
                        </div>
                        <p className="text-xs md:text-sm font-medium text-center text-gray-700 group-hover/item:text-primary-600 transition-colors duration-300 line-clamp-2">
                          {category.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
           {categoryPages.length > 1 && (
            <>
              <button 
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Previous categories"
              >
                <img src={ChevronLeft} alt="Previous" className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <button 
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-10 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                aria-label="Next categories"
              >
                <img src={ChevronRight} alt="Next" className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Dots indicator */}
        {categoryPages.length > 1 && (
          <div className="flex justify-center mt-4 md:mt-8 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'bg-primary-500 md:w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
