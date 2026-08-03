import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyProducts,
  deleteProduct,
} from "../services/productApi";

function ViewAllProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // Load all products
  const loadProducts = async () => {
    try {
      const response = await getMyProducts();

      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);

      // Make sure products is always an array
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else if (Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        console.error("Products is not an array:", response.data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    }
  };

  // Load products when page opens
  useEffect(() => {
    loadProducts();
  }, []);

  // Delete product
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete Product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // Reload products after deleting
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold mb-10">
        My Products
      </h1>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-8">

        {products.length === 0 ? (
          <h2 className="text-xl font-semibold">
            No Products Found
          </h2>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              {/* Product Image */}
              <img
                src={
                  product.photoUrl ||
                  "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              {/* Product Details */}
              <div className="p-5">

                <h2 className="font-bold text-xl">
                  {product.name}
                </h2>

                <p className="mt-2">
                  {product.description}
                </p>

                <p className="mt-3 text-green-700 font-semibold">
                  ₹{product.price}
                </p>

                <p>
                  Quantity: {product.quantity}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-5">

                  {/* View */}
                  <button
                    onClick={() =>
                      navigate(
                        `/products/view/${product.id}`
                      )
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() =>
                      navigate(
                        `/products/update/${product.id}`
                      )
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      removeProduct(product.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default ViewAllProducts;