import { createOrder, 
        getOrdersByUser, 
        getOrderById, 
        updateOrderStatus } 
        from "../services/orderServices.js";

export const create = async (req, res) => {
  try {
    const id_cliente = req.usuario.id_cliente;
    const { productos } = req.body;

    const order = await createOrder(id_cliente, productos);

    res.status(201).json({
      msg: "Pedido creado correctamente",
      order
    });

  } catch (error) {
    if (error.message === "ORDER_EMPTY") {
      return res.status(400).json({ msg: "El pedido está vacío" });
    }

    if (error.message === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({ msg: "Producto no encontrado" });
    }

    console.error(error);
    res.status(500).json({ msg: "Error al crear el pedido" });
  }
};

export const getOrders = async (req, res) =>{
    try{
        const {id_cliente, rol} = req.usuario;

        const orders = await getOrdersByUser(id_cliente, rol);

        res.json({
            total: orders.length,
            orders
        });
    }catch(error){
        console.error(error);
        res.status(500).json({msg: "Error al obtener pedidos"});
    }
};

export const getOrder = async (req, res) =>{
    try{
        const {id} = req.params;
        const {id_cliente, rol} = req.usuario;

        const order = await getOrderById(id, id_cliente, rol);

        res.json(order);
    }catch(error){
        if (error.message === "ORDER_NOT_FOUND") {
            return res.status(404).json({msg: "Pedido no encontrado"});
        }

        console.error(error);
        res.status(500).json({msg: "Error al obtener el pedido"});
    }
};

export const updateOrder = async (req, res) =>{
    try{
        const {id} = req.params;
        const {estado} = req.body;

        const order = await updateOrderStatus(id, estado);

        res.json({
            msg:"Estado del pedido actualizado", order
        });

    }catch(error){
        if (error.message === "INVALID_STATUS") {
            res.status(400).json({msg: "Estado no válido"});
        }

        if (error.message === "ORDER_NOT_FOUND") {
            res.status(404).json({msg: "Pedido no encontrado"});
        }

        console.error(error);
        res.status(500).json({msg: "Error al actualizar pedido"});
    }
};