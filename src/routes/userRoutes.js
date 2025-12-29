import express from "express";
import userController from "../controllers/crtlUser.js";
import validarCampos from "../middlewares/validarCampos.js";
import { registerValidator, loginValidator } from "../validators/userValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerValidator,validarCampos,userController.register);
router.post("/login", loginValidator,validarCampos,userController.login);
router.get("/perfil", authMiddleware, (req, res) => {
    res.json({
        msg: "Acceso permitido",
        usuario: req.usuario
    });
});

export default router;