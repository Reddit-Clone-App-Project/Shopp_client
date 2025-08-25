import React from "react";
import GenericAvatar from "../assets/generic-avatar.svg";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const BuyerProfile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.profile);

  const hideEmail = (email: string) => {
    const [localPart, domain] = email.split("@");
    const hiddenLocalPart = localPart.slice(0, 2) + "***";
    return `${hiddenLocalPart}@${domain}`;
  };

  const hidePhoneNumber = (phone: string) => {
    return phone.replace(/\d(?=\d{4})/g, "*");
  };

  return (
    <div className="max-w-6xl mx-auto p-10 font-inter">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          My Profile
        </h1>
        <p className="text-gray-600">
          Manage profile information to keep your account secure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-start gap-5">
            <label className="min-w-[120px] text-right text-gray-700 font-medium pt-3">
              Username
            </label>
            <div className="flex-1">
              <input
                type="text"
                id="username"
                value={user?.username || ""}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              />
              <p className="text-sm text-gray-500 mt-2">
                Username can only be changed once
              </p>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <label className="min-w-[120px] text-right text-gray-700 font-medium pt-3">
              Name
            </label>
            <div className="flex-1">
              <input
                type="text"
                id="name"
                value={user?.full_name || ""}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <label className="min-w-[120px] text-right text-gray-700 font-medium">
              Email
            </label>
            <div className="flex-1 flex items-center gap-4">
              <span className="text-gray-900">
                {hideEmail(user?.email || "")}
              </span>
              <button className="text-blue-600 underline hover:text-blue-700 transition-colors">
                Change
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <label className="min-w-[120px] text-right text-gray-700 font-medium">
              Phone number
            </label>
            <div className="flex-1 flex items-center gap-4">
              <span className="text-gray-900">
                {hidePhoneNumber(user?.phone_number || "")}
              </span>
              <button className="text-blue-600 underline hover:text-blue-700 transition-colors">
                Change
              </button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <label className="min-w-[120px] text-right text-gray-700 font-medium">
              Gender
            </label>
            <div className="flex-1 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="male"
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <label
                  htmlFor="gender-male"
                  className="text-gray-700 cursor-pointer"
                >
                  Male
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="female"
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <label
                  htmlFor="gender-female"
                  className="text-gray-700 cursor-pointer"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="gender-other"
                  type="radio"
                  name="gender"
                  value="other"
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <label
                  htmlFor="gender-other"
                  className="text-gray-700 cursor-pointer"
                >
                  Other
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <label className="min-w-[120px] text-right text-gray-700 font-medium pt-3">
              Birthday
            </label>
            <div className="flex-1 flex gap-3">
              <select className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-500 bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e')] bg-no-repeat bg-right-3 bg-center pr-10">
                <option>Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-500 bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e')] bg-no-repeat bg-right-3 bg-center pr-10">
                <option>Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <select className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-500 bg-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e')] bg-no-repeat bg-right-3 bg-center pr-10">
                <option>Year</option>
                {Array.from({ length: 100 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Save
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 p-10">
          <div className="w-30 h-30 rounded-full bg-gradient-to-br from-purple-300 to-purple-500 flex items-center justify-center overflow-hidden">
            <img
              src={user?.profile_img || GenericAvatar}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <button className="bg-white border-2 border-gray-200 hover:border-purple-500 hover:text-purple-600 text-gray-700 px-6 py-3 rounded-lg font-medium transition-all">
            Choose A Photo
          </button>
          <div className="text-center text-sm text-gray-500">
            <p>Maximum file size 1 MB</p>
            <p>Format: .JPEG, .PNG</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;
