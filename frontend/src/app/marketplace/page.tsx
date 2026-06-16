"use client";

import { ShoppingCart } from 'lucide-react';

const products = [
  { id: 1, name: 'Whey Protein Isolate', category: 'Supplements', price: 49.99, rating: 4.8 },
  { id: 2, name: 'Creatine Monohydrate', category: 'Supplements', price: 24.99, rating: 4.9 },
  { id: 3, name: 'Resistance Bands Set', category: 'Accessories', price: 19.99, rating: 4.5 },
  { id: 4, name: 'Premium Lifting Belt', category: 'Gear', price: 39.99, rating: 4.7 },
  { id: 5, name: 'Pre-Workout Energy', category: 'Supplements', price: 34.99, rating: 4.6 },
  { id: 6, name: 'Gym Duffel Bag', category: 'Accessories', price: 45.00, rating: 4.8 },
];

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-electric-blue">Marketplace</h1>
          <p className="text-zinc-400 mt-2">Premium supplements and gear to fuel your progress.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors">
          <ShoppingCart size={20} />
          <span>Cart (0)</span>
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-blue-500 transition-all flex flex-col">
            <div className="h-48 bg-zinc-800 flex items-center justify-center">
              <span className="text-zinc-600 font-bold">Image Placeholder</span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-blue-500 font-bold tracking-wider uppercase mb-1">{product.category}</p>
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-zinc-400">{product.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xl font-extrabold">${product.price.toFixed(2)}</span>
                <button className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
