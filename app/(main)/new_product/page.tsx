"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Package,
  DollarSign,
  Tag,
  Building2,
  Archive,
  FileText,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const productSchema = z.object({
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  price: z
    .number({
      invalid_type_error: "El precio debe ser un número",
    })
    .positive("El precio debe ser positivo"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  category: z.string().min(1, "Selecciona una categoría"),
  brand: z.string().min(1, "La marca es requerida"),
  stock: z
    .number({
      invalid_type_error: "El stock debe ser un número",
    })
    .min(0, "El stock no puede ser negativo"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const showSuccessToast = () => {
    const toast = document.createElement("div");
    toast.className =
      "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
    toast.innerHTML = `
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
        ¡Producto registrado exitosamente!
      </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.remove("translate-x-full"), 100);
    setTimeout(() => {
      toast.classList.add("translate-x-full");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  };

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    console.log("Datos del producto validados y estructurados:", data);
    showSuccessToast();
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo
          </Link>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Agregar Nuevo Producto
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Completa los campos del formulario para agregar un nuevo producto
              a nuestro catálogo profesional.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Package className="w-6 h-6 mr-3 text-blue-500" />
                    Información del Producto
                  </h3>

                  <div className="mb-6">
                    <label
                      htmlFor="title"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      Título del Producto *
                    </label>
                    <div className="relative">
                      <input
                        id="title"
                        {...register("title")}
                        className="w-full border-2 border-gray-200 rounded-xl p-4 pl-4 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="Ej: Casco de Soldadura Miller Digital Elite"
                      />
                    </div>
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      Marca *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="brand"
                        {...register("brand")}
                        className="w-full border-2 border-gray-200 rounded-xl p-4 pl-12 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-400"
                        placeholder="Ej: Miller, Lincoln Electric, ESAB"
                      />
                    </div>
                    {errors.brand && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.brand.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      Categoría *
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                      <select
                        id="category"
                        {...register("category")}
                        className="w-full border-2 border-gray-200 rounded-xl p-4 pl-12 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg appearance-none bg-white"
                      >
                        <option value="">Selecciona una categoría</option>
                        <option value="auto-darkening">Auto-Oscurecible</option>
                        <option value="passive">Pasivo</option>
                        <option value="respiratory">Con Respirador</option>
                        <option value="grinding">Para Desbaste</option>
                        <option value="professional">Profesional</option>
                      </select>
                    </div>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <DollarSign className="w-6 h-6 mr-3 text-green-500" />
                    Precio y Stock
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="price"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Precio (S/.) *
                      </label>
                      <div className="relative">
                        <input
                          id="price"
                          type="number"
                          step="0.01"
                          {...register("price", { valueAsNumber: true })}
                          className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg placeholder-gray-400"
                          placeholder="S/. 299.99"
                        />
                      </div>
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="stock"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                      >
                        Stock Disponible *
                      </label>
                      <div className="relative">
                        <Archive className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          id="stock"
                          type="number"
                          {...register("stock", { valueAsNumber: true })}
                          className="w-full border-2 border-gray-200 rounded-xl p-4 pl-12 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg placeholder-gray-400"
                          placeholder="10"
                        />
                      </div>
                      {errors.stock && (
                        <p className="text-red-500 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.stock.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 text-purple-500" />
                    Descripción
                  </h3>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                      Descripción del Producto *
                    </label>
                    <textarea
                      id="description"
                      rows={8}
                      {...register("description")}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg placeholder-gray-400 resize-none"
                      placeholder="Describe las características principales del casco de soldadura, incluyendo especificaciones técnicas, materiales, certificaciones y características destacadas..."
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
                    Finalizar
                  </h3>

                  <div className="space-y-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Registrando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Registrar Producto
                        </>
                      )}
                    </button>

                    <Link
                      href="/products"
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center block hover:shadow-lg"
                    >
                      Cancelar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
