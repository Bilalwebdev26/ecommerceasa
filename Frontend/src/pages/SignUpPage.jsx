import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader, UserPlus } from "lucide-react";
import { signupItems } from "../mapitems/items.js";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";

const SignUpPage = () => {
  const loading = false;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
 const{signup} = useUserStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    signup(formData)
  };
  return (
    <div className="flex flex-col justify-center h-screen py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <h2 className="mt-6 text-center font-extrabold text-emerald-500 text-3xl ">
          Create your Account
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {signupItems.map((items, index) => (
              <div className="" key={index}>
                <label
                  htmlFor={items.id}
                  className="block text-sm font-medium shadow-sm"
                >
                  {items.label}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <items.icon className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    //  className="block w-full px-3 py-1 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                      placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    type={items.type}
                    id={items.id}
                    placeholder={items.placeholder}
                    required
                    value={formData[items.id] || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, [items.id]: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}

            <motion.button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-700 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition ease-in-out disabled:opacity-50"
              whileHover={{
                scale: 1.1, // Scale up on hover for a bouncy effect
                backgroundColor: "#34D399", // Change the background color on hover
                boxShadow: "0 4px 20px rgba(72, 209, 116, 0.7)", // Add glowing shadow
                transition: { duration: 0.4, type: "spring", stiffness: 300 },
              }}
              whileTap={{
                scale: 0.95, // Slight shrink when clicked g
                transition: { duration: 0.2 },
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
            >
              {loading ? (
                <>
                  <Loader
                    className="w-5 h-5 mr-2 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" aria-hidden="true" />
                  Sign Up
                </>
              )}
            </motion.button>
          </form>
          <p className="text-gray-400 mt-3 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-300 font-bold duration-150 hover:text-emerald-600"
            >
              Login here <ArrowRight className="inline h-5 w-5" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
