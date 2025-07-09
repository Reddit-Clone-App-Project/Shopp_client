import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { FlashSaleItem } from "../../types/Item";
import FlashSaleCard from "../../components/Item";
import CountdownTimer from "../../features/CountdownTimer/CountdownTimer";
import { Link } from "react-router-dom";

// SVG
import ChevronLeft from "../../assets/HomePage/Category/chevron-left.svg";
import ChevronRight from "../../assets/HomePage/Category/chevron-right.svg";

const FlashSale = () => {
  const flashSaleItems: FlashSaleItem[] = [
    {
      name: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
      price: 399.99,
      image_url:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6505/6505920_sd.jpg",
      discount: 25,
      sold: 134,
      isMall: true,
    },
    {
      name: "Apple iPhone 15 Pro Max (256GB) - Natural Titanium",
      price: 1199.0,
      image_url:
        "https://store.storeimages.cdn-apple.com/2023/as-og-iphone/iphone-15-pro-max-natural-titanium-og.png",
      discount: 15,
      sold: 87,
      isMall: false,
    },
    {
      name: "Samsung 65-Inch Class QLED 4K Smart TV",
      price: 1299.99,
      image_url:
        "https://image-us.samsung.com/SamsungUS/tv/tvs/qn65q80cafxza/01_C1_Q80C_Black_RGB_static.jpg",
      discount: 30,
      sold: 210,
      isMall: true,
    },
    {
      name: "Nike Air Zoom Pegasus 40 Men's Running Shoes",
      price: 130.0,
      image_url:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/47b947a9-2921-4d45-8183-c4b219a8964a/air-zoom-pegasus-40-mens-road-running-shoes-Xn4L4V.png",
      discount: 20,
      sold: 155,
      isMall: false,
    },
    {
      name: "Amazon Echo (5th Gen) - Glacier White",
      price: 49.99,
      image_url:
        "https://m.media-amazon.com/images/I/6189KDuYhMS._AC_SL1000_.jpg",
      discount: 40,
      sold: 302,
      isMall: true,
    },
    {
      name: "LG 27-Inch UltraGear QHD 165Hz Gaming Monitor",
      price: 349.99,
      image_url:
        "https://www.lg.com/us/images/monitors/md07515106/gallery/D1.jpg",
      discount: 25,
      sold: 98,
      isMall: false,
    },
    {
      name: "Bose QuietComfort Earbuds II - Triple Black",
      price: 249.0,
      image_url:
        "https://assets.bose.com/content/dam/Bose_DAM/Global/ProductImages/QuietComfort_Earbuds_II/pdp/EC/qc_earbuds_ii_EC_hero_triple_black_01_RF.psd/jcr:content/renditions/cq5dam.web.1280.1280.psd",
      discount: 10,
      sold: 112,
      isMall: true,
    },
    {
      name: "KitchenAid Artisan Series 5 Quart Tilt-Head Stand Mixer",
      price: 449.99,
      image_url:
        "https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/202346/0001/kitchenaid-artisan-series-5-quart-tilt-head-stand-mixer-o.jpg",
      discount: 15,
      sold: 65,
      isMall: false,
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    // Set the number of slides visible at once for different screen sizes
    breakpoints: {
      "(min-width: 1024px)": { slidesToScroll: 4 },
      "(min-width: 768px)": { slidesToScroll: 3 },
      "(min-width: 640px)": { slidesToScroll: 2 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      if (emblaApi) {
        emblaApi.off("select", onSelect);
        emblaApi.off("reInit", onSelect);
      }
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <div className="flex items-center flex-wrap">
          <h2 className="text-xl font-bold text-purple-600 uppercase tracking-wider">
            Flash Sale
          </h2>
          <div className="ml-4">
            <CountdownTimer />
          </div>
        </div>
        <Link
          to="/flash-sale"
          className="text-purple-600 hover:underline cursor-pointer whitespace-nowrap text-sm sm:text-base"
        >
          See All
        </Link>
      </div>

      <div className="relative group">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex -ml-2">
            {flashSaleItems.map((item) => (
              <div
                key={item.name}
                className="embla__slide flex-[0_0_auto] w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-0 pl-2"
              >
                <FlashSaleCard flashSaleItem={item} item={null} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-5 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-default"
          aria-label="Previous flash sale item"
        >
          <img
            src={ChevronLeft}
            alt="Previous"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-5 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-default"
          aria-label="Next flash sale item"
        >
          <img
            src={ChevronRight}
            alt="Next"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default FlashSale;
