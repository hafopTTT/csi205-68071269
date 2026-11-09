"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkLogin } from "@/utils/login";
import { globalDataContext } from "@/app/layout";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Page() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/products"), [router]);

  const { products, setProducts, carts, setCarts } = useContext(globalDataContext);

  const addToCart = (product: Product) => {
    //remove product from products
    const remain = products.filter((p: Product) => p.id !== product.id);
    setProducts(remain);

    //append product to carts
    setCarts([...carts, product]);
  };

  return (
    <div className="w-3xl max-w-full mx-auto mt-4 h-120 overflow-y-auto bg-cyan-50 border-2 border-cyan-200 rounded-xl">
      <div className="grid grid-cols-5 gap-3 p-3">
        {products.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            buttonLabel="Add to Carts"
            color="green"
            onClick={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}
