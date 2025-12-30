import express from "express";
import productController from "../controllers/crtlProduct.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import esAdmin from "../middlewares/esAdmin.js";

const router = express.Router();

router.get("/products", productController.getProduct);
router.get("/products/:id", productController.getProductById);
router.post("/products", authMiddleware,esAdmin,productController.createProduct);
router.put("/products/:id", authMiddleware, esAdmin, productController.updateProduct);
router.delete("/products/:id", authMiddleware, esAdmin, productController.deleteProduct);


export default router;

