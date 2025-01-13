import React from "react";
import { ShoppingCart, UserPlus, LogIn, Lock, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
const NavBar = () => {
  const {user,Logout} = useUserStore();
  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-900 p-3">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-400 items-center space-x-2 flex"
          >
            E-commerce
          </Link>

          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-emerald-400 duration-300 transition ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative group text-gray-300 hover:text-emerald-400 duration-300 transition ease-in-out"
              >
                <ShoppingCart
                  size={20}
                  className="inline-block mr-1 hover:text-emerald-400"
                />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -left-3 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs  group-hover:bg-emerald-400 transition duration-300 ease-in-out">
                  3
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link to={"/secret-dashboard"} className="bg-emerald-700 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center">
                <Lock className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">DashBoard</span>
              </Link>
            )}
            {user ? (
              <button onClick={Logout} className="bg-gray-700 hover:bg-gray-500 text-white py-1 px-3 rounded-md flex items-center transition font-medium duration-300 ease-in-out">
                <LogOut size={20} />
                <span className="hidden sm:inline ml-2">LogOut</span>
              </button>
            ) : (
              <>
                <Link
                  to={"/signup"}
                  className="bg-emerald-600 hover:bg-emerald-700 font-medium text-white py-1 px-3 rounded-md items-center transition duration-300 ease-out flex "
                >
                  <UserPlus size={20} className="mr-2" />
                  SignUp
                </Link>
                <Link
                  to={"/login"}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded-md items-center font-medium transition duration-300 ease-out flex"
                >
                  <LogIn size={20} className="mr-2" />
                  LogIn
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
