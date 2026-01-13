import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [input, setInput] = useState({
    name: "",
    price: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.name.trim() || !input.category || input.price <= 0) {
      toast.error("All fields required & price must be greater than 0");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: input.name,
        price: Number(input.price),
        category: input.category,
      });

      toast.success("Product added successfully!");
      setInput({ name: "", price: "", category: "" });
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error adding product");
    }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#d4edff] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#021659e6]">
          Add Product
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-[#010e37]">
            Product Name
          </label>
          <input type="text" id="name" value={input.name} onChange={handleChange} placeholder="Enter product name" className="w-full bg-[#f8f9fa] border border-gray-300 rounded-lg p-2.5"/>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-[#010e37]">
            Price
          </label>
          <input type="number" id="price" value={input.price} onChange={handleChange} placeholder="Enter price" className="w-full bg-[#f8f9fa] border border-gray-300 rounded-lg p-2.5"/>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-[#010e37]">
            Category
          </label>
          <select id="category" value={input.category} onChange={handleChange} className="w-full bg-[#f8f9fa] border border-gray-300 rounded-lg p-2.5">
            <option value="">Select Category</option>
            <option value="Shoes">Shoes</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <button type="submit" className="w-full text-white bg-[#010e37] hover:bg-[#021659e6] font-semibold rounded-lg px-5 py-2.5 transition">
          Add Product
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Back to{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#010e37] hover:underline cursor-pointer font-medium"
          >
            Product List
          </span>
        </p>
      </form>
    </div>
  );
};

export default AddProduct;
