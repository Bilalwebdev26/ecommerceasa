import React from 'react'
import{motion} from "framer-motion"
import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <motion.div
    className='flex flex-col items-center space-x-4 py-16'
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    >
      <ShoppingCart className='h-24 w-24 text-gray-300'/>
      <h3 className='text-2xl font-semibold'>Your Cart is Empty</h3>
      <p className='text-gray-400'>Looks like you {"haven't"} added anything to your cart yet.</p>
      <Link to={"/"} className='mt-4 rounded-md py-2 px-6 text-white transition-colors bg-emerald-500 hover:bg-emerald-600'>
        Start Shopping
      </Link>
    </motion.div>
  )
}

export default EmptyCart
