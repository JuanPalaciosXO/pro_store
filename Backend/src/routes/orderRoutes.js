import express from "express";
import { create, getOrders, getOrder, updateOrder } from "../controllers/crtlOrder.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import esAdmin from "../middlewares/esAdmin.js"

const router = express.Router();

router.post("/orders", authMiddleware, create);
router.get("/orders", authMiddleware, getOrders);
router.get("/orders/:id", authMiddleware, getOrder);
router.patch("/orders/:id/status", authMiddleware, esAdmin, updateOrder);

export default router;  