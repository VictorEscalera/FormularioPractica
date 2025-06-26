const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 🔥 CORS MANUAL (IGNORA "cors" package)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // o pon tu dominio exacto aquí
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error:", err));

// ✅ Esquema
const Usuario = mongoose.model("Usuario", new mongoose.Schema({
  nombre: String,
  email: email,
  carrera: String,
  telefono: number,
  fecha: Date,
}));

// ✅ Ruta POST
app.post("/enviar", async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json({ mensaje: "✅ Guardado en MongoDB" });
  } catch (err) {
    res.status(500).json({ mensaje: "❌ Error del servidor", error: err });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});


