/* 
  ! Must read before approve:
  Because I don't know what is the intention of how the Discount work, so I will comment out the code that uses it.
  Therefore the code will not break
*/
import React from "react";
import type { FlashSaleItem, Item } from "../types/Item";

const Item = ({ flashSaleItem, item }: { flashSaleItem: FlashSaleItem | null, item: Item | null }) => { // !The item and the flashSaleItem must be the same type, but for now for some reason I have to separate them
  const discountedPrice = (flashSaleItem?.price ?? 0) * (1 - (flashSaleItem?.discount ?? 0) / 100);
  const prices = item?.variants?.map((variant) => variant.price);
  // Function to check if the item is a Item
  /*
  const isFlashSaleItem = (obj: any): obj is FlashSaleItem => {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return (
        typeof obj.name === 'string' &&
        typeof obj.price === 'number' &&
        typeof obj.image_url === 'string' &&
        typeof obj.discount === 'number' &&
        typeof obj.sold === 'number' &&
        typeof obj.isMall === 'boolean' &&
        // Ensure the fields from 'Item' are NOT present
        !('isFreeShipping' in obj) &&
        !('isBestPrice' in obj)
    );
  }
  */

  const stock_quantity = item?.variants?.reduce((total, variant) => total + variant.stock_quantity, 0);

  const formatSoldCount = (sold: number): string => {
    if (sold >= 1000) {
      return `${(sold / 1000).toFixed(1)}k`;
    }
    return sold.toString();
  };

  // I have hard coded the progress percentage for demonstration purposes.
  let progressPercentage

  if(item && !flashSaleItem){
    progressPercentage = Math.min(
      ((item?.bought ?? 0) / (stock_quantity ?? 1)) * 100,
      100
    );

    return (
    <div className={`bg-white rounded-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-purple-500`}>
      <div className="relative">
        <img
          src={item.promotion_image?.url}
          alt={item.name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/200x200/e2e8f0/e2e8f0?text=Img";
          }}
        />
      </div>
      <div className="p-2 flex flex-col">
        <p className="text-sm text-gray-700 truncate mb-2 h-10 group-hover:text-purple-500">
          {item.name}
        </p>
        <div className="flex items-baseline mb-2">
          <span className="text-purple-600 text-xl font-semibold">
            ${Math.max(...prices ?? [0]).toFixed(2) === Math.min(...prices ?? [0]).toFixed(2) ? Math.max(...prices ?? [0]).toFixed(2) : `${Math.max(...prices ?? [0]).toFixed(2)} - ${Math.min(...prices ?? [0]).toFixed(2)}`}
          </span>
        </div>
      </div>
    </div>
  );
  }else if(flashSaleItem && !item){
    progressPercentage = Math.min(
      (flashSaleItem.sold / flashSaleItem.sold + 200) * 100, // Assuming a max of 1000 sold for demonstration
      100
    );

    return (
    <div className={`bg-white rounded-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200 border border-transparent hover:border-purple-500`}>
      <div className="relative">
        <img
          src={flashSaleItem.image_url}
          alt={flashSaleItem.name}
          className="w-full h-44 object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/200x200/e2e8f0/e2e8f0?text=Img";
          }}
        />
        {flashSaleItem.isMall && (
          <div className="absolute top-2 left-0 bg-indigo-700 text-white text-xs px-2 py-0.5 rounded-r-sm">
            Mall
          </div>
        )}
        {flashSaleItem.discount > 0 &&<div
          className="absolute top-0 right-0 bg-yellow-300 text-red-600 text-sm font-bold p-1 flex flex-col items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
          }}
        >
          <span>{flashSaleItem.discount}%</span>
          <span className="text-xs">OFF</span>
        </div>}
      </div>
      <div className="p-2 flex flex-col">
        <p className="text-sm text-gray-700 truncate mb-2 h-10 group-hover:text-purple-500">
          {flashSaleItem.name}
        </p>
        <div className="flex items-baseline mb-2">
          <span className="text-purple-600 text-xl font-semibold">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-white text-xs font-bold ml-1">
              SOLD {formatSoldCount(flashSaleItem.sold)}
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
  }

  /*
  return (
    <div className={`bg-white rounded-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-200 border ${isFlashSaleItem(item) ? 'border-transparent' : 'border-gray-200'} hover:border-purple-500`}>
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
        {item.discount > 0 &&<div
          className="absolute top-0 right-0 bg-yellow-300 text-red-600 text-sm font-bold p-1 flex flex-col items-center justify-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
          }}
        >
          <span>{item.discount}%</span>
          <span className="text-xs">OFF</span>
        </div>}
      </div>
      <div className="p-2 flex flex-col">
        <p className="text-sm text-gray-700 truncate mb-2 h-10 group-hover:text-purple-500">
          {item.name}
        </p>
        <div className="flex items-center justify-start gap-2">
          { "isFreeShipping" in item && item.isFreeShipping && (<div className="bg-teal-400 text-white text-semibold px-1">Free ship</div>) }
          { "isBestPrice" in item && item.isBestPrice && (<div className="text-purple-600 text-semibold border border-purple-600 px-1">Best seller</div>) }
        </div>
        <div className="flex items-baseline mb-2">
          <span className="text-purple-600 text-xl font-semibold">
            ${discountedPrice.toFixed(2)}
          </span>
        </div>
        {isFlashSaleItem(item) && <div className="w-full bg-purple-200 rounded-full h-4 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-white text-xs font-bold ml-1">
              SOLD {formatSoldCount(item.sold)}
            </span>
          </div>
          <div
            className="bg-purple-600 h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>}
      </div>
    </div>
  );
  */
};

export default Item;
