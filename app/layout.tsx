"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "@/data/products";
import type { Product } from "@/data/products";
import { Badge } from "@/components/tailgrids/core/badge";
import { doLogout } from "@/utils/login";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => {
        console.log(error);
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleLogout = () => {
    doLogout(router, "/login")
  }

  return (
    <html lang="en">
      <body>
        <globalDataContext.Provider
          value={{ products, setProducts, carts, setCarts }}
        >
          <Header />

          <nav className="mt-4 flex justify-center gap-4">
            <Link
              href="/"
              className={buttonStyles({
                appearance: pathname === "/" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Home
            </Link>

            <Link
              href="/animation"
              className={buttonStyles({
                appearance: pathname === "/animation" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Animation
            </Link>

            <Link
              href="/calculator"
              className={buttonStyles({
                appearance: pathname === "/calculator" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Calculator
            </Link>

            <Link
              href="/todos"
              className={buttonStyles({
                appearance: pathname === "/todos" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Todos
            </Link>

            <Link
              href="/products"
              className={buttonStyles({
                appearance: pathname === "/products" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Products ({products.length})
            </Link>
            <div className="relative">
              <Link
                href="/carts"
                className={buttonStyles({
                  appearance: pathname === "/carts" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm",
                })}
              >
                Carts
              </Link>
              <Badge size={"sm"}
              className="absolute -top-2 -right-2 bg-red-500 text-white"
              >
                {carts.length}
              </Badge>
            </div>

                <Button
                  appearance="outline"
                  variant="danger"
                  size="sm"
                  className="ml-1"
                  onClick={() => handleLogout()}
                >
                  Logout
                  </Button>


          </nav>

          <main>{children}</main>

          <Footer />
        </globalDataContext.Provider>
      </body>
    </html>
  );
}
