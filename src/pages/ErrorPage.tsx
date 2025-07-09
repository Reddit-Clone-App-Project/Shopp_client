import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center shadow-lg">
            <div className="text-white text-6xl font-bold">!</div>
          </div>
        </div>

        {/* Error Content */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops!
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            We're sorry, but the page you're looking for doesn't exist or has
            been moved. Don't worry, it happens to the best of us!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Go to Home
          </button>

          <button
            onClick={handleGoBack}
            className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-purple-300 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 shadow-md"
          >
            Go Back
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-sm text-gray-400">
          <p>Error Code: 404</p>
          <p className="mt-1">
            If this problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
