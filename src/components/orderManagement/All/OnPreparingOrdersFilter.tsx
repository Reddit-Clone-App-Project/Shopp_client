import React from "react";

// SVG
import Sorting from "../../../assets/Sorting.svg";
import BulkShipment from "../../../assets/BulkShipment.svg";
import { Link } from "react-router-dom";

const OnPreparingOrdersFilter = () => {
  return (
    <div className="flex items-center gap-6">
      {/* AI start here */}
      <div className="flex items-center gap-2 bg-gray-700 py-2 px-4 hover:bg-gray-800 cursor-pointer transition-colors duration-200">
        <img src={Sorting} alt="Sorting" className="w-4 h-4" />
        <select className="bg-transparent text-white border-none outline-none cursor-pointer min-w-0 flex-1">
          <option value="PDLS" className="bg-gray-800 text-white">
            Pickup date(Longest - Shortest)
          </option>
          <option value="PDSL" className="bg-gray-800 text-white">
            Pickup date(Shortest - Longest)
          </option>
          <option value="ODLS" className="bg-gray-800 text-white">
            Order date(Longest - Shortest)
          </option>
          <option value="ODSL" className="bg-gray-800 text-white">
            Order date(Shortest - Longest)
          </option>
          <option value="CDLS" className="bg-gray-800 text-white">
            Order confirm date(Longest - Shortest)
          </option>
          <option value="CDSL" className="bg-gray-800 text-white">
            Order confirm date(Shortest - Longest)
          </option>
        </select>
      </div>
      {/* AI end here */}

      <Link
        to="/seller/order/bulk"
        className="flex items-center bg-purple-600 py-2 px-4 hover:bg-purple-700"
      >
        <img src={BulkShipment} alt="Bulk Shipment" className="inline mr-2" />
        <span>View Bulk Shipment</span>
      </Link>
    </div>
  );
};

export default OnPreparingOrdersFilter;
