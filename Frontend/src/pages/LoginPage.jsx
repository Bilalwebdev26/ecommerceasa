import React, { useState } from "react";
import { motion } from "framer-motion";
import { loginItems } from "../mapitems/items.js";
import { ArrowRight, Loader, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const{login,loading} = useUserStore()
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    login(formData)
  };
  return (
    <div className="flex flex-col justify-center h-screen py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-center font-extrabold text-emerald-500 text-3xl">
          Welcome Back Buddy
        </h2>
      </motion.div>
      <motion.div
      initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.8,delay:0.2}}
      className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
         <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
           <form onSubmit={handleSubmit} className="space-y-6">
            <div className="">
              {loginItems.map((item,index)=>(
                <div className="" key={index}>
                  <label htmlFor={item.id} className="block text-sm font-medium shadow-sm">
                    {item.label}
                  </label>
                 <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <item.icon className="w-5 h-5 text-gray-400"/>
                  </div>
                    <input
                    className="block w-full px-3 py-2 pl-10 bg-gray-700 border border-gray-600 rounded-md shadow-sm
                      placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    type={item.type}
                    id={item.id}
                    placeholder={item.placeholder}
                    value={formData[item.id]}
                    onChange={(e)=>
                      setFormData({...formData,[item.id] : e.target.value})}
                    required
                    />
        
                 </div>
                </div>
              ))}
            </div>
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
                  Log In
                </>
              )}
            </motion.button>
           </form>
           <p className="text-gray-400 mt-3 text-center">
            Create an Acount?{" "}
            <Link
              to="/signup"
              className="text-emerald-300 font-bold duration-150 hover:text-emerald-600"
            >
              Signup here <ArrowRight className="inline h-5 w-5" />
            </Link>
          </p>
           
         </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
