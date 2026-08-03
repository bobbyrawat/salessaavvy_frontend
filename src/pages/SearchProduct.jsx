import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  searchProducts,
  deleteProduct,
} from "../services/productApi";

function SearchProduct() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await searchProducts(keyword);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Delete Product ?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      // Refresh search results after delete
      handleSearch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10">

      <h1 className="text-4xl font-bold mb-8">
        Search Product
      </h1>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter Product Name"
          className="border p-3 rounded-lg w-96"
        />

        <button
          onClick={handleSearch}
          className="bg-purple-600 text-white px-6 rounded-lg"
        >
          Search
        </button>
      </div>

      {products.length === 0 ? (
        <h2 className="text-2xl font-semibold text-center text-gray-600">
          No Product Found
        </h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
                src={
                  product.photoUrl ||
                  "https://via.placeholder.com/300"
                }
                alt={product.name}
                className="w-full h-52 object-cover"
              />

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
                  Quantity : {product.quantity}
                </p>

                <div className="flex gap-2 mt-5">

                  <button
                    onClick={() =>
                      navigate(`/products/view/${product.id}`)
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/products/update/${product.id}`)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>

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

          ))}

        </div>
      )}

    </div>
  );
}

export default SearchProduct;