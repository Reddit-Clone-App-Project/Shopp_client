import React from "react";

const Filter = () => {
  return (
    <div className="bg-gray-800 px-6 py-4 flex items-center justify-between rounded-lg mt-6">
      <div className="flex items-center gap-4">
        <select className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400">
            <option value="orderId">Order Id</option>
            <option value="username">Username</option>
            <option value="product">Product</option>
            <option value="shippingId">Shipping Id</option>
            <option value="refundId">Refund Id</option>
        </select>

        <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400 min-w-[200px]"
        />
      </div>

    <div className="flex items-center gap-4">
      <span className="text-white text-sm">Shipping Method</span>
      <select className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400">
        <option value="">All</option>
        <option value="express">Express</option>
        <option value="fast">Fast</option>
        <option value="economical">Economical</option>
        <option value="bulky">Bulky</option>
      </select>
    </div>

      <div className="flex items-center gap-4">
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer transition-colors">
          Apply Filters
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer transition-colors">
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
