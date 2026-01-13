import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const productData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productData);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));

      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.id !== id)
      );

      toast.success("Product deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Error deleting product");
    }
  };

  const filteredProducts = products.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category)
    );
  });

  return (
    <div className="min-h-screen bg-[#d4edff] py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-8 border">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#021659e6]">
            Product List
          </h2>

          <button
            onClick={() => navigate("/add")}
            className="mt-3 sm:mt-0 bg-[#010e37] text-white px-6 py-2 rounded-lg hover:bg-[#021659e6]"
          >
            + Add Product
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by product name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-1/2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-lg w-full sm:w-1/3"
          >
            <option value="">All Categories</option>
            <option value="Shoes">Shoes</option>
            <option value="Clothes">Clothes</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center border">
            <thead className="bg-[#021659e6] text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-3 font-medium">
                      {product.name}
                    </td>
                    <td className="px-4 py-3">
                      ₹{product.price}
                    </td>
                    <td className="px-4 py-3">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-4">
                      <button
                        onClick={() => navigate(`/edit/${product.id}`)}
                        className="text-[#014e4e] font-semibold hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 font-semibold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-lg font-semibold">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ProductList;
