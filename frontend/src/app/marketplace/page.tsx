"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { fetchApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

export default function Marketplace() {
  const [cart, setCart] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchApi('/products');
        setProducts(res || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert(`Checkout not implemented yet. You have ${cart.length} items in your cart.`);
    setCart([]);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white p-6 md:p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-electric-blue">Marketplace</h1>
            <p className="text-zinc-400 mt-2">Premium supplements and gear to fuel your progress.</p>
          </div>
          <button 
            onClick={handleCheckout}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Cart ({cart.length})</span>
          </button>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-electric-blue" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => {
              const inCart = cart.includes(product.id);
              return (
                <Card key={product.id} className="overflow-hidden hover:border-blue-500 transition-all flex flex-col">
                  <div className="h-48 bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 font-bold">Image Placeholder</span>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col justify-between">
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
                      <Button 
                        onClick={() => addToCart(product.id)}
                        disabled={inCart}
                        variant={inCart ? "secondary" : "default"}
                        className={`font-bold flex items-center gap-2 ${inCart ? 'bg-green-600 text-white hover:bg-green-700' : ''}`}
                      >
                        {inCart ? <Check size={18} /> : 'Add'}
                        {inCart && 'Added'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
