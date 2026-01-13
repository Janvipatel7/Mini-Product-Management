import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.email.trim() === "" || input.password.trim() === "") {
      toast.error("Enter All Details Correctly!");
      setInput({ email: "", password: "" });
      return;
    }

    try {
      const user = await signInWithEmailAndPassword( auth, input.email, input.password);
      if (user) {
        toast.success("Login successful!");
        setInput({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials. Please try again.");
      setInput({ email: "", password: "" });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d4edff] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm sm:max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-[#010e37] mb-8">
          Login
        </h2>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#010e37]"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={input.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full bg-[#f8f9fa] border border-gray-300 text-[#010e37] text-sm rounded-lg focus:ring-[#010e37] focus:border-[#010e37] p-2.5 transition"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-[#010e37]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={input.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full bg-[#f8f9fa] border border-gray-300 text-[#010e37] text-sm rounded-lg focus:ring-[#010e37] focus:border-[#010e37] p-2.5 transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="w-full text-white bg-[#010e37] hover:bg-[#03144acb] font-medium rounded-lg text-sm px-5 py-2.5 shadow-md transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="w-full text-[#010e37] border border-[#010e37] hover:bg-[#03144acb] hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 transition"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
