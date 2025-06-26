const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Configurar CORS correctamente
app.use(cors({
  origin: 'http://127.0.0.1:5500', // o 'http://localhost:5500' si usas Live Server
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// ✅ Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

// ✅ Esquema
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  carrera: String,
  telefono: String,
  fecha: String,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// ✅ Ruta POST
app.post("/enviar", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Datos guardados en MongoDB" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ mensaje: "❌ Error al guardar", error });
  }
});

// ✅ Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
