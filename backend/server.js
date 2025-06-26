require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión a MongoDB:", err));

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  carrera: String,
  telefono: String,
  fecha: String,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/enviar", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Datos guardados correctamente" });
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    res.status(500).json({ mensaje: "❌ Error al guardar en la base de datos", error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
