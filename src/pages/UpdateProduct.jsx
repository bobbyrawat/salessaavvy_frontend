import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductById,
  updateProduct
} from "../services/productApi";

function UpdateProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState({
      name: "",
      description: "",
      price: "",
      quantity: "",
      photoUrl: ""
    });

  useEffect(() => {

    const load = async () => {

      const response =
        await getProductById(id);

      setProduct(response.data);
    };

    load();

  }, [id]);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateProduct(id, product);

    navigate("/view-all-products");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-2xl"
      >

        <h1 className="text-4xl font-bold mb-8">
          Update Product
        </h1>

        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          name="photoUrl"
          value={product.photoUrl}
          onChange={handleChange}
          className="w-full border p-3 mb-6 rounded-lg"
        />

        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-xl"
        >
          Update Product
        </button>

      </form>

    </div>
  );
}

export default UpdateProduct;