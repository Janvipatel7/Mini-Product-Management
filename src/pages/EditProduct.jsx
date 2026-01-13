import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productRef = doc(db, "products", id);
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const data = productSnap.data();
                    setName(data.name);
                    setPrice(data.price);
                    setCategory(data.category);
                } else {
                    toast.error("Product not found");
                    navigate("/");
                }
            } catch (error) {
                console.log(error);
                toast.error("Error fetching product");
            }
        };

        fetchProduct();
    }, [id, navigate]);


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!name || !price || !category) {
            toast.error("All fields are required");
            return;
        }

        if (price <= 0) {
            toast.error("Price must be greater than 0");
            return;
        }

        try {
            const productRef = doc(db, "products", id);
            await updateDoc(productRef, {
                name,
                price,
                category,
            });

            toast.success("Product updated successfully!");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error("Error updating product");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#d4edff] px-4">
            <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md border">

                <h2 className="text-2xl font-bold text-center text-[#021659e6] mb-6">
                    Edit Product
                </h2>

                <form onSubmit={handleUpdate} className="space-y-4">

                    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded-lg"/>

                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded-lg"/>

                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded-lg">
                        <option value="">Select Category</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Electronics">Electronics</option>
                    </select>

                    <button type="submit" className="w-full bg-[#010e37] text-white py-2 rounded-lg hover:bg-[#021659e6]">
                        Update Product
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EditProduct;
