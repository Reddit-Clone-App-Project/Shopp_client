import React from "react";
import type { FlashSaleItem } from "../types/Item";

const FlashSaleCard = ({ item }: { item: FlashSaleItem }) => {
  const discountedPrice = item.price * (1 - item.discount / 100);

  const formatSoldCount = (sold: number): string => {
    if (sold >= 1000) {
      return `${(sold / 1000).toFixed(1)}k`;
    }
    return sold.toString();
  };

  // I have hard coded the progress percentage for demonstration purposes. Later on, I will
  const progressPercentage = Math.min(
    (item.sold / (item.sold + 200)) * 100,
    100
  );

  return (
    <div className="bg-white rounded-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-transparent hover:border-purple-500">
      <div className="relative">
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/200x200/e2e8f0/e2e8f0?text=Img";
          }}
        />
        {item.isMall && (
          <div className="absolute top-2 left-0 bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-r-sm">
            Mall
          </div>
        )}
        <div
          className="absolute top-0 right-0 bg-yellow-300 text-red-600 text-sm font-bold p-1 flex flex-col items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
          }}
        >
          <span>{item.discount}%</span>
          <span className="text-xs">OFF</span>
        </div>
      </div>
      <div className="p-2 flex flex-col">
        <p className="text-sm text-gray-700 truncate mb-2 h-10 group-hover:text-purple-500">
          {item.name}
        </p>
        <div className="flex items-baseline mb-2">
          <span className="text-purple-600 text-xl font-semibold">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-white text-xs font-bold ml-1">
              SOLD {formatSoldCount(item.sold)}
            </span>
          </div>
          <div
            className="bg-purple-600 h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FlashSaleCard;
