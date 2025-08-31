const OrdersSkeleton = () => {
  // Create multiple skeleton cards to simulate loading orders
  const skeletonCards = Array(3).fill(0);

  return (
    <div className="space-y-4">
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm animate-pulse"
        >
          {/* Shop header skeleton */}
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-8 bg-gray-300 rounded w-16"></div>
              <div className="h-8 bg-gray-300 rounded w-20"></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="h-6 bg-gray-300 rounded-full w-24"></div>
            </div>
          </div>

          {/* Order Products skeleton */}
          <div className="p-4">
            {Array(Math.floor(Math.random() * 2) + 1)
              .fill(0)
              .map((_, productIndex) => (
                <div
                  key={productIndex}
                  className="flex items-center space-x-4 py-3"
                >
                  <div className="w-20 h-20 bg-gray-300 rounded-md flex-shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <div className="h-5 bg-gray-300 rounded w-16 flex-shrink-0"></div>
                </div>
              ))}
          </div>

          {/* Total amount skeleton */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="h-5 bg-gray-300 rounded w-24"></div>
            <div className="h-6 bg-gray-300 rounded w-20"></div>
          </div>

          {/* Action buttons skeleton */}
          <div className="px-4 py-3 border-t border-gray-200 flex justify-center space-x-3">
            <div className="h-10 bg-gray-300 rounded-md w-24"></div>
            <div className="h-10 bg-gray-300 rounded-md w-28"></div>
            <div className="h-10 bg-gray-300 rounded-md w-32"></div>
            <div className="h-10 bg-gray-300 rounded-md w-28"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
