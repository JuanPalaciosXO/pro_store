function ProductoCard({ producto, esAdmin, onEditar, onEliminar}){
    return(
        <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg">{producto.nombre_producto}</h3>
        <p className="text-gray-500 text-sm">{producto.descripcion}</p>
        <p className="text-gray-400 text-sm">Categoría: {producto.categoria}</p>
        <div className="flex justify-between items-center mt-2">
            <span className="text-blue-600 font-bold">
            ${producto.precio.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">
            Stock: {producto.stock}
            </span>
        </div>

        {/* Solo el admin ve estos botones */}
        {esAdmin && (
            <div className="flex gap-2 mt-2">
            <button
                onClick={() => onEditar(producto)}
                className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500 text-sm"
            >
                Editar
            </button>
            <button
                onClick={() => onEliminar(producto.id_producto)}
                className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
            >
                Eliminar
            </button>
            </div>
        )}
        </div>
    )
}

export default ProductoCard