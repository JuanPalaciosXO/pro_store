import express from "express";
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);


app.get("/", (req, res) =>{
    res.send(`<h1>Servidor corriendo en el puerto ${PORT}</h1>`)
})
app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`)
})

