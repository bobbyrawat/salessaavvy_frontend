import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productApi";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    photoUrl: ""
  });

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addProduct(product);

      navigate("/products-management", {
        state: {
          success: "Product Added Successfully"
        }
      });

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-2xl"
      >

        <h1 className="text-4xl font-bold mb-8">
          Add Product
        </h1>

        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded-lg"
        />

        <input
          name="photoUrl"
          placeholder="Photo URL"
          onChange={handleChange}
          className="w-full border p-3 mb-6 rounded-lg"
        />

        <button
          className="bg-green-600 text-white px-8 py-3 rounded-xl"
        >
          Save Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;