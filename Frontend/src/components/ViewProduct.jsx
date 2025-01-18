import React from "react";
import { motion } from "framer-motion";
import { useProductStore } from "../stores/useProductStore.js";
import { Star, Trash } from "lucide-react";

const ViewProduct = () => {
  const { fetchProduct, deleteProduct, toggleFeatureProduct, products } =
    useProductStore();
  console.log("Products : ", products);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 shadow-lg overflow-hidden max-w-4xl mx-auto"
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {products?.map((product) => (
            <tr key={product._id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-300">
                  ${""}{product.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-semibold text-gray-300">
                  {" "}
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </div>
              </td>

              {/* <td className='px-6 py-4 whitespace-nowrap'>
                <button onClick={()=>{toggleFeatureProduct(product._id)}} className={`p-1 rounded-full ${product.isFeatured ? "bg-yellow-400 text-gray-900 group": "bg-gray-600 text-gray-300"} hover:bg-yellow-500 transition-colors duration-200 relative`}>
                  <Star className='h-5 w-5 '/>
                  <div className="absolute bottom-full top-0  transform  hidden group-hover:block">
                    <span className='"bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md'>
                      Add in Feature Product
                    </span>
                  </div>
                </button>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap relative">
                <button
                  onClick={() => toggleFeatureProduct(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900 group"
                      : "bg-gray-600 text-gray-300 group"
                  } hover:bg-yellow-500 transition-colors duration-200 relative`}
                >
                  <Star className="h-5 w-5" />
                  {/* Tooltip */}
                  {product.isFeatured ? (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                        Remove from Feature Product
                      </span>
                    </div>
                  ) : (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                      <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                        Add in Feature Product
                      </span>
                    </div>
                  )}
                </button>
              </td>

              {/* <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button onClick={()=>{deleteProduct(product._id)}} className='text-red-400 hover:text-red-500 duration-150'>
                 <Trash className='h-5 w-5'/>
                </button>
              </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-500  group"
                >
                  <Trash className="h-5 w-5" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full top-0  transform  hidden group-hover:block">
                    <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                      Delete Product
                    </span>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ViewProduct;
