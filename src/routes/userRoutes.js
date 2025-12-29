import express from "express";
import userController from "../controllers/crtlUser.js";
import validarCampos from "../middlewares/validarCampos.js";
import { registerValidator, loginValidator } from "../validators/userValidator.js";

const router = express.Router();

router.post("/register", registerValidator,validarCampos,userController.register);
router.post("/login", loginValidator,validarCampos,userController.login);

export default router;