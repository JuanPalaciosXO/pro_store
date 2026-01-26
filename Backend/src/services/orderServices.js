import db from "../config/db.js";

export const createOrder = async (id_cliente, productos) => {
  if (!productos || productos.length === 0) {
    throw new Error("ORDER_EMPTY");
  }

  let total = 0;
  const productosConPrecio = [];

  for (const item of productos) {
    const { id_producto, cantidad } = item;

    const [rows] = await db.query(
      "SELECT precio FROM products WHERE id_producto = ?",
      [id_producto]
    );

    if (rows.length === 0) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const precio = rows[0].precio;
    const subtotal = precio * cantidad;

    total += subtotal;

    productosConPrecio.push({
      id_producto,
      cantidad,
      precio
    });
  }

  const [orderResult] = await db.query(
    "INSERT INTO orders (id_cliente, total) VALUES (?, ?)",
    [id_cliente, total]
  );

  const id_order = orderResult.insertId;

  for (const item of productosConPrecio) {
    await db.query(
      `INSERT INTO order_items 
       (id_order, id_producto, cantidad, precio)
       VALUES (?, ?, ?, ?)`,
      [
        id_order,
        item.id_producto,
        item.cantidad,
        item.precio
      ]
    );
  }

  return {
    id_order,
    total,
    estado: "pendiente"
  };
};

export const getOrdersByUser = async (id_cliente, rol) =>{
    let ordersQuery;
    let params = [];

    if (rol === "admin") {
        ordersQuery = "select * from orders order by created_at desc"
    }else{
        ordersQuery = 
        `SELECT * FROM orders 
        WHERE id_cliente = ?
        ORDER BY created_at DESC`;

        params = [id_cliente];
    }

    const [orders] = await db.query(ordersQuery, params);

    for (const order of orders){
        const [items] = await db.query(
        `SELECT 
        oi.id_item,
        oi.cantidad,
        oi.precio,
        p.nombre
      FROM order_items oi
      JOIN products p ON oi.id_producto = p.id_producto
      WHERE oi.id_order = ?`,
      [order.id_order]
        );
        order.items = items;
    }

    return orders;
};

export const getOrderById = async (id_order, id_cliente, rol) =>{
    let orderQuery;
    let params;

    if (rol === "cliente") {
        orderQuery = 
        `select * from orders 
        where id_order = ? and id_cliente = ?`;
        params = [id_order, id_cliente];    
    }else{
        orderQuery = 
        `select * from orders 
        where id_order = ?`;
        params = [id_order];
    }

    const [orders] = await db.query(orderQuery, params);

    if (orders.length === 0) {
        throw new Error("ORDER_NOT_FOUND");
    }

    const order = orders [0];

    const [items] = await db.query(
    `SELECT 
      oi.id_item,
      oi.cantidad,
      oi.precio,
      p.nombre
    FROM order_items oi
    JOIN products p ON oi.id_producto = p.id_producto
    WHERE oi.id_order = ?`, [id_order]
    );

    order.items = items;

    return order;
}

export const updateOrderStatus = async (id_order, estado) =>{
    const estadosValidos = ["pendiente", "pagado", "cancelado"];

    if (!estadosValidos.includes(estado)) {
        throw new Error("INVALID_STATUS");
    }

    const [rows] = await db.query(
        "select id_order from orders where id_order = ?",
        [id_order]
    );

    if(rows.length === 0){
        throw new Error("ORDER_NOT_FOUND");
    }

    await db.query(
        "update orders set estado = ? where id_order = ?",
        [estado, id_order]
    );

    return {
        id_order,
        estado
    };
};
