import { useLocation, useNavigate } from "react-router-dom";
import { createOrder } from "../services/paymentService";
import Navbar from "../components/Navbar";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const response = await createOrder(product.price);

    ;
      
     

console.log("RESPONSE", response);
console.log("ORDER", response.data);

const order = response.data;

      const options = {
        key: "rzp_test_Sip4O3Mv9eziJY",

        amount: order.amount,

        currency: order.currency,

        name: "SalesSaavy",

        description: product.name,

        order_id: order.id,

        handler: function (paymentResponse) {
          console.log(paymentResponse);

          alert("Payment Successful");

          navigate("/dashboard");
        },

        prefill: {
          name: "SalesSaavy User",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="bg-slate-900 p-10 rounded-3xl shadow-xl w-full max-w-xl">

          <img
            src={
              product.photoUrl ||
              "https://via.placeholder.com/400"
            }
            alt={product.name}
            className="w-full h-64 object-cover rounded-xl"
          />

          <h1 className="text-3xl font-bold mt-6">
            {product.name}
          </h1>

          <p className="text-slate-400 mt-3">
            {product.description}
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-6">
            ₹{product.price}
          </h2>

          <button
            onClick={handlePayment}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold text-xl"
          >
            Pay Now
          </button>

        </div>

      </div>
    </>
  );
}

export default Payment;