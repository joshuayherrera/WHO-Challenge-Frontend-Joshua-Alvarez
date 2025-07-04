"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import Spinner from "@/components/common/Spinner";
import Link from "next/link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import {
  ChevronLeft,
  Heart,
  Share2,
  BarChart3,
  ZoomIn,
  Star,
  Minus,
  Plus,
  Loader2,
  CheckCircle,
  Info,
  Shield,
  Truck,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const id = Number(params.id);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError("Error al cargar el producto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = async () => {
    if (product && quantity > 0) {
      setIsAddingToCart(true);

      setTimeout(() => {
        for (let i = 0; i < quantity; i++) {
          dispatch({ type: "ADD_ITEM", payload: product });
        }
        setIsAddingToCart(false);
        const toast = document.createElement("div");
        toast.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
        toast.textContent = `${quantity} producto(s) agregado(s) al carrito`;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.remove("translate-x-full"), 100);
        setTimeout(() => {
          toast.classList.add("translate-x-full");
          setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
      }, 800);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p>{error || "Producto no encontrado"}</p>
        <Link href="/products" className="text-blue-600 mt-4 inline-block">
          Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
            <span className="text-gray-300">›</span>
            <Link
              href="/products"
              className="text-gray-500 hover:text-gray-700"
            >
              Productos
            </Link>
            <span className="text-gray-300">›</span>
            <span className="text-blue-600 font-medium">
              {product.category}
            </span>
            <span className="text-gray-300">›</span>
            <span className="text-gray-700 truncate max-w-xs">
              {product.title}
            </span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <section className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Volver a productos
            </Link>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={toggleWishlist}
                className={`flex items-center px-2 md:px-4 py-2 rounded-lg transition-all ${
                  isWishlisted
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart
                  className="w-5 h-5 md:mr-2"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
                <span className="hidden md:inline">
                  {isWishlisted ? "En favoritos" : "Favoritos"}
                </span>
              </button>

              <button className="flex items-center px-2 md:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Compartir</span>
              </button>

              <button className="flex items-center px-2 md:px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <BarChart3 className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Comparar</span>
              </button>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative aspect-square bg-gray-50">
                <Zoom classDialog="custom-zoom" zoomMargin={40}>
                  <img
                    src={product.images[selectedImage] || product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </Zoom>

                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                    -{Math.round(product.discountPercentage)}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full pointer-events-none transition-all duration-300 hover:bg-opacity-70 z-10">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {product.images.length > 1 && (
                <div className="p-4 bg-gray-50 border-t">
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 relative ${
                          selectedImage === index
                            ? "border-blue-500 ring-2 ring-blue-200"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Zoom zoomMargin={20}>
                          <img
                            src={image}
                            alt={`${product.title} imagen ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </Zoom>

                        {selectedImage === index && (
                          <div className="absolute inset-0 bg-blue-500 bg-opacity-20 pointer-events-none" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="lg:col-span-1">
            <article className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <header className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wide">
                    {product.category}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      ({product.rating}/5)
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                  {product.title}
                </h1>

                <p className="text-gray-600">
                  Marca: <span className="font-semibold">{product.brand}</span>
                </p>
              </header>

              <section className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-black text-gray-900">
                    S/. {product.price.toFixed(2)}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Ahorra {Math.round(product.discountPercentage)}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">Precio incluye IGV</p>
              </section>

              <section className="mb-6">
                <div
                  className={`flex items-center p-3 rounded-lg ${
                    product.stock > 10
                      ? "bg-green-50 text-green-800"
                      : product.stock > 0
                      ? "bg-yellow-50 text-yellow-800"
                      : "bg-red-50 text-red-800"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold">
                    {product.stock > 0
                      ? `${product.stock} disponibles`
                      : "Sin stock"}
                  </span>
                </div>
              </section>

              {product.stock > 0 && (
                <section className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg content-center">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[60px] text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </section>
              )}

              <section className="space-y-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isAddingToCart}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform ${
                    product.stock > 0
                      ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } ${isAddingToCart ? "animate-pulse" : ""}`}
                >
                  {isAddingToCart ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                      Agregando...
                    </span>
                  ) : product.stock > 0 ? (
                    `Agregar ${quantity} al Carrito`
                  ) : (
                    "Producto Agotado"
                  )}
                </button>

                <button className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  Comprar Ahora
                </button>
              </section>

              <section className="border-t pt-6 space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Truck className="w-5 h-5 mr-3 text-green-500" />
                  Envío gratis en pedidos mayores a S/. 100
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Info className="w-5 h-5 mr-3 text-blue-500" />
                  Garantía de 30 días
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-5 h-5 mr-3 text-purple-500" />
                  Pago 100% seguro
                </div>
              </section>
            </article>
          </div>
        </div>

        <section className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Descripción del Producto
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
