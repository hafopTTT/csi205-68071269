"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";
import { globalDataContext } from "@/app/layout";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Page() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/carts"), [router]);

  const { products, setProducts, carts, setCarts } = useContext(globalDataContext);

  const removeFromCart = (product: Product) => {
    //remove product from carts
    setCarts(carts.filter((p: Product) => p.id !== product.id));

    //put product back to products (keep original order by id)
    setProducts([...products, product].sort((a: Product, b: Product) => a.id - b.id));
  };

  const totalPrice = carts.reduce((sum: number, p: Product) => sum + p.price, 0);

  return (
    <>
      <div className="w-3xl max-w-full mx-auto mt-4 h-120 overflow-y-auto bg-cyan-50 border-2 border-cyan-200 rounded-xl">
        {carts.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-3 p-3">
            {carts.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                buttonLabel="Remove"
                color="red"
                onClick={() => removeFromCart(product)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <span className="bg-amber-400 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Count: {carts.length} items
        </span>
        <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
          Price: ${totalPrice.toFixed(2)}
        </span>
      </div>
    </>
  );
}
