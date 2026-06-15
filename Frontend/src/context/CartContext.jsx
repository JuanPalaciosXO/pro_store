import { createContext, useState, useContext } from "react";

const CartContext = createContext()

export function CartProvider({ children }){
    const [carrito, setCarrito] = useState([])

    const agregarCarrito = (producto) =>{
        setCarrito(prev =>{
            const existe = prev.find(item => item.id_producto === producto.id_producto)

            if(existe){
                return prev.map(item =>
                    item.id_producto === producto.id_producto
                    ? {...item, cantidad: item.cantidad + 1}
                    : item
                )
            }

            return [...prev, {...producto, cantidad: 1}]
        })
    }

    const quitarDelCarrito = (id_producto) =>{
        setCarrito(prev =>{
            const existe = prev.find(item => item.id_producto === id_producto)

            if(existe.cantidad === 1){
                return prev.filter(item => item.id_producto !== id_producto)
            }

            return prev.map(item =>
                    item.id_producto === id_producto
                    ? {...item, cantidad: item.cantidad - 1}
                    : item
                )
        })
    }

    const eliminarCarrito = (id_producto) =>{
        setCarrito(prev => prev.filter(item => item.id_producto !== id_producto))
    }

    const vaciarCarrito = () => setCarrito([])

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    return(
        <CartContext.Provider value = {{
            carrito,
            agregarCarrito,
            quitarDelCarrito,
            eliminarCarrito,
            vaciarCarrito,
            totalItems,
            totalPrecio,
        }}> {children}
        </CartContext.Provider>
    )
}

export function useCart(){
    return useContext(CartContext)
}