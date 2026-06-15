import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getOrderRequest, updateOrderRequest } from "../services/orderService";

const ESTADO_ESTILOS = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    pagado: 'bg-blue-100 text-blue-800',
    enviado: 'bg-purple-100 text-purple-800',
    entregado: 'bg-green-100 text-green-800',
    cancelado: 'bg-red-100 text-red-800',
}

const ESTADOS = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado']

function AdminPage(){
    const {usuario, token, logout} = useAuth()
    const navigate = useNavigate()

    const [ordenes, setOrdenes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() =>{
        if(usuario?.rol !== "admin"){
            navigate('/productos')
        }
    }, [usuario])

    useEffect(() =>{
        cargarOrdenes()
    }, [])
    
    const cargarOrdenes = async () =>{
        try {
            setLoading(true)
            const data = await getOrderRequest(token)
            setOrdenes(data)
        } catch (err) {
            setError("Error al cargar los pedidos")
        } finally{
            setLoading(false)
        }
    }

    const handleEstado = async (id, nuevoEstado) =>{
        try {
            await updateOrderRequest(id, nuevoEstado, token)
            setOrdenes(prev =>
                prev.map(orden=>
                    orden.id_order === id
                    ? {...orden, estado: nuevoEstado }
                    : orden
                )
            )
        } catch (err) {
            setError("Error al actualizar el estado")
        }
    }

    return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Pro Store — Admin</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/productos')}
            className="text-sm text-blue-600 hover:underline"
          >
            Ver productos
          </button>
          <span className="text-sm text-gray-600">{usuario?.nombre_cliente}</span>
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Pedidos</h2>

        {loading && <p className="text-center text-gray-500">Cargando pedidos...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && ordenes.length === 0 && (
          <p className="text-center text-gray-500">No hay pedidos todavía.</p>
        )}

        <div className="flex flex-col gap-4">
          {ordenes.map(orden => (
            <div key={orden.id_order} className="bg-white rounded-lg shadow p-4">

              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold">Pedido #{orden.id_order}</p>
                  <p className="text-sm text-gray-500">
                    Cliente: {orden.nombre_cliente || orden.id_cliente}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${ESTADO_ESTILOS[orden.estado] || 'bg-gray-100'}`}>
                  {orden.estado}
                </span>
              </div>

              {orden.productos && (
                <div className="border-t pt-3 mb-3">
                  {orden.productos.map((p, i) => (
                    <div key={i} className="flex justify-between text-sm text-gray-600 py-1">
                      <span>{p.nombre_producto} x{p.cantidad}</span>
                      <span>${(p.precio * p.cantidad).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center border-t pt-3">
                <span className="font-bold text-blue-600">
                  Total: ${orden.total?.toLocaleString() || '—'}
                </span>

                <select
                  value={orden.estado}
                  onChange={(e) => handleEstado(orden.id_order, e.target.value)}
                  className="text-sm border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {ESTADOS.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default AdminPage