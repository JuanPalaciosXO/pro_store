import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { registerRequest } from "../services/authService"

function RegisterPage(){
    const [form, setForm] = useState({
        NID_cliente: '',
        nombre_cliente: '',
        apellido_cliente: '',
        correo_cliente: '',
        telefono_cliente: '',
        direccion_cliente: '',
        password: '',
        rol: 'cliente',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setError('')
        setLoading(true)

        try{
            await registerRequest(form)
            navigate('/login')
        } catch(err){
            setError(err.response?.data?.msg || "Error al registrarse")
        } finally{
            setLoading(false)
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Crear cuenta</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <div>
            <label className="block text-sm font-medium mb-1">Cédula</label>
            <input
              name="NID_cliente"
              type="number"
              value={form.NID_cliente}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123456789"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              name="telefono_cliente"
              type="number"
              value={form.telefono_cliente}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="3201234567"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              name="nombre_cliente"
              value={form.nombre_cliente}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Juan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input
              name="apellido_cliente"
              value={form.apellido_cliente}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pérez"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Correo</label>
            <input
              name="correo_cliente"
              type="email"
              autoComplete="email"
              value={form.correo_cliente}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Dirección</label>
            <input
              name="direccion_cliente"
              autoComplete="street-address"
              value={form.direccion_cliente}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Calle 123"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••"
              required
            />
          </div>

          {error && (
            <p className="col-span-2 text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>

          <p className="col-span-2 text-center text-sm text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>

        </form>
      </div>
    </div>
    )
}

export default RegisterPage