import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchWishlistDetail,
  deleteProductFromWishlist,
  WishlistProduct,
} from "../features/Wishlist/WishlistDetailSlice";

// SVG
import Trash from "../assets/trash.svg";

const WishlistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { wishlist, status, error } = useSelector(
    (state: RootState) => state.wishlistDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchWishlistDetail(parseInt(id)));
    }
  }, [dispatch, id]);

  const handleRemoveProduct = (productId: number) => {
    if (
      wishlist &&
      window.confirm(
        "Are you sure you want to remove this product from your wishlist?"
      )
    ) {
      dispatch(
        deleteProductFromWishlist({
          wishlistId: wishlist.wishlist_id,
          productId,
        })
      );
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return "N/A";
    return `$${price.toFixed(2)}`;
  };

  const getPriceDisplay = (priceRange: {
    min_price: number | null;
    max_price: number | null;
  }) => {
    if (priceRange.min_price === null && priceRange.max_price === null) {
      return "Price not available";
    }

    if (priceRange.min_price === priceRange.max_price) {
      return formatPrice(priceRange.min_price);
    }

    return `${formatPrice(priceRange.min_price)} - ${formatPrice(
      priceRange.max_price
    )}`;
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-600 text-center">
          <p>Error loading wishlist: {error}</p>
          <button
            onClick={() => id && dispatch(fetchWishlistDetail(parseInt(id)))}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!wishlist) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-600">
          <p>Wishlist not found</p>
          <Link
            to="/wishlist"
            className="mt-2 inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Back to Wishlists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
          <Link
            to="/wishlist"
            className="text-purple-600 hover:text-purple-700 text-xs sm:text-sm font-medium"
          >
            ← Back to Wishlists
          </Link>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {wishlist.wishlist_name}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            {wishlist.products.length}{" "}
            {wishlist.products.length === 1 ? "item" : "items"} in this wishlist
          </p>
        </div>
      </div>

      {wishlist.products.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12 sm:h-16 sm:w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-sm sm:text-base text-gray-500 mb-4 px-4">
            Start adding products you love to this wishlist!
          </p>
          <Link
            to="/"
            className="inline-block px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.products.map((product: WishlistProduct) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                  {product.promotion_image ? (
                    <img
                      src={product.promotion_image.url}
                      alt={product.promotion_image.alt_text || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="absolute top-2 right-2 p-1 sm:p-1.5 bg-white rounded-full shadow-md hover:bg-red-50 hover:shadow-lg transition-all"
                  title="Remove from wishlist"
                >
                  <img
                    src={Trash}
                    alt="Remove"
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <h3
                  className="text-sm sm:text-lg font-semibold text-gray-900 mb-2 overflow-hidden leading-tight"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.name}
                </h3>

                <div className="mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-bold text-purple-600">
                    {getPriceDisplay(product.price_range)}
                  </span>
                </div>

                <div>
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full px-2 sm:px-3 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors text-xs sm:text-sm font-medium"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistDetail;
