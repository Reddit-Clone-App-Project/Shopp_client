import React, { useState } from "react";
import { toast } from "react-toastify";
import { RootState, AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { handleChangePassword } from "../features/UserProfile/UserProfileSlice";
import { API } from "../api";
import classNames from "classnames";

interface BuyerChangePasswordProps {
  onClose: () => void;
}

const BuyerChangePassword: React.FC<BuyerChangePasswordProps> = ({
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.profile);

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Password States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Password validation (matching RegisterForm standards)
  const hasMinLength = newPassword.length > 7;
  const hasMaxLength = newPassword.length < 31;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword);
  const isEqual = confirmPassword === newPassword;
  const isPasswordValid =
    hasMinLength &&
    hasMaxLength &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar;

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

  const handlePasswordChange = async () => {
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (!isPasswordValid) {
      toast.error("Password must meet all security requirements.");
      return;
    }

    try {
      await dispatch(
        handleChangePassword({ oldPassword, newPassword })
      );
      toast.success("Password changed successfully!");
      onClose();
    } catch (error: any) {
      toast.error(error || "Failed to change password.");
    }
  };

  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case "old":
        setShowOldPassword(!showOldPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };

  // Password Change UI (after OTP verification)
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Change Password
          </h3>
          <p className="text-gray-600 mb-6">
            Enter your current password and new password below
          </p>
        </div>

        <div className="space-y-4">
          {/* Old Password */}
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current password"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("old")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showOldPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (8-30 characters)"
              className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showNewPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Password strength bar */}
          {newPassword.length > 0 && (
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Password strength</span>
                <span>
                  {
                    [
                      hasMinLength && hasMaxLength,
                      hasLowercase && hasUppercase,
                      hasNumber,
                      hasSpecialChar,
                    ].filter(Boolean).length
                  }
                  /4 requirements met
                </span>
              </div>
              <div className="flex space-x-1">
                <div
                  className={`h-2 flex-1 rounded ${
                    hasMinLength && hasMaxLength
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`h-2 flex-1 rounded ${
                    hasLowercase && hasUppercase
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`h-2 flex-1 rounded ${
                    hasNumber ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`h-2 flex-1 rounded ${
                    hasSpecialChar ? "bg-green-500" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>
          )}

          {/* Confirm New Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className={classNames(
                "w-full px-4 py-3 pr-12 border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all",
                {
                  "border-green-600 focus:border-green-600":
                    isEqual && confirmPassword.length > 0,
                  "border-red-500 focus:border-red-500":
                    !isEqual && confirmPassword.length > 0,
                  "border-gray-200 focus:border-purple-500":
                    confirmPassword.length === 0,
                }
              )}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Password validation requirements */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Password requirements:
            </p>
            <ul className="ml-3 space-y-1 font-light text-xs">
              <li
                className={classNames("flex items-center", {
                  "text-green-600": hasMinLength && hasMaxLength,
                  "text-red-500":
                    newPassword.length > 0 && !(hasMinLength && hasMaxLength),
                  "text-gray-500": newPassword.length === 0,
                })}
              >
                <span className="mr-2 font-medium">
                  {hasMinLength && hasMaxLength ? "✓" : "✗"}
                </span>
                Contain 8 to 30 characters
                {newPassword.length > 0 && (
                  <span className="ml-auto text-xs">
                    ({newPassword.length}/30)
                  </span>
                )}
              </li>
              <li
                className={classNames("flex items-center", {
                  "text-green-600": hasLowercase && hasUppercase,
                  "text-red-500":
                    newPassword.length > 0 && !(hasLowercase && hasUppercase),
                  "text-gray-500": newPassword.length === 0,
                })}
              >
                <span className="mr-2 font-medium">
                  {hasLowercase && hasUppercase ? "✓" : "✗"}
                </span>
                Contain both lower and uppercase letters
              </li>
              <li
                className={classNames("flex items-center", {
                  "text-green-600": hasNumber,
                  "text-red-500": newPassword.length > 0 && !hasNumber,
                  "text-gray-500": newPassword.length === 0,
                })}
              >
                <span className="mr-2 font-medium">
                  {hasNumber ? "✓" : "✗"}
                </span>
                Contain 1 number
              </li>
              <li
                className={classNames("flex items-center", {
                  "text-green-600": hasSpecialChar,
                  "text-red-500": newPassword.length > 0 && !hasSpecialChar,
                  "text-gray-500": newPassword.length === 0,
                })}
              >
                <span className="mr-2 font-medium">
                  {hasSpecialChar ? "✓" : "✗"}
                </span>
                Contain 1 special character (!@#$%^&*()_+-=[]{`{}`}|;:,.?)
              </li>
            </ul>
          </div>

          {/* Password match indicator */}
          <div className="mb-4">
            <div className="font-light text-sm h-6">
              <p
                className={classNames({
                  invisible: confirmPassword.length === 0,
                  "text-green-600 font-medium":
                    isEqual && confirmPassword.length > 0,
                  "text-red-500 font-medium":
                    !isEqual && confirmPassword.length > 0,
                })}
              >
                <span className="mr-2">{isEqual ? "✓" : "✗"}</span>
                {isEqual ? "Passwords match" : "Passwords do not match"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handlePasswordChange}
              disabled={
                status === "loading" ||
                !oldPassword.trim() ||
                !newPassword.trim() ||
                !confirmPassword.trim() ||
                !hasLowercase ||
                !hasMaxLength ||
                !hasMinLength ||
                !hasSpecialChar ||
                !hasUppercase ||
                !hasNumber ||
                !isEqual
              }
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors"
            >
              {status === "loading" ? "Changing..." : "Change Password"}
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

  // OTP Verification UI (similar to BuyerProfileOTP)
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
            ? "We'll send an OTP to your registered email to verify your identity before changing your password."
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

export default BuyerChangePassword;
