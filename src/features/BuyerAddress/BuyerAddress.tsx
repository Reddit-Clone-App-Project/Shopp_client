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

      <div className="flex justify-between items-center mb-8">
        <h4 className="font-semibold text-xl">My address</h4>
        <button
          className={`p-2 text-white ${
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

      <p className="text-lg">Address</p>
      {status === "loading" ? (
        <BuyerAddressSkeleton />
      ) : addresses ? (
        addresses.map((addr, index) => (
          <div key={index} className="mt-4">
            <div className="flex justify-between">
              <p>
                {addr.full_name} | {addr.phone_number}
              </p>
              <div className="flex gap-4">
                <p
                  className="text-blue-600 underline cursor-pointer"
                  onClick={() => handleShowUpdateForm(addr.id)}
                >
                  Update
                </p>
                {!addr.is_default && (
                  <p
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() => handleRemove(addr.id)}
                  >
                    Remove
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center my-2">
              <p className="text-gray-500">
                {addr.address_line1}, {addr.address_line2}
              </p>
              <button
                className={`px-4 border p-1 rounded ${
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
              <div className="py-1 px-2 border text-purple-600 w-fit">
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
