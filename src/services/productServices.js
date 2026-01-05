import db from "../config/db.js"

const createProduct = async (data) =>{
    const {nombre, descripcion, precio, stock} = data;

    const result = await db.query(
        "insert into products (nombre, descripcion, precio, stock) values (?, ?, ?, ?)",
        [nombre, descripcion, precio, stock]
    );

    return {
        nombre, descripcion, precio, stock
    };
};

const getAllProduct = async () =>{
    const [rows] = await db.query("select * from products");
    return rows;
};

const getProductById = async (id) =>{
    const [rows] = await db.query(
        "select * from products where id_producto = ?", [id]
    );

    return rows [0];
};

const updateProduct = async (id, data) =>{
    const {nombre, descripcion, precio, stock} = data;

    const [result] = await db.query(
        "UPDATE products SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?",
        [nombre, descripcion, precio, stock, id]
    );

    return result.affectedRows;
};

const deleteProduct = async (id) =>{
    const [result] = await db.query(
        "DELETE FROM products WHERE id_producto = ?", [id]
    );

    return result.affectedRows;
};

export default{
    createProduct,
    getAllProduct,
    getProductById,
    updateProduct,
    deleteProduct
}


