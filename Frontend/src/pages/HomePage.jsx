import React from 'react'
import { categories } from '../mapitems/items.js'
import CategoryItem from '../components/CategoryItem.jsx'
const HomePage = () => {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className='text-emerald-400 font-bold text-5xl text-center'>
            Explore Our Category
          </h1>
          <p className='text-gray-300 font-semibold text-center mt-3 text-base mb-12'>Discover the latest trends in eco-friendly fashion</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
             {
              categories.map((category)=>(
                <CategoryItem 
                 category={category}
                 key={category.name}
                />
              ))
             }
          </div>
      </div>
    </div>
  )
}

export default HomePage
