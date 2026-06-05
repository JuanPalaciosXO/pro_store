import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import ProductoCard from "../components/ProductoCard"
import { 
    getProductsRequest, 
    createProductRequest, 
    updateProductRequest, 
    deleteProductRequest 
    } from "../services/productService"

const FORM_INICIAL = {
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoria: ""
}

function ProductosPage(){
    const { usuario, token, logout } = useAuth()
    const esAdmin = usuario?.rol === "admin"

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const [mostrarForm, setMostrarForm] = useState(false)
    const [form, setForm] = useState(FORM_INICIAL)
    const [editando, setEditando] = useState(null)

    useEffect(()=>{
        cargarProductos()
    }, [])

    const cargarProductos = async () =>{
        try{
            setLoading(true)
            const data = await getProductsRequest()
            setProductos(data)
        }catch(err){
            setError("Error al cargar productos")
        }finally{
            setLoading(false)
        }
    }

    const handleFormChange = async(e) =>{
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            if(editando){
                await updateProductRequest(editando, form, token)
            }else{
                await createProductRequest(form, token)
            }

            await cargarProductos()
            setForm(FORM_INICIAL)
            setEditando(null)
            setMostrarForm(false)
        }catch(err){
            setError(err.response?.data?.msg || "Error al guardar el producto")
        }
    }

    const handleEditar = (producto) =>{
        setForm({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            categoria: producto.categoria
        })
        setEditando(producto.id_producto)
        setMostrarForm(true)
    }

    const handleEliminar = async(id) =>{
        if (!confirm("¿Seguro que quiere eliminar este producto?")) return
        try{
            await deleteProductRequest(id, token)
            await cargarProductos()
        } catch(err){
            setError("Error al eliminar el producto")
        }
    }

    return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
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

      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Productos</h2>
          {esAdmin && (
            <button
              onClick={() => {
                setForm(FORM_INICIAL)
                setEditando(null)
                setMostrarForm(!mostrarForm)
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {mostrarForm ? 'Cancelar' : '+ Nuevo producto'}
            </button>
          )}
        </div>

        {mostrarForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow mb-6 grid grid-cols-2 gap-4"
          >
            <h3 className="col-span-2 font-bold text-lg">
              {editando ? 'Editar producto' : 'Nuevo producto'}
            </h3>

            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Categoría</label>
              <input
                name="categoria"
                value={form.categoria}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                rows={2}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Precio</label>
              <input
                name="precio"
                type="number"
                value={form.precio}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleFormChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            {error && (
              <p className="col-span-2 text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {editando ? 'Guardar cambios' : 'Crear producto'}
            </button>
          </form>
        )}

        {loading && <p className="text-center text-gray-500">Cargando productos...</p>}
        {error && !mostrarForm && <p className="text-center text-red-500">{error}</p>}

        {/* Grid de productos */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productos.map(producto => (
              <ProductoCard
                key={producto.id_producto}
                producto={producto}
                esAdmin={esAdmin}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default ProductosPage