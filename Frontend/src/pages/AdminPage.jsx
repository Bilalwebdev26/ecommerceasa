import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { adminTabs } from "../mapitems/items.js";
import CreateProduct from "../components/CreateProduct.jsx";
import ViewProduct from "../components/ViewProduct.jsx";
import Analytics from "../components/Analytics.jsx";
import { useProductStore } from "../stores/useProductStore.js";

const AdminPage = () => {
  const [activeTab, seActiveTab] = useState("create");
  const { fetchProduct } = useProductStore();
  useEffect(()=>{
    fetchProduct()
  },[fetchProduct])
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1
          className="text-5xl font-bold text-emerald-400 text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Admin Dashboard
        </motion.h1>
        <div className="flex justify-center mb-8">
          {adminTabs.map((tabs) => (
            <button
              key={tabs.id}
              onClick={() => seActiveTab(tabs.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tabs.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-700 text-gray-300 hover-bg-gray-500"
              }`}
            >
              <tabs.icon className="mr-2 h-5 w-5" />
              {tabs.label}
            </button>
          ))}
        </div>
        {activeTab === "create" && <CreateProduct />}
        {activeTab === "products" && <ViewProduct />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
};

export default AdminPage;
