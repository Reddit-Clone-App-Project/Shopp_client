import React from "react";
import BuyerHeader from "../../features/BuyerHeader/BuyerHeader";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header>
        <BuyerHeader />
      </header>

      <div className="flex-1 py-30 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>

          <p className="text-gray-600 mb-8">
            Your order has been confirmed and is being processed.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Continue Shopping
            </Link>

            <Link
              to="/me/orders"
              className="block w-full bg-white text-purple-600 border border-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              View Orders
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your registered email
              address.
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

export default PaymentSuccess;
