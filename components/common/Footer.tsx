export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article>
            <h3 className="text-lg font-semibold mb-4">
              Joshua Alvarez 
            </h3>
            <p className="text-gray-400 text-sm">
              Esto fue desarrollado con NextJs, TypeScript y TailwindCSS.
            </p>
          </article>

          <article>
            <h4 className="text-md font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="hover:text-white transition-colors"
                >
                  Productos
                </a>
              </li>
              <li>
                <a
                  href="/new_product"
                  className="hover:text-white transition-colors"
                >
                  Agregar Producto
                </a>
              </li>
            </ul>
          </article>

          <article>
            <h4 className="text-md font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📧 joshuayherrera@gmail.com</li>
              <li>📞 +51 935 427 263</li>
              <li>📍 Lima, Perú</li>
            </ul>
          </article>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>
            Desarrollado con ♥️ por <span className="font-bold text-white">Joshua Alvarez Herrera</span> 
          </p>
        </div>
      </div>
    </footer>
  );
}
