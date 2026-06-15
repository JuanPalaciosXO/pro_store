import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { createOrderRequest } from "../services/orderService";

function CarritoPage(){
    const { token } = useAuth()
    const { carrito, quitarDelCarrito, eliminarCarrito, vaciarCarrito, agregarCarrito, totalItems, totalPrecio } = useCart()
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [exito, setExito] = useState(false)

    const handleConfirmar = async () =>{
        setLoading(true)
        setError('')

        try{
            const productos = carrito.map(item =>({
                id_producto: item.id_producto,
                cantidad: item.cantidad
            }))

            await createOrderRequest(productos, token)

            vaciarCarrito()
            setExito(true)
        }catch(err){
            setError(err.response?.data?.msg || "Error al realizar el pedido")
        }finally{
            setLoading(false)
        }
    }

    if(exito){
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2">¡Pedido realizado!</h2>
                <p className="text-gray-500 mb-6">Tu pedido fue confirmado exitosamente.</p>
                <button
                    onClick={() => navigate('/productos')}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Seguir comprando
                </button>
                </div>
            </div>
        )
    }

    if (carrito.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
                <div className="text-5xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-6">Agrega productos para continuar.</p>
                <button
                    onClick={() => navigate('/productos')}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Ver productos
                </button>
                </div>
            </div>
        )
    }

    return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Pro Store</h1>
        <button
          onClick={() => navigate('/productos')}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Volver a productos
        </button>
      </nav>

      <main className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">
          Tu carrito ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </h2>

        <div className="bg-white rounded-lg shadow mb-4">
          {carrito.map(item => (
            <div
              key={item.id_producto}
              className="flex items-center justify-between p-4 border-b last:border-b-0"
            >
              <div className="flex-1">
                <p className="font-medium">{item.nombre_producto}</p>
                <p className="text-sm text-gray-500">
                  ${item.precio.toLocaleString()} x {item.cantidad}
                </p>
              </div>

              <div className="flex items-center gap-2 mx-4">
                <button
                  onClick={() => quitarDelCarrito(item.id_producto)}
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">{item.cantidad}</span>
                <button
                  onClick={()=> agregarCarrito(item)}
                  className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 font-bold"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-blue-600">
                  ${(item.precio * item.cantidad).toLocaleString()}
                </p>
                <button
                  onClick={() => eliminarCarrito(item.id_producto)}
                  className="text-xs text-red-500 hover:underline mt-1"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-bold text-blue-600">
              ${totalPrecio.toLocaleString()}
            </span>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleConfirmar}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Procesando...' : 'Confirmar pedido'}
        </button>
      </main>
    </div>
  )
}

export default CarritoPage