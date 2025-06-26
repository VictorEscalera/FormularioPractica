const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Configurar CORS para permitir desde cualquier origen
app.use(cors()); // ⚠️ Úsalo solo mientras desarrollas

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB Atlas"))
.catch(err => console.error("❌ Error de conexión:", err));

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: email,
  carrera: String,
  telefono: Number,
  fecha: Date,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/enviar", async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Datos guardados correctamente" });
  } catch (error) {
    console.error("❌ Error al guardar:", error);
    res.status(500).json({ mensaje: "❌ Error del servidor" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
