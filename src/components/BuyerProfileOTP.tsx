import React, { useState } from "react";
import { toast } from "react-toastify";
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleChangePhoneNumber } from "../features/UserProfile/UserProfileSlice";
import { API } from "../api";

interface BuyerProfileOTPProps {
  onClose: () => void;
}

const BuyerProfileOTP: React.FC<BuyerProfileOTPProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.profile);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleRequestOtp = async () => {
    try {
      await API.post("http://localhost:3000/email-otp/request-otp");
      setOtpSent(true);
      toast.success("An OTP has been sent to your email.");
    } catch (error) {
      toast.error("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await API.post(
        "http://localhost:3000/email-otp/verify-otp",
        { otp }
      );
      if (response.data.verified) {
        setIsVerified(true);
        toast.success("Your account has been successfully verified!");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Verification failed.");
    }
  };

  const handlePhoneNumberChange = async () => {
    if (!newPhoneNumber.trim()) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      console.log(newPhoneNumber);
      await dispatch(handleChangePhoneNumber(newPhoneNumber));
      toast.success("Phone number updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update phone number.");
    }
  };

  if (isVerified) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Verification Complete
          </h3>
          <p className="text-gray-600 mb-6">
            Enter your new phone number below
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="tel"
            value={newPhoneNumber}
            onChange={(e) => setNewPhoneNumber(e.target.value)}
            placeholder="Enter new phone number"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
          <div className="flex gap-3">
            <button
              onClick={handlePhoneNumberChange}
              disabled={status === "loading" || !newPhoneNumber.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              {status === "loading" ? "Updating..." : "Confirm"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Verify Your Account
        </h3>
        <p className="text-gray-600">
          {!otpSent
            ? "We'll send an OTP to your registered email to verify your identity before changing your phone number."
            : "Enter the 6-digit code sent to your email address."}
        </p>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <button
            onClick={handleRequestOtp}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Send OTP to My Email
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-center text-lg font-mono tracking-widest focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          />
          <div className="flex gap-3">
            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Verify OTP
            </button>
            <button
              onClick={() => {
                setOtpSent(false);
                setOtp("");
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Back
            </button>
          </div>
          <button
            onClick={handleRequestOtp}
            className="w-full text-purple-600 hover:text-purple-700 text-sm underline transition-colors"
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyerProfileOTP;
