import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchVouchersForBuyer } from "../features/Vouchers/VouchersSlice";

// SVG
import LeftChevron from "../assets/HomePage/Category/chevron-left.svg";
import RightChevron from "../assets/HomePage/Category/chevron-right.svg";

interface Voucher {
  id: number;
  name: string;
  discount_type: "percentage" | "fixed";
  discount_value: string;
  start_at: Date;
  end_at: Date;
  status: "active" | "paused" | "ended" | "upcoming";
  description: string;
  discount_where: string;
  quantity: number;
}

const Vouchers = () => {
  const dispatch: AppDispatch = useDispatch();
  const { vouchers, status, error } = useSelector(
    (state: RootState) => state.vouchers
  );

  const [currentPage, setCurrentPage] = useState(1);
  const vouchersPerPage = 6;
  const totalPages = Math.ceil(vouchers.length / vouchersPerPage);

  useEffect(() => {
    // Fetch all vouchers initially (we'll handle pagination client-side)
    dispatch(fetchVouchersForBuyer({ limit: 100, offset: 0 }));
  }, [dispatch]);

  // Get current vouchers for the page
  const indexOfLastVoucher = currentPage * vouchersPerPage;
  const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
  const currentVouchers = vouchers.slice(
    indexOfFirstVoucher,
    indexOfLastVoucher
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "ended":
        return "bg-red-100 text-red-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        <div className="text-red-600">
          <p>Error loading vouchers: {error}</p>
          <button
            onClick={() =>
              dispatch(fetchVouchersForBuyer({ limit: 100, offset: 0 }))
            }
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          My Vouchers
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage and use your available vouchers
        </p>
      </div>

      {vouchers.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            No vouchers available
          </h3>
          <p className="text-sm sm:text-base text-gray-500 px-4">
            You don't have any vouchers yet. Check back later for exclusive
            deals!
          </p>
        </div>
      ) : (
        <>
          {/* Vouchers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {currentVouchers.map((voucher: Voucher) => (
              <div
                key={voucher.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {voucher.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {voucher.discount_where}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        voucher.status
                      )}`}
                    >
                      {voucher.status.charAt(0).toUpperCase() +
                        voucher.status.slice(1)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">
                      {voucher.discount_type === "percentage"
                        ? `${voucher.discount_value}% OFF`
                        : `$${voucher.discount_value} OFF`}
                    </div>
                    <p className="text-sm text-gray-600">
                      {voucher.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div>
                      <span className="block">Valid from</span>
                      <span className="font-medium">
                        {formatDate(voucher.start_at)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block">Valid until</span>
                      <span className="font-medium">
                        {formatDate(voucher.end_at)}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    Quantity: {voucher.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <img src={LeftChevron} alt="Previous" className="w-5 h-5" />
              </button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageClick(pageNumber)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <img src={RightChevron} alt="Next" className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Page Info */}
          {totalPages > 1 && (
            <div className="text-center mt-4 text-sm text-gray-600">
              Showing {indexOfFirstVoucher + 1} to{" "}
              {Math.min(indexOfLastVoucher, vouchers.length)} of{" "}
              {vouchers.length} vouchers
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Vouchers;
