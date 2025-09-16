import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "./All/Filter";
import OrderStatusFilter from "./All/OrderStatusFilter";
import OnPreparingOrdersFilter from "./All/OnPreparingOrdersFilter";
import { AppDispatch, RootState } from "../../redux/store";

// SVG
import Database from "../../assets/Database.svg";
import { fetchAllStoreOrders } from "../../features/StoreOrders/StoreOrdersSlice";

const AllOrderSection = () => {
  const { orders, status } = useSelector(
    (state: RootState) => state.storeOrders
  );
  console.log(orders);
  const storeId = useSelector(
    (state: RootState) => state.sellerStore.store?.id
  );
  const dispatch = useDispatch<AppDispatch>();

  const [nav, setNav] = useState<
    | "All"
    | "Waiting for confirmation"
    | "On preparing"
    | "On delivering"
    | "Deliver successful"
    | "Return/Refund"
  >("All");
  const [orderStatus, setOrderStatus] = useState<
    "All" | "Not processed yet" | "Processed"
  >("All");

  const [filterType, setFilterType] = useState<
    "orderId" | "username" | "product" | "shippingId"
  >("orderId"); // removed refundId
  const [filterInput, setFilterInput] = useState<string>("");
  const [shippingMethod, setShippingMethod] = useState<
    "All" | "Express" | "Fast" | "Economical" | "Bulky"
  >("All");

  const handleExport = () => {};

  const handleExportPrint = () => {};

  const handleTransferNavToOrderStatus = (
    n:
      | "All"
      | "Waiting for confirmation"
      | "On preparing"
      | "On delivering"
      | "Deliver successful"
      | "Return/Refund"
  ) => {
    switch (n) {
      case "All":
        return ["All"];
      case "Waiting for confirmation":
        return ["pending"];
      case "On preparing":
        return ["paid"];
      case "On delivering":
        return ["shipped"];
      case "Deliver successful":
        return ["delivered"];
      case "Return/Refund":
        return ["cancelled", "returned", "failed"];
    }
  };

  const handleResetFilters = () => {
    setFilterType("orderId");
    setFilterInput("");
    setShippingMethod("All");
  };

  const calculateOrders = () => {
    let filtered = orders;
    // Apply nav filter
    if (nav !== "All") {
      filtered = filtered.filter((o) =>
        handleTransferNavToOrderStatus(nav).includes(o.status)
      );
    }
    // Apply filterType and filterInput
    const input = filterInput.trim().toLowerCase();
    if (input) {
      switch (filterType) {
        case "orderId":
          filtered = filtered.filter((o) =>
            String(o.id).toLowerCase().includes(input)
          );
          break;
        case "username":
          filtered = filtered.filter((o) =>
            (o.username ?? "").toLowerCase().includes(input)
          );
          break;
        case "product":
          filtered = filtered.filter((o) =>
            o.products.some((p) => (p.name ?? "").toLowerCase().includes(input))
          );
          break;
        case "shippingId":
          filtered = filtered.filter((o) =>
            String(o.shipping_id ?? "")
              .toLowerCase()
              .includes(input)
          );
          break;
        default:
          break;
      }
    }
    // Apply shipping method filter
    if (shippingMethod !== "All") {
      filtered = filtered.filter(
        (o) =>
          (o.shipping_method ?? "").toLowerCase() ===
          shippingMethod.toLowerCase()
      );
    }
    return filtered.length;
  };

  useEffect(() => {
    if (storeId && status === "idle") {
      dispatch(fetchAllStoreOrders(storeId));
    }
  }, [dispatch, storeId, status]);

  return (
    <div className="bg-gray-900 p-6">
      {/* All orders header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">All</h1>
        <div className="flex gap-4 items center">
          <button
            onClick={handleExport}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Export
          </button>
          <button
            onClick={handleExportPrint}
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
          >
            Print
          </button>
        </div>
      </div>

      <ul className="flex gap-4 text-lg">
        <li
          className={`cursor-pointer ${
            nav === "All" ? "text-purple-600 underline" : "hover:underline"
          }`}
          onClick={() => setNav("All")}
        >
          All
        </li>
        <li
          className={`cursor-pointer ${
            nav === "Waiting for confirmation"
              ? "text-purple-600 underline"
              : "hover:underline"
          }`}
          onClick={() => setNav("Waiting for confirmation")}
        >
          Waiting for confirmation
        </li>
        <li
          className={`cursor-pointer ${
            nav === "On preparing"
              ? "text-purple-600 underline"
              : "hover:underline"
          }`}
          onClick={() => setNav("On preparing")}
        >
          On preparing
        </li>
        <li
          className={`cursor-pointer ${
            nav === "On delivering"
              ? "text-purple-600 underline"
              : "hover:underline"
          }`}
          onClick={() => setNav("On delivering")}
        >
          On delivering
        </li>
        <li
          className={`cursor-pointer ${
            nav === "Deliver successful"
              ? "text-purple-600 underline"
              : "hover:underline"
          }`}
          onClick={() => setNav("Deliver successful")}
        >
          Deliver successful
        </li>
        <li
          className={`cursor-pointer ${
            nav === "Return/Refund"
              ? "text-purple-600 underline"
              : "hover:underline"
          }`}
          onClick={() => setNav("Return/Refund")}
        >
          Return/Refund
        </li>
      </ul>

      {nav === "On preparing" && (
        <OrderStatusFilter
          currentStatus={orderStatus}
          handleChangeStatus={setOrderStatus}
        />
      )}

      <Filter
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        shippingMethod={shippingMethod}
        setShippingMethod={setShippingMethod}
        handleResetFilters={handleResetFilters}
      />

      {/* Orders table */}
      <div className="mt-10">
        {/* Table Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl">Orders{`(${calculateOrders()})`}</h2>
          {nav === "On preparing" && <OnPreparingOrdersFilter />}
        </div>

        {/* Filtered orders for table */}
        {orders.length === 0 ? (
          <div className="mt-40">
            <img src={Database} alt="No orders" className="mx-auto my-2" />
            <p className="text-center">
              {status === "loading" ? "Loading..." : "No orders yet"}
            </p>
          </div>
        ) : (
          (() => {
            // Filter logic for table rows
            let filtered = orders;
            if (nav !== "All") {
              filtered = filtered.filter((o) =>
                handleTransferNavToOrderStatus(nav).includes(o.status)
              );
            }
            const input = filterInput.trim().toLowerCase();
            if (input) {
              switch (filterType) {
                case "orderId":
                  filtered = filtered.filter((o) =>
                    String(o.id).toLowerCase().includes(input)
                  );
                  break;
                case "username":
                  filtered = filtered.filter((o) =>
                    (o.username ?? "").toLowerCase().includes(input)
                  );
                  break;
                case "product":
                  filtered = filtered.filter((o) =>
                    o.products.some((p) =>
                      (p.name ?? "").toLowerCase().includes(input)
                    )
                  );
                  break;
                case "shippingId":
                  filtered = filtered.filter((o) =>
                    String(o.shipping_id ?? "")
                      .toLowerCase()
                      .includes(input)
                  );
                  break;
                default:
                  break;
              }
            }
            if (shippingMethod !== "All") {
              filtered = filtered.filter(
                (o) =>
                  (o.shipping_method ?? "").toLowerCase() ===
                  shippingMethod.toLowerCase()
              );
            }
            return (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-700 text-center text-xl">
                    <th className="px-4 py-2 font-normal rounded-l-xl">
                      <div className="flex justify-center">
                        <p className="mr-2">Products</p>
                      </div>
                    </th>
                    <th className="px-4 py-2 font-normal min-w-[12rem]">
                      Total Order Amount
                    </th>
                    <th className="px-4 py-2 font-normal">
                      <div className="flex justify-center">
                        <p className="mr-2">Order Status</p>
                      </div>
                    </th>
                    <th className="px-4 py-2 font-normal min-w-[11rem]">
                      <div className="flex justify-center min-w-[9rem]">
                        <p className="mr-2">Shipping Unit</p>
                      </div>
                    </th>
                    <th className="px-4 py-2 font-normal rounded-r-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((o) => (
                    <tr key={o.id} className="border-b-[0.01rem] text-center">
                      <td className="px-4 py-2 h-16">
                        {o.products.map((p) => (
                          <div key={p.name}>
                            <span>{p.name}</span>
                            <ul>
                              {p.variants.map((v) => (
                                <li key={v.id}>
                                  {v.name} x {v.quantity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-2">
                        {o.total_without_shipping} $
                      </td>
                      <td className="px-4 py-2">{o.status}</td>
                      <td className="px-4 py-2">
                        <select className="bg-gray-800 px-2 py-1 rounded">
                          <option value="American Post">American Post</option>
                          <option value="Europe Express">Europe Express</option>
                          <option value="Fast Post">Fast Post</option>
                          <option value="Airline Express">
                            Airline Express
                          </option>
                        </select>
                      </td>
                      <td className="px-4 py-2 cursor-pointer hover:underline active:underline-offset-3">
                        View
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()
        )}
      </div>
    </div>
  );
};

export default AllOrderSection;
