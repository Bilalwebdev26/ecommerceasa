import React, { useState } from "react";
import { motion } from "framer-motion";
import { categoriesOnly } from "../mapitems/items.js";
import { Loader, PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore.js";

const CreateProduct = () => {
  const { createProduct, Loading } = useProductStore();
  const [newPoduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    // countInStock:""
    image: "",
  });
  const formHandler = async (e) => {
    e.preventDefault();
    console.log(newPoduct);
  try {
      await createProduct(newPoduct);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });
  } catch (error) {
    console.log("Error occur while creating Product")
  }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newPoduct, image: reader.result });
      };
      reader.readAsDataURL(file); //base 64 formate
    }
  };
  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-emerald-500 font-bold text-center text-xl">
        Create new product
      </h2>
      <form onSubmit={formHandler}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter Product Name"
            value={newPoduct.name}
            onChange={(e) =>
              setNewProduct({ ...newPoduct, name: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="Description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            placeholder="Enter Description"
            value={newPoduct.description}
            onChange={(e) =>
              setNewProduct({ ...newPoduct, description: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300"
          >
            Product Price
          </label>
          <input
            type="number"
            id="price"
            min={0}
            placeholder="Enter Product Price"
            value={newPoduct.price}
            step="0.01"
            onChange={(e) =>
              setNewProduct({ ...newPoduct, price: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Product Category
          </label>
          <select
            id="category"
            placeholder="Enter Product Category"
            value={newPoduct.category}
            onChange={(e) =>
              setNewProduct({ ...newPoduct, category: e.target.value })
            }
            className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            required
          >
            {categoriesOnly.map((categories) => (
              <option key={categories} value={categories}>
                {categories}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2 flex items-center">
          <input
            type="file"
            id="image"
            className="sr-only"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 hover:border-emerald-500 transition-all"
          >
            <Upload className="h-5 w-5 inline-block mr-2" />
            Upload Image
          </label>
          {newPoduct.image && (
            <span className="ml-3 text-sm text-gray-400">Image uploaded</span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white flex items-center justify-center mt-2 font-semibold text-sm rounded-md px-3 py-2 hover:bg-emerald-500 transition-all"
        >
          {Loading ? (
            <>
              <Loader
                className="h-5 w-5 mr-2 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProduct;
