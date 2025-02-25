import React, { useEffect, useState } from "react";
import ProductCart from "./ProductCart.jsx";
import Loading from "./Loading.jsx"
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

const PeopleAlsoBought = () => {
  const [recommended, setRecommended] = useState([]);
  const[isLoading,setLoading]=useState(false)
  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await axios.get("/v1/products/recomended-product");
        setRecommended(res.data);
        console.log("Recommended 3 data : ", res.data);
      } catch (error) {
        toast.error(error.response.data.message || "An error occured while fetching recommended Product")
      }
    };
    fetchRecommendation()
  }, []);
  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-emerald-400">
        People Also Bought
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
