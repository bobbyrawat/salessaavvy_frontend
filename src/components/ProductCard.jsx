import { addToCart } from "../services/cartService";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const { fetchCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent card click

    try {
      await addToCart(product.id);
      await fetchCart();
      alert("Added to cart");
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart");
    }
  };

  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={openProduct}
      className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <img
        src={product.photoUrl || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">
        <h2 className="text-xl font-bold text-white">
          {product.name}
        </h2>

        <p className="text-slate-400 mt-2 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-green-400 text-xl font-bold">
            ₹{product.price}
          </span>

          <span className="text-yellow-400 font-medium">
            Qty: {product.quantity}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;