import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full rounded-lg shadow-md border p-4 bg-white">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Cart Summary</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left w-1/2 p-2">Item</th>
              <th className="text-center w-1/4 p-2">Qty</th>
              <th className="text-right w-1/6 p-2">Price</th>
              <th className="w-1/12 p-2"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.name} className="border-b">
                <td className="p-2 break-words">{item.name}</td>
                <td className="p-2">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity - 1)}
                      className="h-8 w-8 border rounded text-lg"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      className="h-8 w-8 border rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-right p-2">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
                <td className="text-center p-2">
                  <button
                    onClick={() => removeFromCart(item.name)}
                    className="h-8 w-8 text-red-600 font-bold"
                    title="Remove"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-4 border-t pt-4 flex justify-between text-lg font-bold">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <button
        onClick={clearCart}
        disabled={cartItems.length === 0}
        className="w-full border rounded px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartSummary;
