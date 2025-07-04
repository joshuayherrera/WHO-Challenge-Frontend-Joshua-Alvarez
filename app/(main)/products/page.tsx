import { getProducts } from "@/lib/api";
import { Product } from "@/types";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <article className="container mx-auto p-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Catálogo de producto de la API DummyJson
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Aquí encontraras cientos de productos de todo tipo. Elige el que más
          te guste! (Te recomiendo los que tienen mejor review) 🤣
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group block"
          >
            <article className="relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2 group-hover:scale-[1.02] transform-gpu">
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}

              <div
                className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
                  product.stock > 10
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : product.stock > 0
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}
              </div>

              <figure className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </figure>

              <div className="p-5">
                <header className="mb-4">
                  <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2 opacity-70">
                    {product.category}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {product.title}
                  </h2>
                </header>

                <section className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-gray-900 group-hover:scale-110 transition-transform duration-300 origin-left">
                      S/. {product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm transition-all duration-300 delay-${
                          i * 50
                        } ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 group-hover:scale-125"
                            : "text-gray-300"
                        }`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-600 ml-1 font-medium">
                      {product.rating}
                    </span>
                  </div>
                </section>
              </div>

              <aside className="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0 flex flex-col justify-center">
                <div className="text-center space-y-4">
                  <header>
                    <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {product.title}
                    </h3>
                  </header>

                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-center gap-1 my-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg transition-all duration-300 delay-${
                          i * 50
                        } ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 animate-pulse"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-sm text-gray-700 ml-2 font-semibold">
                      {product.rating} / 5.0
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-black text-indigo-600">
                      S/. {product.price}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{Math.round(product.discountPercentage)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                        product.stock > 10
                          ? "bg-emerald-100 text-emerald-800"
                          : product.stock > 0
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock > 0
                        ? `✓ ${product.stock} en stock`
                        : "✗ Sin stock"}
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105">
                      Ver detalles →
                    </span>
                  </div>
                </div>
              </aside>
            </article>
          </Link>
        ))}
      </section>
    </article>
  );
}