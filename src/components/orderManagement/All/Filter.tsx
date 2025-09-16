import React from "react";

interface FilterProps {
  filterType: "orderId" | "username" | "product" | "shippingId";
  setFilterType: React.Dispatch<
    React.SetStateAction<"orderId" | "username" | "product" | "shippingId">
  >;
  filterInput: string;
  setFilterInput: React.Dispatch<React.SetStateAction<string>>;
  shippingMethod: "All" | "Express" | "Fast" | "Economical" | "Bulky";
  setShippingMethod: React.Dispatch<
    React.SetStateAction<"All" | "Express" | "Fast" | "Economical" | "Bulky">
  >;
  handleResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  filterType,
  setFilterType,
  filterInput,
  setFilterInput,
  shippingMethod,
  setShippingMethod,
  handleResetFilters,
}) => {
  return (
    <div className="bg-gray-800 px-6 py-4 flex items-center justify-between rounded-lg mt-6">
      <div className="flex items-center gap-4">
        <select
          className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400"
          value={filterType}
          onChange={(e) =>
            setFilterType(
              e.target.value as
                | "orderId"
                | "username"
                | "product"
                | "shippingId"
            )
          }
        >
          <option value="orderId">Order Id</option>
          <option value="username">Username</option>
          <option value="product">Product</option>
          <option value="shippingId">Shipping Id</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
          className="bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400 min-w-[200px]"
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="text-white text-sm">Shipping Method</span>
        <select
          className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-gray-400"
          value={shippingMethod}
          onChange={(e) =>
            setShippingMethod(
              e.target.value as
                | "All"
                | "Express"
                | "Fast"
                | "Economical"
                | "Bulky"
            )
          }
        >
          <option value="All">All</option>
          <option value="Express">Express</option>
          <option value="Fast">Fast</option>
          <option value="Economical">Economical</option>
          <option value="Bulky">Bulky</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        {/* <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer transition-colors">
          Apply Filters
        </button> */}
        <button
          onClick={handleResetFilters}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
