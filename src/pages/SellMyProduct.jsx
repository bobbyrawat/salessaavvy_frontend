import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/otpService";

function SellMyProduct() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {

    if (loading) return;

    setLoading(true);

    try {

      const response = await sendOtp();

      if (response.data === "ALREADY_SELLER") {
    navigate("/products-management", { replace: true });
    return;
}

if (response.data === "OTP_SENT") {
    navigate("/verify-otp", { replace: true });
}

    } catch {

      alert("Unable to send OTP.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-xl w-96 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Become a Seller
        </h2>

        <p className="mb-6 text-gray-600">
          Click the button below to receive an OTP on your registered email.
        </p>

        <button
          onClick={handleSendOtp}
          disabled={loading}
          className="bg-blue-600 text-white w-full p-3 rounded-lg disabled:bg-gray-400"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

      </div>

    </div>

  );
}

export default SellMyProduct;