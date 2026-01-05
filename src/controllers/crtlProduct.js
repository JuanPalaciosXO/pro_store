import db from "../config/db.js";
import productServices from "../services/productServices.js";

const createProduct = async (req, res) =>{
    try{
    const product = await productServices.createProduct(req.body);
    res.status(201).json({msg:"Producto añadido correctamente", product});
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Error al añadir el producto"});
    }
};

const getProducts = async (req, res) =>{
    try{
        const products = await productServices.getAllProduct();
        res.json(products);
    }catch(error){
        console.error(error);
        res.status(500).json({msg:"Error al obtener productos"})
    }
};

//producto por id
const getProduct = async (req, res) =>{
    try{
        const product = await productServices.getProductById(req.params.id);
    
        if (!product) {
            return res.status(404).json({msg:"Producto no encontrado"});
        }

        res.json(product);
    }catch(error){
        res.status(500).json({msg:"Error al obtener el producto"});
    }
};

const updateProduct = async (req, res) =>{
   try{
        const updated = await productServices.updateProduct(
            req.params.id, req.body
        );

        if (!updated) {
            return res.status(404).json({msg:"Producto no encontrado"});
        }
        
        res.json({msg:"Producto actualizado correctamente"});
    }catch(error){
        res.status(500).json({msg: "Error al actualizar el producto"});
    }
};

const deleteProduct = async (req, res) =>{
    try{
        const deleted = await productServices.deleteProduct(req.params.id);

        if (!deleted) {
            return res.status(404).json({msg:"Producto no encontrado"});
        }

        res.json({msg:"Producto eliminado correctamente"});
    }catch(error){
        res.status(500).json({msg:"Error al eliminar el producto"})
    }
};

export default{
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}