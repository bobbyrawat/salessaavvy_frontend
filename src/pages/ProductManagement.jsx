import { useLocation, useNavigate } from "react-router-dom";

function ProductManagement() {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-gradient-to-r from-slate-950 to-blue-950 p-6 flex justify-between">

        <h1 className="text-4xl font-bold text-white">
          Product Management
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Back To Home
        </button>

      </div>

      <div className="max-w-7xl mx-auto p-10">

        {location.state?.success && (
          <div className="bg-green-500 text-white p-4 rounded-xl mb-8">
            ✅ {location.state.success}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Add Product
            </h2>

            <button
              onClick={() => navigate("/products/add")}
              className="bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Open
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Search Product
            </h2>

            <button
              onClick={() => navigate("/search-product")}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl"
            >
              Open
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              View All Products
            </h2>

            <button
              onClick={() => navigate("/view-all-products")}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Open
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductManagement;