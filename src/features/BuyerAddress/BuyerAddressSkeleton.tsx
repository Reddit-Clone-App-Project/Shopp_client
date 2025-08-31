import React from "react";

const BuyerAddressSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Simulate 3 address cards loading */}
      {[1, 2, 3].map((index) => (
        <div key={index} className="mt-4">
          <div className="flex justify-between">
            {/* Name and phone number skeleton */}
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-1"></div>
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </div>
            {/* Action buttons skeleton */}
            <div className="flex gap-4">
              <div className="h-4 bg-gray-200 rounded w-14"></div>
              {index !== 1 && ( // Don't show remove for "default" address
                <div className="h-4 bg-gray-200 rounded w-14"></div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center my-2">
            {/* Address line skeleton - varying widths for realism */}
            <div
              className={`h-4 bg-gray-200 rounded ${
                index === 1 ? "w-80" : index === 2 ? "w-72" : "w-64"
              }`}
            ></div>
            {/* Set as default button skeleton */}
            <div
              className={`h-8 bg-gray-200 rounded px-4 py-1 ${
                index === 1 ? "w-32" : "w-36"
              }`}
            ></div>
          </div>

          {/* Default location badge skeleton (show for first item to simulate default) */}
          {index === 1 && (
            <div className="h-7 bg-gray-200 rounded w-28 mt-2"></div>
          )}

          {/* Add some spacing between skeleton items */}
          {index < 3 && <div className="mb-6"></div>}
        </div>
      ))}
    </div>
  );
};

export default BuyerAddressSkeleton;
