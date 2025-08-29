import React, { useState } from "react";
import { toast } from "react-toastify";
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteAccount } from "../features/UserProfile/UserProfileSlice";
import { API } from "../api";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

interface BuyerPrivacySettingsProps {
  onClose?: () => void;
}

const BuyerPrivacySettings: React.FC<BuyerPrivacySettingsProps> = ({
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, user } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();

  // Handle close action - either call onClose prop or navigate back
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/me/my-account/profile");
    }
  };

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Account deletion states
  const [confirmationText, setConfirmationText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const requiredConfirmationText = "DELETE MY ACCOUNT";

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

  const handleAccountDeletion = async () => {
    if (confirmationText !== requiredConfirmationText) {
      toast.error(
        `Please type "${requiredConfirmationText}" exactly to confirm.`
      );
      return;
    }

    try {
      setIsDeleting(true);
      await dispatch(handleDeleteAccount()).unwrap();
      toast.success("Your account has been permanently deleted.");
      // Redirect to login or home page after successful deletion
      window.location.href = "/login";
    } catch (error: any) {
      toast.error(error || "Failed to delete account.");
      setIsDeleting(false);
    }
  };

  // Account Deletion UI (after OTP verification)
  if (isVerified) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 14.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Delete Account
          </h3>
          <p className="text-gray-600 mb-6">
            This action cannot be undone. This will permanently delete your
            account and remove all your data.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 14.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div className="text-sm text-red-800">
              <p className="font-medium mb-2">What will be deleted:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Your profile information and settings</li>
                <li>Order history and purchase records</li>
                <li>Saved addresses and payment methods</li>
                <li>Reviews and ratings you've given</li>
                <li>Wishlist and cart items</li>
                <li>All account preferences</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account to be deleted:{" "}
              <span className="font-semibold">{user?.email}</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type{" "}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded text-red-600 font-bold">
                {requiredConfirmationText}
              </span>{" "}
              to confirm:
            </label>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={`Type "${requiredConfirmationText}" here`}
              className={classNames(
                "w-full px-4 py-3 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all font-mono",
                {
                  "border-green-600 focus:border-green-600":
                    confirmationText === requiredConfirmationText,
                  "border-red-500 focus:border-red-500":
                    confirmationText.length > 0 &&
                    confirmationText !== requiredConfirmationText,
                  "border-gray-200 focus:border-red-500":
                    confirmationText.length === 0,
                }
              )}
            />
          </div>

          {confirmationText.length > 0 && (
            <div className="text-sm">
              <p
                className={classNames("font-medium", {
                  "text-green-600":
                    confirmationText === requiredConfirmationText,
                  "text-red-500": confirmationText !== requiredConfirmationText,
                })}
              >
                {confirmationText === requiredConfirmationText ? (
                  <span>
                    <span className="mr-2">✓</span>Confirmation text matches
                  </span>
                ) : (
                  <span>
                    <span className="mr-2">✗</span>Confirmation text does not
                    match
                  </span>
                )}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAccountDeletion}
              disabled={
                isDeleting ||
                status === "loading" ||
                confirmationText !== requiredConfirmationText
              }
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              {isDeleting || status === "loading"
                ? "Deleting Account..."
                : "Permanently Delete Account"}
            </button>
            <button
              onClick={handleClose}
              disabled={isDeleting || status === "loading"}
              className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // OTP Verification UI (similar to BuyerChangePassword)
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
            ? "We'll send an OTP to your registered email to verify your identity before proceeding with account deletion."
            : "Enter the 6-digit code sent to your email address."}
        </p>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 14.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Warning:</p>
                <p>
                  You are about to permanently delete your account. This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleRequestOtp}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Send OTP to My Email
          </button>
          <button
            onClick={handleClose}
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

export default BuyerPrivacySettings;
