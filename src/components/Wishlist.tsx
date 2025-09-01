import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchWishlists,
  deleteWishlistThunk,
  postWishlist,
} from "../features/Wishlist/WishlistSlice";
import { Link } from "react-router-dom";

// SVG
import Trash from "../assets/trash.svg";

interface Wishlist {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const Wishlist = () => {
  const dispatch: AppDispatch = useDispatch();
  const { wishlists, status, error } = useSelector(
    (state: RootState) => state.wishlist
  );
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState("");

  useEffect(() => {
    dispatch(fetchWishlists());
  }, [dispatch]);

  const handleCreateWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWishlistName.trim()) {
      dispatch(postWishlist(newWishlistName.trim()));
      setNewWishlistName("");
      setShowCreateForm(false);
    }
  };

  const handleDeleteWishlist = (id: number) => {
    if (window.confirm("Are you sure you want to delete this wishlist?")) {
      dispatch(deleteWishlistThunk(id));
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-600">
          <p>Error loading wishlists: {error}</p>
          <button
            onClick={() => dispatch(fetchWishlists())}
            className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Wishlists
            </h1>
            <p className="text-gray-600">
              Organize your favorite products in custom lists
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            + Create Wishlist
          </button>
        </div>
      </div>

      {/* Create Wishlist Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Wishlist</h2>
            <form onSubmit={handleCreateWishlist}>
              <input
                type="text"
                value={newWishlistName}
                onChange={(e) => setNewWishlistName(e.target.value)}
                placeholder="Enter wishlist name"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewWishlistName("");
                  }}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newWishlistName.trim()}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {wishlists.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No wishlists yet
          </h3>
          <p className="text-gray-500 mb-4">
            Create your first wishlist to start organizing your favorite
            products!
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Your First Wishlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlists.map((wishlist: Wishlist) => (
            <div
              key={wishlist.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <Link
                      to={`/wishlist/${wishlist.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {wishlist.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      Created {formatDate(wishlist.created_at)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteWishlist(wishlist.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Delete wishlist"
                  >
                    <img src={Trash} alt="Delete" className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Last updated {formatDate(wishlist.updated_at)}
                  </span>
                  <Link
                    to={`/wishlist/${wishlist.id}`}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    View Items →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
