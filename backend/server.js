// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Configuración CORS para aceptar solicitudes desde cualquier origen
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch((err) => console.error("❌ Error de conexión a MongoDB:", err));

// Esquema del formulario
const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  carrera: String,
  telefono: String,
  fecha: String,
});

// Modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Ruta para guardar datos
app.post("/enviar", async (req, res) => {
  try {
    const { nombre, email, carrera, telefono, fecha } = req.body;
    const nuevoUsuario = new Usuario({ nombre, email, carrera, telefono, fecha });
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Datos guardados correctamente en MongoDB Atlas" });
  } catch (error) {
    console.error("❌ Error al guardar en MongoDB:", error);
    res.status(500).json({ mensaje: "❌ Error al guardar datos" });
  }
});

// Puerto
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
