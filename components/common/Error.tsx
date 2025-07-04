"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Oops! Algo salió mal
        </h2>

        <p className="text-gray-600 mb-6">
          Ha ocurrido un error inesperado. No te preocupes, puedes intentar
          nuevamente.
        </p>

        {process.env.NODE_ENV === "development" && (
          <details className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
            <summary className="cursor-pointer font-medium text-gray-800 mb-2">
              Detalles del error (desarrollo)
            </summary>
            <pre className="text-sm text-red-600 whitespace-pre-wrap">
              {error.message}
            </pre>
          </details>
        )}

        <div className="space-y-4">
          <button
            onClick={reset}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Intentar de nuevo
          </button>

          <a
            href="/"
            className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
