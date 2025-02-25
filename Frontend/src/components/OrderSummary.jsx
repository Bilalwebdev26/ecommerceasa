import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore.js";
import {MoveRight} from "lucide-react"
import{Link} from "react-router-dom"
import{loadStripe} from "@stripe/stripe-js"

// const stripePromise

const OrderSummary = () => {
  const { total, subTotal ,coupon,isCouponApplied} = useCartStore();
  const savings = subTotal - total;
  const formattedSubTotal = subTotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  const handleClick = ()=>{
    console.log("Bilal")
  }
  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl text-emerald-400 text-center font-bold">
        Order Summary
      </p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between">
            <dt className="text-base font-normal text-gray-300">
              Orignal Price
            </dt>
            <dd className="text-base font-medium text-white">
              ${formattedSubTotal}
            </dd>
          </dl>
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-medium text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">
                ${formattedSavings}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4 ">
              <dt className="text-base font-normal text-gray-300 ">
                Coupon {coupon.code}
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercent}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base text-white font-bold">Total</dt>
            <dd className="text-base font-bold text-white">
              ${formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button className="bg-emerald-600 w-full text-center font-semibold px-2 py-3 rounded-md hover:bg-emerald-500 duration-200 focus:ring-2 focus:ring-emerald-300 focus:outline-none"
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        onClick={handleClick}
        >
          Proceed to Checkout
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-500 text-sm font-normal">or </span>
          <Link to={"/"} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline">
          Continue Shopping <MoveRight size={16}/>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
