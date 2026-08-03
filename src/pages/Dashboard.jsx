import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get("/products");

      

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      setProducts([]);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto p-8">

          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-900 p-10 rounded-3xl mb-10">
            <h1 className="text-5xl font-bold">
              SalesSaavy Dashboard
            </h1>

            <p className="text-slate-300 mt-3">
              Buy and Sell Products
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3>Total Products</h3>

              <p className="text-4xl font-bold">
                {Array.isArray(products) ? products.length : 0}
              </p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl">
              <h3>Total Stock</h3>

              <p className="text-4xl font-bold">
                {Array.isArray(products)
                  ? products.reduce(
                      (sum, p) => sum + Number(p.quantity || 0),
                      0
                    )
                  : 0}
              </p>
            </div>

          </div>

          <h2 className="text-3xl font-bold mb-6">
            Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {Array.isArray(products) &&
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;