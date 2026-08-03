import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../services/otpService";

function OtpVerification() {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const submitOtp = async () => {

    try {

      const response = await verifyOtp(otp);

      if (response.data === "SELLER_UPGRADED") {

        localStorage.setItem("role", "SELLER");

        navigate("/products-management");

      }

    } catch {

      alert("Invalid or Expired OTP");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <div className="bg-white p-8 rounded-xl shadow-xl w-96">

        <h2 className="text-2xl font-bold mb-6">
          Verify OTP
        </h2>

        <input
          value={otp}
          onChange={(e)=>setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border p-3 rounded-lg mb-5"
        />

        <button
          onClick={submitOtp}
          className="bg-blue-600 text-white w-full p-3 rounded-lg"
        >
          Verify OTP
        </button>

      </div>

    </div>

  );
}

export default OtpVerification;