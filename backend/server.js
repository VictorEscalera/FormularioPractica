const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CONFIGURAR CORS PARA CUALQUIER ORIGEN (PRUEBAS)
app.use(cors()); // Permitir cualquier origen por ahora

app.use(express.json());

// ✅ CONEXIÓN A MONGODB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

// ✅ ESQUEMA Y MODELO
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: email,
  carrera: String,
  telefono: Number,
  fecha: Date,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

// ✅ RUTA PARA GUARDAR DATOS
app.post("/enviar", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Datos guardados en MongoDB" });
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    res.status(500).json({ mensaje: "❌ Error en el servidor", error });
  }
});

// ✅ PUERTO PARA RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
