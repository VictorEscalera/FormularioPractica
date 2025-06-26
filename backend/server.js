const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: 'http://127.0.0.1:5500', // o 'http://localhost:5500' si usas localhost
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.use(express.json());

// Cambia "formularioDB" por el nombre que quieras para tu base de datos
const formularioDB = "mongodb+srv://victorsolis2019:Tobivictor__11@cluster0.syaedri.mongodb.net/formularioDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(formularioDB , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión", err));

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  carrera: String,
  telefono: String,
  fecha: Date,
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/enviar", async (req, res) => {
  try {
    console.log("📩 Datos recibidos:", req.body);
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res.json({ mensaje: "✅ Datos guardados en MongoDB Atlas" });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ mensaje: "❌ Error al guardar datos", error });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
