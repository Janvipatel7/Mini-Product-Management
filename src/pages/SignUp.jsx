import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( input.email.trim() === "" || input.password.trim() === "" || input.confirmPassword.trim() === ""){
            toast.error("Enter all details correctly!");
            setInput({ email: "", password: "" , confirmPassword: "",});
            return;
        }

        if (input.password !== input.confirmPassword) {
            toast.error("Passwords do not match!");
            setInput({ email: "", password: "" , confirmPassword: "",});
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword( auth, input.email, input.password);
            if (res) {
                toast.success("Account created successfully!");
                setInput({ email: "", password: "", confirmPassword: "" });
                setTimeout(() => navigate("/"), 1500);
            }
        } catch (error) {
            toast.error(error.message);
            setInput({ email: "", password: "" , confirmPassword: "",});
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-[#d4edff] px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md border border-gray-200"
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#010e37]">
                    Create Account
                </h2>

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#010e37]"
                    >
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={input.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#010e37] focus:border-[#010e37] block w-full p-2.5 transition duration-200"
                    />
                </div>

                <div className="mb-5">
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
                        placeholder="Enter password"
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#010e37] focus:border-[#010e37] block w-full p-2.5 transition duration-200"
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-[#010e37]"
                    >
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={input.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        className="bg-[#f8f9fa] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#010e37] focus:border-[#010e37] block w-full p-2.5 transition duration-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-[#010e37] hover:bg-[#03144acb] focus:ring-4 focus:outline-none focus:ring-[#010e37] font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition duration-200"
                >
                    Sign Up
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-[#010e37] hover:underline cursor-pointer font-medium"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
