import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ProductCart from "../components/ProductCart.jsx";

const CategoryPage = () => {
  const { getProductByCategory, products } = useProductStore();
  const { category } = useParams();
  useEffect(() => {
    getProductByCategory(category);
  }, [getProductByCategory]);
  console.log("products : ", products);
  return (
    <div>
      <h2 className="text-6xl font-bold text-emerald-400 text-center">
        <motion.span
          style={{ display: "inline-block" }} // Ensure it's not inline
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.span>{" "}
        Products{" "}
        <motion.span
          style={{ display: "inline-block" }} // Ensure it's not inline
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          here
        </motion.span>
      </h2>
      {products?.length === 0 && (
        <h2 className="text-3xl font-semibold text-center text-red-600 mt-5">
          No Product Available
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 px-4">
        {products?.map((product) => (
          <ProductCart product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
