"use client";

import { getProducts } from "@/lib/api";
import { Product } from "@/types";
import Link from "next/link";
import SplitText from "../ui/SplitText";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";

export default function FeaturedProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getProducts();
        setProducts(allProducts.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center mb-12">
          <SplitText
            text="Productos Destacados"
            className="text-3xl font-bold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Ver todos →
          </Link>
        </header>

        <article className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="group"
            >
              <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">
                      S/. {product.price}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm text-gray-600">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </article>
      </div>
    </section>
  );
}
