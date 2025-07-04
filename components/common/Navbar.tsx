"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Menu, ShoppingCart, Trash2 } from "lucide-react";

export default function Navbar() {
  const { state, dispatch } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
          <h1 className="text-base font-bold md:text-2xl">Joshua Alvarez</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="hover:text-blue-500 transition-colors font-medium"
          >
            Inicio
          </Link>
          <Link
            href="/products"
            className="hover:text-blue-500 transition-colors font-medium"
          >
            Productos
          </Link>
          <Link
            href="/new_product"
            className="hover:text-blue-500 transition-colors font-medium"
          >
            Agregar Producto
          </Link>

          {/* Carrito */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ShoppingCart />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/products"
              className="hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/new_product"
              className="hover:text-blue-500 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Agregar Producto
            </Link>
            <button
              onClick={() => {
                setIsCartOpen(!isCartOpen);
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between hover:text-blue-500 transition-colors font-medium"
            >
              <span>Carrito</span>
              <span className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Carrito desplegable - Desktop */}
      {isCartOpen && (
        <div className="absolute right-4 top-20 w-80 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg shadow-xl z-50 border border-neutral-200 dark:border-neutral-800 hidden md:block">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Carrito de Compras</h3>

            {state.items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Tu carrito está vacío
              </p>
            ) : (
              <>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-2 border-b border-neutral-200 dark:border-neutral-700"
                    >
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {item.quantity} x S/. {item.price}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: item.id })
                        }
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 width={20} height={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-lg">
                      S/.{" "}
                      {state.items
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Proceder al Pago
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Carrito desplegable - Mobile */}
      {isCartOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 p-4">
          <h3 className="text-lg font-semibold mb-4">Carrito de Compras</h3>

          {state.items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Tu carrito está vacío
            </p>
          ) : (
            <>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {state.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 p-2 border-b border-neutral-200 dark:border-neutral-700"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x S/. {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE_ITEM", payload: item.id })
                      }
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">
                    S/.{" "}
                    {state.items
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
                <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Proceder al Pago
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
