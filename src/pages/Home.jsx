import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-20">

          <div className="text-center">

            <h1 className="text-6xl font-bold mb-6">
              SalesSaavy
            </h1>

            <p className="text-xl text-slate-300 mb-10">
              Smarter Sales Management for Modern Businesses
            </p>

           <div className="flex justify-center gap-4">

  {!localStorage.getItem("token") && (
    <>
      <Link
        to="/login"
        className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
      >
        Register
      </Link>
    </>
  )}

</div>
          </div>

          {/* Products */}
          <div className="mt-20">

            <h2 className="text-4xl font-bold mb-8">
              Explore Products
            </h2>

            {products.length === 0 ? (

              <p className="text-slate-400">
                No products available.
              </p>

            ) : (

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            )}

          </div>

        </section>

      </div>
    </>
  );
}

export default Home;