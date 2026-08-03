import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { addToCart } from "../services/cartService";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { fetchCart } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await API.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      await fetchCart();
      alert("Product added to cart");
    } catch (error) {
      console.log(error);
      alert("Unable to add product");
    }
  };

  const handleBuyNow = () => {
    navigate("/payment", {
      state: {
        product,
      },
    });
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
          Loading...
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
          Product not found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white py-12">

        <div className="max-w-7xl mx-auto bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">

          <div className="grid md:grid-cols-2">

            {/* LEFT */}

            <div className="bg-slate-800 flex items-center justify-center p-10">

              <img
                src={
                  product.photoUrl ||
                  "https://via.placeholder.com/600"
                }
                alt={product.name}
                className="w-full max-h-[550px] object-contain rounded-xl"
              />

            </div>

            {/* RIGHT */}

            <div className="p-10">

              <h1 className="text-5xl font-bold">
                {product.name}
              </h1>

              <p className="text-slate-400 mt-6 text-lg leading-8">
                {product.description}
              </p>

              <div className="mt-8">

                <p className="text-5xl font-bold text-green-400">
                  ₹{product.price}
                </p>

              </div>

              <div className="mt-6">

                <span className="bg-blue-700 px-4 py-2 rounded-full">
                  Stock : {product.quantity}
                </span>

              </div>

              <div className="mt-12 flex gap-5">

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl text-xl font-bold transition"
                >
                  Add To Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-4 rounded-xl text-xl font-bold transition"
                >
                  Buy Now
                </button>

              </div>

              <div className="mt-12 border-t border-slate-700 pt-8">

                <h2 className="text-2xl font-bold mb-5">
                  Product Information
                </h2>

                <div className="space-y-4 text-slate-300">

                  <p>
                    <span className="font-semibold">
                      Product ID :
                    </span>{" "}
                    {product.id}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Available Quantity :
                    </span>{" "}
                    {product.quantity}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Category :
                    </span>{" "}
                    Electronics
                  </p>

                  <p>
                    <span className="font-semibold">
                      Delivery :
                    </span>{" "}
                    Free Delivery Available
                  </p>

                  <p>
                    <span className="font-semibold">
                      Warranty :
                    </span>{" "}
                    1 Year Manufacturer Warranty
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductDetails;