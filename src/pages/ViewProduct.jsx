import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";

function ViewProduct() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {

    const load = async () => {

      const response =
        await getProductById(id);

      setProduct(response.data);
    };

    load();

  }, [id]);

  if (!product)
    return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[600px]">

        <img
          src={product.photoUrl}
          alt=""
          className="w-full h-72 object-cover rounded-xl"
        />

        <h1 className="text-4xl font-bold mt-5">
          {product.name}
        </h1>

        <p className="mt-3">
          {product.description}
        </p>

        <p className="mt-3 text-green-600">
          ₹{product.price}
        </p>

        <p>
          Quantity : {product.quantity}
        </p>

      </div>

    </div>
  );
}

export default ViewProduct;