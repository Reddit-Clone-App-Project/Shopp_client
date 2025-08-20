import React from "react";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const PaymentFail = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header>
        <BuyerHeader />
      </header>

      <div className="flex-1 py-30 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Failed
          </h1>

          <p className="text-gray-600 mb-2">
            Unfortunately, your payment could not be processed.
          </p>

          <p className="text-gray-600 mb-8">
            Please check your payment details and try again.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-600 mb-1">Transaction ID</p>
            <p className="font-semibold text-red-700">
              #TXN-{Date.now().toString().slice(-8)}
            </p>
          </div>

          {/* Common Reasons */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">
              Common reasons for payment failure:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Insufficient funds</li>
              <li>• Incorrect card details</li>
              <li>• Card expired or blocked</li>
              <li>• Network connectivity issues</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/cart"
              className="block w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Try Again
            </Link>

            <Link
              to="/"
              className="block w-full bg-white text-purple-600 border border-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Back to Shopping
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Need help? Contact our support team
            </p>
            <p className="text-sm text-purple-600 font-medium">
              support@shopp.com
            </p>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default PaymentFail;
