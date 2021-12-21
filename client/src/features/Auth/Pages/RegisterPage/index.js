import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import EmailForm from "../../components/EmailForm";
import OtpForm from "../../components/OtpForm";
import axios from "axios";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [isCorrectOtp, seIsCorrectOtp] = useState(false);
  const handleSendOtp = async (data) => {
    try {
      const res = await axios.post(`http://localhost:9999/api/auth/otp`, {
        email: data.email,
      });
      if (res.data.success) {
        setEmail(data.email);
      } else {
        alert("Cmn điều kiện khi gmail đã đăng ký đâu broooo");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmitOtp = async (data) => {
    const otp = { otp: data };
    try {
      const res = await axios.post(
        "http://localhost:9999/api/auth/confirmOtp",
        otp
      );

      if (res.data.success) {
        seIsCorrectOtp(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (data) => {
    data.append("email", email);

    try {
      const res = await axios.post(
        "http://localhost:9999/api/auth/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className=" text-center h-2/6 flex flex-col justify-center">
        <h4 className="text-5xl font-bold text-slate-300">
          Create a new account
        </h4>
        <span className="text-center my-4">
          Already an account?{" "}
          <span className="text-indigo-800 bodr cursor-pointer ">Sign In</span>
        </span>
      </div>
      {isCorrectOtp && <RegisterForm onSubmit={handleRegister} email={email} />}
      {!isCorrectOtp && <EmailForm onSubmit={handleSendOtp} />}
      {email && !isCorrectOtp && <OtpForm onSubmit={handleSubmitOtp} />}
    </div>
  );
}

export default RegisterPage;
