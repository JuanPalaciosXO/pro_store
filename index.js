import express from "express";
import conectarDB from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", userRoutes);


app.get("/", (req, res) =>{
    res.send(`<h1>Servidor corriendo en el puerto ${PORT}</h1>`)
})
app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})

