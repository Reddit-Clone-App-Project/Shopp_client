const OrderDetailSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="h-8 bg-gray-300 rounded-full w-24"></div>
      </div>

      {/* Order Info Card Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <div className="h-6 bg-gray-300 rounded w-48"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-5 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-28"></div>
            <div className="h-5 bg-gray-300 rounded w-36"></div>
          </div>
        </div>
      </div>

      {/* Store Info Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div className="h-5 bg-gray-300 rounded w-40"></div>
        </div>
      </div>

      {/* Products Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
        <div className="space-y-4">
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-b-0"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                      {Array(Math.floor(Math.random() * 2) + 1)
                        .fill(0)
                        .map((_, variantIndex) => (
                          <div
                            key={variantIndex}
                            className="flex justify-between items-center"
                          >
                            <div className="space-y-1">
                              <div className="h-4 bg-gray-300 rounded w-32"></div>
                              <div className="h-3 bg-gray-300 rounded w-16"></div>
                            </div>
                            <div className="h-4 bg-gray-300 rounded w-20"></div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Shipping Address Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-48"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-56"></div>
          <div className="h-4 bg-gray-300 rounded w-40"></div>
        </div>
      </div>

      {/* Order Timeline Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="h-6 bg-gray-300 rounded w-32 mb-4"></div>
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-gray-300 rounded-full mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-36"></div>
                  <div className="h-3 bg-gray-300 rounded w-28"></div>
                  {Math.random() > 0.5 && (
                    <div className="h-3 bg-gray-300 rounded w-44"></div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Total Amount Skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-32"></div>
          <div className="h-7 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
