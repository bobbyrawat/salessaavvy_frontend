import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const { cart } = useCart();


  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-400"
        >
          SalesSaavy
        </Link>

        {!token ? (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-6">

            <Link
              to="/dashboard"
              className="hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to={
                role === "SELLER"
                  ? "/products-management"
                  : "/sell-my-product"
              }
              className="hover:text-blue-400 transition"
            >
              {role === "SELLER"
                ? "My Products"
                : "Sell My Product"}
            </Link>

            {/* 🛒 CART ICON */}
            <Link
              to="/cart"
              className="relative hover:text-blue-400 transition text-xl"
            >
              🛒

              {/* Badge */}
            {cart.totalQuantity > 0 && (
  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
    {cart.totalQuantity}
  </span>
)}
            </Link>

            {/* Username */}
            <span className="text-green-400 font-semibold">
              {username}
            </span>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;