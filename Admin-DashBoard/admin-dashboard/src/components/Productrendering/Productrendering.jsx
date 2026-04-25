import React from "react";

export default function Productrendering({ products }) {
  return (
    <div>
      <div className="border p-5 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg ">
        <div className="grid grid-cols-2 gap-3">
          {products.images.slice(0, 2).map((el, index) => {
            return (
              <img
                src={el}
                key={index}
                alt="products"
                className="w-full aspect-square  object-cover transition  duration-300 hover:scale-105 rounded-lg"
              />
            );
          })}
        </div>

        <div className="content px-4 pb-4">
          <p className="text-white font-semibold text-lg line-clamp-1">
            {products.name}
          </p>
          <p className="text-gray-300 text-sm mt-1 line-clamp-2">
            {products.description}
          </p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-green-400 font-bold text-lg">
              ${products.price}
            </span>
            <span className="text-xs text-gray-400">
              Stock: {products.stock}
            </span>
          </div>
          <button className="w-full mt-3 bg-violet-600 hover:bg-violet-700 transition text-white py-2 rounded-lg text-sm">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
