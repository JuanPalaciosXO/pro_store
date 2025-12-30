const esAdmin = (req, res, next) => {
  if (req.usuario.rol !== "admin") {
    return res.status(403).json({
      msg: "Acceso denegado: solo administradores",
    });
  }
  next();
};

export default esAdmin;
