import React from 'react'
import { useCartStore } from '../stores/useCartStore'
import { Minus } from 'lucide-react'

const CartItem = ({item}) => {
    const{removeFromCart,updateQuantity} = useCartStore()
  return (
    <div className='rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6'>
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">

        <div className="shrink-0 md:order-1">
            <img className='h-20 md:h-32 rounded object-cover' src={item.image} alt={item.name} />
        </div>

      <label className='sr-only text-white'>Choose Quantity : </label>
      <div className="flex items-center justify-between md:order-3 md:justify-end">
        <div className="flex items-center gap-2">
            <button className='inline-flex'>
                <Minus className='text-gray-300'/>
            </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default CartItem
