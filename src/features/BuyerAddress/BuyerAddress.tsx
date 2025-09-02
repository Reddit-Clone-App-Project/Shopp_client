import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchBuyerAddress,
  postAnAddress,
  putAnAddress,
  removeAnAddress,
  setAddressDefault,
} from "./BuyerAddressSlice";
import BuyerAddressForm from "./BuyerAddressForm";
import BuyerAddressSkeleton from "./BuyerAddressSkeleton";

import { PostBuyerAddress } from "../../types/BuyerAddress";
import { toast } from "react-toastify";
import BuyerAddressUpdateForm from "./BuyerAddressUpdateForm";
import { UpdateBuyerAddress } from "../../types/BuyerAddress";

const BuyerAddress: React.FC = () => {
  const { addresses, status } = useSelector(
    (state: RootState) => state.buyerAddress
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updateAddressId, setUpdateAddressId] = useState<number | null>(null);

  const handleAddAddress = (addressData: PostBuyerAddress) => {
    dispatch(postAnAddress(addressData))
      .unwrap()
      .then(() => {
        setShowAddressForm(false);
        toast.success("Address added successfully");
      })
      .catch((error) => {
        console.error("Failed to add address:", error);
        toast.error("Failed to add address");
      });
  };

  const handleUpdateAddress = (
    addressId: number,
    updatedData: UpdateBuyerAddress
  ) => {
    dispatch(putAnAddress({ id: addressId, addressData: updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Address updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update address:", error);
        toast.error("Failed to update address");
      });
  };

  const handleRemove = (addressId: number) => {
    dispatch(removeAnAddress(addressId))
      .unwrap()
      .then(() => {
        toast.success("Address removed successfully");
      })
      .catch((error) => {
        console.error("Failed to remove address:", error);
        toast.error("Failed to remove address");
      });
  };

  const handleSetDefault = (addressId: number) => {
    dispatch(setAddressDefault(addressId))
      .unwrap()
      .then(() => {
        toast.success("Address set as default successfully");
      })
      .catch((error) => {
        console.error("Failed to set address as default:", error);
        toast.error("Failed to set address as default");
      });
  };

  const handleShowAddressForm = () => {
    setShowAddressForm(true);
  };

  const handleShowUpdateForm = (addressId: number) => {
    setUpdateAddressId(addressId);
    setShowUpdateForm(true);
  };

  useEffect(() => {
    if (status === "idle" || !addresses) {
      // Fetch the buyer address when the component mounts
      const promise = dispatch(fetchBuyerAddress());

      return () => {
        promise.abort();
      };
    }
  }, []);

  return (
    <div>
      {showAddressForm && (
        <BuyerAddressForm
          onAddAddress={handleAddAddress}
          onCancel={() => setShowAddressForm(false)}
        />
      )}

      {showUpdateForm && (
        <BuyerAddressUpdateForm
          addressId={updateAddressId}
          onUpdateAddress={handleUpdateAddress}
          onCancel={() => setShowUpdateForm(false)}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-3 sm:gap-0">
        <h4 className="font-semibold text-lg sm:text-xl">My address</h4>
        <button
          className={`w-full sm:w-auto px-3 sm:px-4 py-2 text-white text-sm sm:text-base rounded ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
          onClick={handleShowAddressForm}
          disabled={status === "loading"}
        >
          + Add a new address
        </button>
      </div>

      <p className="text-base sm:text-lg mb-3">Address</p>
      {status === "loading" ? (
        <BuyerAddressSkeleton />
      ) : addresses ? (
        addresses.map((addr, index) => (
          <div
            key={index}
            className="mt-4 border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
              <p className="text-sm sm:text-base font-medium">
                {addr.full_name} | {addr.phone_number}
              </p>
              <div className="flex gap-3 sm:gap-4">
                <p
                  className="text-blue-600 underline cursor-pointer text-sm sm:text-base hover:text-blue-800"
                  onClick={() => handleShowUpdateForm(addr.id)}
                >
                  Update
                </p>
                {!addr.is_default && (
                  <p
                    className="text-blue-600 underline cursor-pointer text-sm sm:text-base hover:text-blue-800"
                    onClick={() => handleRemove(addr.id)}
                  >
                    Remove
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-2 gap-2 sm:gap-0">
              <p className="text-gray-500 text-sm sm:text-base">
                {addr.address_line1}, {addr.address_line2}
              </p>
              <button
                className={`w-full sm:w-auto px-3 sm:px-4 py-1 sm:py-2 border rounded text-sm sm:text-base ${
                  addr.is_default
                    ? "text-gray-500 border-gray-500 cursor-not-allowed"
                    : "cursor-pointer hover:bg-gray-50"
                }`}
                onClick={() => handleSetDefault(addr.id)}
                disabled={addr.is_default}
              >
                Set as default location
              </button>
            </div>
            {addr.is_default && (
              <div className="py-1 px-2 border text-purple-600 w-fit text-sm sm:text-base rounded">
                Default Location
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No address found</p>
      )}
    </div>
  );
};

export default BuyerAddress;
