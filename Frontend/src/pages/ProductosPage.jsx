import { useAuth } from "../context/AuthContext"

function ProductosPage(){
    const { usuario, logout } = useAuth()

    return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Pro Store</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            Hola, {usuario?.nombre} — {usuario?.rol}
          </span>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>
        <p className="text-gray-500">Aquí van los productos...</p>
      </main>
    </div>
  )
}

export default ProductosPage