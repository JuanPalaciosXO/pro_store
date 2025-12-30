import db from "../config/db.js";

const createProduct = async (req, res) =>{
    const {nombre, descripcion, precio, stock} = req.body;

    if(!nombre || !precio || !stock){
        return res.status(400).json({msg:"Campos obligatorios faltantes"});

    }

    try{
    await db.query(
        `INSERT INTO products(nombre, descripcion, precio, stock)
        VALUES(?, ?, ?, ?)`,
        [nombre, descripcion, precio, stock]
    );
    res.status(201).json({msg:"Producto añadido correctamente"});
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Error al añadir el producto"});
    }
};

const getProduct = async (req, res) =>{
    try{
        const [products] = await db.query("select * from products");
        res.json(products);
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Error al obtener productos"})
    }
};

//producto por id
const getProductById = async (req, res) =>{
    const { id } = req.params;

    try{
        const [rows] = await db.query(
            "select * from products where id_producto = ?", [id]
        );
    
        if (rows.length ===0) {
            return res.status(404).json({msg:"Producto no encontrado"});
        }

        res.json(rows[0]);
    }catch(error){
        res.status(500).json({msg:"Error al obtener el producto"});
    }
};

const updateProduct = async (req, res) =>{
    const { id } = req.params;
    const { nombre, descripcion, precio, stock} = req.body;

    try{
        const [existe] = await db.query(
            "select * from products where id_producto = ?", [id]
        );

        if (existe.length ===0) {
            return res.status(404).json({msg:"Producto no encontrado"});
        }

        await db.query(
            `update products
             set nombre = ?, descripcion = ?, precio = ?, stock = ?
             where id_producto = ?`,
            [nombre, descripcion, precio, stock, id]
        );
        res.json({msg:"Producto actualizado correctamente"});

    }catch(error){
        console.error(error);
        res.status(500).json({msg: "Error al actualizar el producto"});
    }
};

const deleteProduct = async (req, res) =>{
    const {id} = req.params;

    try{
        const[rows] = await db.query(
            "select * from products where id_producto = ?", [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({msg:"Producto no encontrado"});
        }

        await db.query(
            "delete from products where id_producto= ?", [id]
        );
        res.json({msg:"Producto eliminado correctamente"});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Error al eliminar el producto"})
    }
};

export default{
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}