import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setIsLoggedIn(false);
            navigate("/login");
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <header className="bg-[#010e37] shadow-md w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white tracking-wide">
                        Product<span className="text-[#eaeef1]">Hub</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={`${pathname === "/" ? "text-[#eaeef1]" : "text-white"} hover:text-[#eaeef1] font-medium transition`}>
                        ProductList
                    </Link>

                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="btn-custom w-full">
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navigate("/login")} className="btn-custom w-full" >
                            Login
                        </button>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button onClick={() => setMenu(!menu)} className="text-white text-2xl">
                        {menu ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            <div className={`md:hidden fixed inset-0 bg-[#010e37] z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out ${menu ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between">
                    <Link to="/" onClick={() => setMenu(false)} className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-white tracking-wide">
                            Product<span className="text-[#eaeef1]">Hub</span>
                        </span>
                    </Link>
                    <button onClick={() => setMenu(false)} className="text-white text-2xl w-8 h-8 flex items-center justify-center">
                        ✕
                    </button>
                </div>

                <ul className="flex flex-col mt-12 space-y-6 font-medium text-white text-lg text-center">
                    <li>
                        <Link to="/" onClick={() => setMenu(false)} className={`${pathname === "/" ? "text-[#eaeef1] font-bold" : "text-white" } transition`}>
                            Product List
                        </Link>
                    </li>
                </ul>

                <div className="mt-10">
                    {isLoggedIn ? (
                        <button
                            onClick={() => {
                                handleLogout();
                                setMenu(false);
                            }}
                            className="btn-custom w-full"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                navigate("/login");
                                setMenu(false);
                            }}
                            className="btn-custom w-full"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
